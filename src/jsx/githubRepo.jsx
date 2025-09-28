import { useEffect, useState, useMemo } from 'react'
import hljs from 'highlight.js'

const owner = 'NotReallyJustin'
const repo = 'ILY-Persistence-Demo'

export default function App() {
    const [path, setPath] = useState('')
    //items are the contents of the current path (files and dirs)
    const [items, setItems] = useState([]) // {name, path, type}
    const [fileContent, setFileContent] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    // selected range is {start, end} line numbers (0-based, inclusive)
        // anchorLine is the line where the drag started (for shift-click)
        // dragging is true when the mouse is down and moving
    const [selectedRange, setSelectedRange] = useState(null)
    const [anchorLine, setAnchorLine] = useState(null)
    const [dragging, setDragging] = useState(false)

    useEffect(() => {
        fetchContents('')
    }, [])

    // finish drag event
    useEffect(() => {
        const up = () => setDragging(false)
        document.addEventListener('mouseup', up)
        return () => document.removeEventListener('mouseup', up)
    }, [])

    async function fetchContents(p) {
        setLoading(true)
        setError(null)
        setFileContent(null)
        try {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${p}`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (Array.isArray(data)) { // directory
            setItems(data)
            setPath(p)
        } else if (data.type === 'file') {
            setFileContent     ({ name: data.name, content: atob(data.content.replace(/\n/g, '')) })
            setSelectedRange(null)
            setAnchorLine(null)
            setDragging(false)
        }
        } catch (e) {
        setError(e.message)
        } finally {
        setLoading(false)
        }
    }

    // compute selected lines contents
    const selectedLinesContents = useMemo(() => {
        if (!fileContent || !selectedRange) return []
        const lines = fileContent.content.split(/\r?\n/)
        const start = Math.max(0, selectedRange.start)
        const end = Math.min(lines.length - 1, selectedRange.end)
        return lines.slice(start, end + 1)
    }, [fileContent, selectedRange])

    const selectedText = useMemo(() => selectedLinesContents.join('\n'), [selectedLinesContents])

    const copySelection = async () => {
        try {
        await navigator.clipboard.writeText(selectedText)
        // small feedback could be added
        } catch (e) {
        console.error('copy failed', e)
        }
    }

    return (
        <div>
        <h1 className="title">GitHub Files Viewer</h1>
        <div className={`container ${dragging ? 'dragging' : ''}`}>
            <aside className="sidebar">
            <h2>{owner}/{repo}</h2>
            <div className="breadcrumbs">
                <button onClick={() => fetchContents('')}>root</button>
                {path && path.split('/').map((part, idx, arr) => {
                const sub = arr.slice(0, idx + 1).join('/')
                return <button key={sub} onClick={() => fetchContents(sub)} className="crumb">/{part}</button>
                })}
            </div>
            <div className="list">
                {loading && <div className="muted">Loading...</div>}
                {error && <div className="error">{error}</div>}
                {items.map(item => (
                <div key={item.path} className="item">
                    {item.type === 'dir' ? (
                    <button onClick={() => fetchContents(item.path)} className="link">📁 {item.name}</button>
                    ) : (
                    <button onClick={() => fetchContents(item.path)} className="link">📄 {item.name}</button>
                    )}
                </div>
                ))}
            </div>
            </aside>
            <main className="main">
            {fileContent ? (
                <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <h3>{fileContent.name}</h3>
                    <div>
                    <button onClick={copySelection} disabled={!selectedRange}>Copy selection</button>
                    </div>
                </div>
                <div className="file-view">
                    <div className="file-content" role="region" aria-label={`Contents of ${fileContent.name}`}>
                    {(() => {
                        let highlighted = null
                        try {
                        const result = hljs.highlightAuto(fileContent.content)
                        highlighted = result.value
                        } catch (e) {
                        highlighted = fileContent.content
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                        }

                        const lines = highlighted.split(/\r?\n/)

                        const handleMouseDown = (e, i) => {
                        e.preventDefault()
                        if (e.shiftKey && anchorLine != null) {
                            const start = Math.min(anchorLine, i)
                            const end = Math.max(anchorLine, i)
                            setSelectedRange({ start, end })
                        } else {
                            setSelectedRange({ start: i, end: i })
                            setAnchorLine(i)
                        }
                        setDragging(true)
                        }

                        const handleMouseEnter = (e, i) => {
                        if (!dragging) return
                        if (anchorLine == null) {
                            setAnchorLine(i)
                            setSelectedRange({ start: i, end: i })
                            return
                        }
                        const start = Math.min(anchorLine, i)
                        const end = Math.max(anchorLine, i)
                        setSelectedRange({ start, end })
                        }

                        return lines.map((lineHtml, i) => {
                        const inRange = selectedRange && i >= selectedRange.start && i <= selectedRange.end
                        return (
                            <div
                            key={i}
                            className={`code-line ${inRange ? 'selected' : ''}`}
                            role="button"
                            tabIndex={0}
                            aria-pressed={inRange}
                            onMouseDown={(e) => handleMouseDown(e, i)}
                            onMouseEnter={(e) => handleMouseEnter(e, i)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                if (selectedRange && selectedRange.start === i && selectedRange.end === i) {
                                    setSelectedRange(null)
                                    setAnchorLine(null)
                                } else {
                                    setSelectedRange({ start: i, end: i })
                                    setAnchorLine(i)
                                }
                                }
                            }}
                            dangerouslySetInnerHTML={{ __html: `<span class=\"line-number\">${i + 1}</span><span class=\"line-text\">${lineHtml || '&nbsp;'}</span>` }}
                            />
                        )
                        })
                    })()}
                    </div>
                </div>
                </div>
            ) : (
                <div className="muted">Select a file to view its contents.</div>
            )}
            <div style={{marginTop:12}} className="muted">Selected lines: {selectedLinesContents.length}</div>
            </main>
        </div>
        <footer className="footer">Uses GitHub Contents API (public). Set window.GH_TOKEN in console if rate-limited.</footer>
        </div>
    )
}

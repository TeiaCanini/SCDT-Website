import { useEffect, useState, useMemo, useCallback } from 'react'
import hljs from 'highlight.js'
import "./github.css"

const DEFAULT_OWNER = 'NotReallyJustin'
const DEFAULT_REPO = 'ILY-Persistence-Demo'

export default function Github() {
    // Repository state
    const [owner, setOwner] = useState(DEFAULT_OWNER)
    const [repo, setRepo] = useState(DEFAULT_REPO)
    const [searchUrl, setSearchUrl] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [searchError, setSearchError] = useState('')
    
    // File navigation state
    const [path, setPath] = useState('')
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

    const fetchContents = useCallback(async (p, ownerParam = owner, repoParam = repo) => {
        setLoading(true)
        setError(null)
        setFileContent(null)
        try {
            const url = `https://api.github.com/repos/${ownerParam}/${repoParam}/contents/${p}`
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const data = await res.json()
            if (Array.isArray(data)) { // directory
                setItems(data)
                setPath(p)
            } else if (data.type === 'file') {
                setFileContent({ name: data.name, content: atob(data.content.replace(/\n/g, '')) })
                setSelectedRange(null)
                setAnchorLine(null)
                setDragging(false)
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [owner, repo])

    useEffect(() => {
        fetchContents('')
    }, [fetchContents])

    // finish drag event
    useEffect(() => {
        const up = () => setDragging(false)
        document.addEventListener('mouseup', up)
        return () => document.removeEventListener('mouseup', up)
    }, [])

    // Parse GitHub URL to extract owner and repo
    const parseGitHubUrl = (url) => {
        try {
            // Handle different GitHub URL formats
            const patterns = [
                /github\.com\/([^/]+)\/([^/]+)(?:\/|$)/, // https://github.com/owner/repo
                /^([^/]+)\/([^/]+)$/, // owner/repo
            ]
            
            for (const pattern of patterns) {
                const match = url.match(pattern)
                if (match) {
                    return {
                        owner: match[1],
                        repo: match[2].replace(/\.git$/, ''), // Remove .git suffix if present
                        isValid: true
                    }
                }
            }
            return { isValid: false, error: 'Invalid GitHub URL format' }
        } catch (e) {
            return { isValid: false, error: 'Failed to parse URL' }
        }
    }

    // Handle repository search
    const handleSearch = async () => {
        if (!searchUrl.trim()) {
            setSearchError('Please enter a GitHub repository URL')
            return
        }

        setIsSearching(true)
        setSearchError('')
        
        const parsed = parseGitHubUrl(searchUrl.trim())
        
        if (!parsed.isValid) {
            setSearchError(parsed.error || 'Invalid repository URL')
            setIsSearching(false)
            return
        }

        // Test if repository exists by fetching its info
        try {
            const testUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`
            const response = await fetch(testUrl)
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Repository not found or is private')
                } else if (response.status === 403) {
                    throw new Error('API rate limit exceeded. Please try again later.')
                } else {
                    throw new Error(`Failed to access repository (${response.status})`)
                }
            }

            // Repository exists, switch to it
            setOwner(parsed.owner)
            setRepo(parsed.repo)
            
            // Clear existing data
            setPath('')
            setItems([])
            setFileContent(null)
            setError(null)
            setSelectedRange(null)
            setAnchorLine(null)
            setDragging(false)
            
            // Fetch root contents of new repository
            fetchContents('', parsed.owner, parsed.repo)
            
            setSearchUrl('') // Clear search input
            setSearchError('')
            
        } catch (e) {
            setSearchError(e.message)
        } finally {
            setIsSearching(false)
        }
    }

    // Handle Enter key in search input
    const handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
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
        <div className="github">
        <div className="github-header">
            <h1 className="title">GitHub Files Viewer</h1>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter GitHub URL (e.g., owner/repo or https://github.com/owner/repo)"
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    disabled={isSearching}
                />
                <button 
                    className="search-button"
                    onClick={handleSearch}
                    disabled={isSearching || !searchUrl.trim()}
                    title="Search Repository"
                >
                    {isSearching ? '🔄' : '🔍'}
                </button>
            </div>
        </div>
        {searchError && (
            <div className="search-error">
                ⚠️ {searchError}
            </div>
        )}
        <div className={`container ${dragging ? 'dragging' : ''}`}>
            <aside className="sidebar">
            <h2>{owner}/{repo}</h2>
            <div className="breadcrumbs">
                <button onClick={() => fetchContents('')}>🏠 root</button>
                {path && path.split('/').map((part, idx, arr) => {
                const sub = arr.slice(0, idx + 1).join('/')
                return <button key={sub} onClick={() => fetchContents(sub)} className="crumb">/{part}</button>
                })}
            </div>
            <div className="list">
                {loading && <div className="loading muted">Loading repository contents...</div>}
                {error && <div className="error">⚠️ Error: {error}</div>}
                {items.map(item => (
                <div key={item.path} className="item">
                    {item.type === 'dir' ? (
                    <button onClick={() => fetchContents(item.path)} className="link">
                        📁 {item.name}
                    </button>
                    ) : (
                    <button onClick={() => fetchContents(item.path)} className="link">
                        📄 {item.name}
                    </button>
                    )}
                </div>
                ))}
            </div>
            </aside>
            <main className="main">
            {fileContent ? (
                <div>
                <div className="file-header">
                    <h3>{fileContent.name}</h3>
                    <button 
                        className="copy-button" 
                        onClick={copySelection} 
                        disabled={!selectedRange}
                        title={selectedRange ? `Copy ${selectedLinesContents.length} selected lines` : 'Select lines to copy'}
                    >
                        Analyze with AI
                    </button>
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
                            dangerouslySetInnerHTML={{ __html: `<span class="line-number">${i + 1}</span><span class="line-text">${lineHtml || '&nbsp;'}</span>` }}
                            />
                        )
                        })
                    })()}
                    </div>
                </div>
                </div>
            ) : (
                <div className="muted">
                    👈 Select a file from the sidebar to view its contents
                    <br /><br />
                    <strong>Repository:</strong> {owner}/{repo}<br />
                    <strong>Description:</strong> Malware persistence demonstration for educational purposes
                </div>
            )}
            {fileContent && (
                <div className="selection-info">
                    <div className="selection-count">
                        Selected lines: {selectedLinesContents.length}
                    </div>
                    {selectedRange && (
                    <div className="line-range-info">
                        Lines {selectedRange.start + 1}-{selectedRange.end + 1}
                    </div>
                    )}
                </div>
            )}
            </main>
            </div>
        </div>
    )
}

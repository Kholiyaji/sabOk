'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, phoneNumber, password });
    router.replace('/login');
  };

  return (
    <div className="auth-page">
      <div className="smokey-container">
        <div className="smokey-blob blob-1"></div>
        <div className="smokey-blob blob-2"></div>
        <div className="smokey-blob blob-3"></div>
      </div>

      <div className="auth-card glass-card">
        <div className="auth-header">
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--accent-gradient)', 
            borderRadius: '12px', 
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 0 20px var(--accent-glow)'
          }}>
            🛡️
          </div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Subok to stay safe and connected</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              className="input" 
              type="text" 
              placeholder="John Doe" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              className="input" 
              type="email" 
              placeholder="name@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input 
              className="input" 
              type="tel" 
              placeholder="+91 98765 43210" 
              required 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              className="input" 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" style={{ marginTop: '8px' }}>
            Create Account
          </button>
        </form>

        <div className="auth-divider">Or join with</div>

        <div className="social-grid">
          <button className="btn-social">
            <span style={{ fontSize: '18px' }}>G</span> Google
          </button>
          <button className="btn-social">
            <span style={{ fontSize: '18px' }}></span> Apple
          </button>
        </div>

        <div className="auth-footer">
          Already have an account? 
          <Link href="/login" className="auth-link">Sign In</Link>
        </div>
      </div>
    </div>
  );
}

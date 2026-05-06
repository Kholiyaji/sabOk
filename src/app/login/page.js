'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login, onboarded } = useApp();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate a loading delay
    setTimeout(() => {
      login(identifier, password);
      if (onboarded) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    }, 2000);
  };

  if (isLoading) {
    return (
      <div style={{ 
        position: 'fixed', 
        inset: 0, 
        background: '#050810', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 9999 
      }}>
        <div className="spinner" style={{ width: '60px', height: '60px', borderWidth: '4px' }}></div>
      </div>
    );
  }

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
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to Subok</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email or Phone Number</label>
            <input 
              className="input" 
              type="text" 
              placeholder="Email or +91 98765 43210" 
              required 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <a href="#" className="auth-link" style={{ fontSize: '12px' }}>Forgot?</a>
            </div>
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
            Sign In
          </button>
        </form>

        <div className="auth-divider">Or continue with</div>

        <div className="social-grid">
          <button className="btn-social">
            <span style={{ fontSize: '18px' }}>G</span> Google
          </button>
          <button className="btn-social">
            <span style={{ fontSize: '18px' }}></span> Apple
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account? 
          <Link href="/register" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

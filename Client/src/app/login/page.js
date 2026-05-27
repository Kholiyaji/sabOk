'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      // ✅ store user in context
      login(data.user);

      // ✅ redirect
      if (data.user.onboarded) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }

    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setIsLoading(false);
    }
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
          <p className="auth-subtitle">Sign in to continue</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              className="input" 
              type="email" 
              placeholder="Enter your email"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Link href="/register" className="auth-link"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
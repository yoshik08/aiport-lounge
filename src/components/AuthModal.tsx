import React, { FormEvent, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthModal() {
  const { isAuthOpen, authTab, openAuth, closeAuth, login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isAuthOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      return;
    }

    login({ name: name.trim(), email: email.trim() });
    setName('');
    setEmail('');
    closeAuth();
  };

  return (
    <div className="auth-modal-overlay" onClick={closeAuth}>
      <div className="auth-modal" onClick={(event) => event.stopPropagation()}>
        <div className="auth-modal-header">
          <h2>{authTab === 'signup' ? 'Create your account' : 'Sign in to LoungePass'}</h2>
          <button className="close-button" onClick={closeAuth} aria-label="Close authentication modal">
            ×
          </button>
        </div>

        <div className="auth-modal-tabs">
          <button
            type="button"
            className={authTab === 'signin' ? 'active' : ''}
            onClick={() => openAuth('signin')}
          >
            Sign in
          </button>
          <button
            type="button"
            className={authTab === 'signup' ? 'active' : ''}
            onClick={() => openAuth('signup')}
          >
            Sign up
          </button>
        </div>

        <form className="auth-modal-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <button className="btn-solid" type="submit">
            {authTab === 'signup' ? 'Create account' : 'Sign in'}
          </button>
        </form>

        <p className="auth-modal-footer">
          {authTab === 'signup'
            ? 'Already have an account?'
            : 'New to LoungePass?'}
          <button type="button" onClick={() => openAuth(authTab === 'signup' ? 'signin' : 'signup')}>
            {authTab === 'signup' ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
}

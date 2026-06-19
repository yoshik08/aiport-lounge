// src/components/Footer.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Footer() {
  const { openAdmin } = useContext(AuthContext);

  return (
    <>
      <footer>
        <div className="footer-logo">Lounge<span>Pass</span></div>
        <p>© 2026 LoungePass. All rights reserved.</p>
      </footer>
      <button type="button" className="admin-fab" onClick={openAdmin}>Admin Portal</button>
    </>
  );
}
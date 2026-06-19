// src/pages/HelpPage.tsx
import React from 'react';

export default function HelpPage() {
  return (
    <div className="page active" style={{ display: 'block' }}>
      <div className="container-md">
        <h2 className="page-title">Help & Support</h2>
        <div className="admin-box">
          <h3>Frequently Asked Questions</h3>
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ marginBottom: '4px' }}>How do I use my QR code?</h4>
            <p style={{ fontSize: '14px', color: 'var(--ink2)', marginBottom: '16px' }}>Present your booking QR code or Member ID at the lounge reception along with a valid boarding pass.</p>
            
            <h4 style={{ marginBottom: '4px' }}>Can I cancel a booking?</h4>
            <p style={{ fontSize: '14px', color: 'var(--ink2)', marginBottom: '16px' }}>Yes, bookings can be cancelled up to 2 hours before your scheduled arrival time via the 'My Bookings' tab.</p>

            <h4 style={{ marginBottom: '4px' }}>Contact Us</h4>
            <p style={{ fontSize: '14px', color: 'var(--ink2)' }}>Email: support@loungepass.com<br/>Phone: +91 1800 123 4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
// src/pages/MembershipPage.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function MembershipPage() {
  const { user, openAuth } = useContext(AuthContext);

  const handleMembershipCTA = () => {
    if (user) {
      alert("You are already signed in. Please choose a plan below to upgrade!");
    } else {
      openAuth('signup');
    }
  };

  const selectMembership = (tier: string) => {
    if (user) {
      localStorage.setItem('selectedMembership', tier);
      alert(`${tier} plan selected successfully! Check your email for next steps.`);
    } else {
      openAuth('signup');
    }
  };

  return (
    <div className="page active" style={{ display: 'block' }}>
      <div className="container-md">
        <h2 className="page-title">Membership Plans</h2>
        <div className="membership-banner" style={{ marginBottom: '40px' }}>
          <div className="banner-text">
            <h3>The Global Pass</h3>
            <p>Unlimited global lounge access, fast-track security, and airport dining discounts.</p>
          </div>
          <button type="button" className="btn-white" onClick={handleMembershipCTA}>Start 14-day Free Trial</button>
        </div>
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="card membership-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', color: 'var(--ink)' }}>Silver</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '20px' }}>₹4,999<span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--ink2)' }}>/yr</span></p>
            <ul style={{ listStyle: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--ink2)', marginBottom: '20px', lineHeight: 2 }}>
              <li>✓ 10 Free Visits</li>
              <li>✓ 1 Guest Pass</li>
              <li>✓ Basic Wi-Fi</li>
            </ul>
            <button type="button" className="btn-solid" style={{ width: '100%' }} onClick={() => selectMembership('Silver')}>Choose Silver</button>
          </div>
          <div className="card membership-card" style={{ padding: '30px 20px', textAlign: 'center', border: '2px solid var(--accent)', position: 'relative' }}>
            <div className="most-popular-badge">Most Popular</div>
            <h3 style={{ marginBottom: '10px', color: 'var(--ink)' }}>Gold</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '20px' }}>₹9,999<span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--ink2)' }}>/yr</span></p>
            <ul style={{ listStyle: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--ink2)', marginBottom: '20px', lineHeight: 2 }}>
              <li>✓ Unlimited Visits</li>
              <li>✓ 2 Guest Passes</li>
              <li>✓ Priority Showers</li>
            </ul>
            <button type="button" className="btn-solid" style={{ width: '100%' }} onClick={() => selectMembership('Gold')}>Choose Gold</button>
          </div>
          <div className="card membership-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', color: 'var(--ink)' }}>Platinum</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '20px' }}>₹14,999<span style={{ fontSize: '14px', fontWeight: 'normal', color: 'var(--ink2)' }}>/yr</span></p>
            <ul style={{ listStyle: 'none', textAlign: 'left', fontSize: '14px', color: 'var(--ink2)', marginBottom: '20px', lineHeight: 2 }}>
              <li>✓ Unlimited Visits</li>
              <li>✓ 4 Guest Passes</li>
              <li>✓ Spa & Nap Pods</li>
            </ul>
            <button type="button" className="btn-solid" style={{ width: '100%' }} onClick={() => selectMembership('Platinum')}>Choose Platinum</button>
          </div>
        </div>
      </div>
    </div>
  );
}
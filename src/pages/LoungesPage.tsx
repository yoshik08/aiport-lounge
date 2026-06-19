// src/pages/LoungesPage.tsx
import React from 'react';
import LoungeCard from '../components/LoungeCard';
import { LOUNGES_DATA } from '../data/lounges';

export default function LoungesPage() {
  return (
    <div className="page active" style={{ display: 'block' }}>
      <div className="container-lg">
        <h2 className="page-title">Explore Lounges</h2>
        <div className="cards-grid">
          {LOUNGES_DATA.map((lounge, i) => (
            <LoungeCard key={i} lounge={lounge} />
          ))}
        </div>
      </div>
    </div>
  );
}
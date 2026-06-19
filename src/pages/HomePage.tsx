// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';

// Preserving the exact DOM structure and styling. 
// Lounge data is temporarily hardcoded here until the LoungeCard component and Service layer are generated.
const HOME_LOUNGES = [
  { name: "The Altitude Club", airport: "DEL · Terminal 3 · International", rating: 4.9, price: "₹1,800", tags: ["Wi-Fi", "Dining", "Shower", "Spa"], icon: "✈", bg: "var(--bg2)" },
  { name: "Horizon Business Lounge", airport: "BOM · Terminal 2 · Domestic", rating: 4.7, price: "₹1,200", tags: ["Wi-Fi", "Bar", "Workstations"], icon: "🌐", bg: "linear-gradient(135deg,#e8eef5,#d0dae8)" },
  { name: "Serenity Premium Lounge", airport: "BLR · Terminal 1 · International", rating: 4.8, price: "₹2,200", tags: ["Wi-Fi", "Nap pods", "Dining", "Shower"], icon: "🛋", bg: "linear-gradient(135deg,#f0ebe8,#e8ddd8)" }
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleMembershipCTA = () => {
    navigate('/membership');
  };

  return (
    <div id="page-home" className="page active">
      <div className="container-md">
        <section className="hero">
          <div className="hero-tag">Airport Lounge Access</div>
          <h1>Travel better,<br/><em>rest smarter.</em></h1>
          <p>Book premium airport lounges worldwide. Verify membership, invite guests, and get your QR entry pass — all in one place.</p>
        </section>

        <div className="search-box">
          <div className="search-field">
            <label>Airport</label>
            <input type="text" id="searchAirport" placeholder="e.g. Indira Gandhi, JFK" />
          </div>
          <div className="search-field">
            <label>Terminal</label>
            <select>
              <option>Any terminal</option>
              <option>Terminal 1</option>
              <option>Terminal 2</option>
              <option>Terminal 3</option>
            </select>
          </div>
          <div className="search-field">
            <label>Date</label>
            <input type="date" id="searchDate" />
          </div>
          <div className="search-field" style={{ borderRight: 'none' }}>
            <label>Guests</label>
            <select>
              <option>Just me</option>
              <option>+ 1 guest</option>
              <option>+ 2 guests</option>
              <option>+ 3 guests</option>
            </select>
          </div>
          <button className="search-btn" onClick={() => navigate('/lounges')}>Search lounges</button>
        </div>

        <div className="stats">
          <div className="stat-item"><span className="stat-num">240+</span><span className="stat-label">Lounges worldwide</span></div>
          <div className="stat-item"><span className="stat-num">58</span><span className="stat-label">Airports covered</span></div>
          <div className="stat-item"><span className="stat-num">12k+</span><span className="stat-label">Happy travellers</span></div>
          <div className="stat-item"><span className="stat-num">4.8★</span><span className="stat-label">Average rating</span></div>
        </div>
      </div>

      <div className="container-lg" style={{ marginTop: '40px' }}>
        <div className="section-header">
          <h2>Featured lounges</h2>
          <a onClick={() => navigate('/lounges')} style={{ cursor: 'pointer' }}>View all →</a>
        </div>
        
        <div className="cards-grid" id="home-lounges-grid">
          {HOME_LOUNGES.map((lounge, idx) => (
            <div className="card" key={idx}>
              <div className="card-img-placeholder" style={{ background: lounge.bg }}>
                <span className="card-img-icon">{lounge.icon}</span>
              </div>
              <div className="card-body">
                <div className="card-top">
                  <div className="card-name">{lounge.name}</div>
                  <div className="card-rating">
                    <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {lounge.rating}
                  </div>
                </div>
                <div className="card-airport">{lounge.airport}</div>
                <div className="card-tags">
                  {lounge.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="card-footer">
                  <div className="card-price"><strong>{lounge.price}</strong> / visit</div>
                  <button className="btn-book">Book now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-md">
        <div className="membership-banner">
          <div className="banner-text">
            <h3>Unlock unlimited access</h3>
            <p>Get a membership and walk into any lounge, anytime. Silver, Gold, and Platinum tiers — with guest passes and priority slots.</p>
          </div>
          <div className="banner-tiers">
            <div className="tier silver"><div className="tier-name">Silver</div><div className="tier-badge">1 guest</div></div>
            <div className="tier gold"><div className="tier-name">Gold</div><div className="tier-badge">2 guests</div></div>
            <div className="tier platinum"><div className="tier-name">Platinum</div><div className="tier-badge">4 guests</div></div>
          </div>
          <button className="btn-white" onClick={handleMembershipCTA}>View plans</button>
        </div>
      </div>
    </div>
  );
}
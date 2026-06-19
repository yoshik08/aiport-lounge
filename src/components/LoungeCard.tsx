import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Booking, Lounge } from '../types';

interface LoungeCardProps {
  lounge: Lounge;
}

export default function LoungeCard({ lounge }: LoungeCardProps) {
  const { user, openAuth } = useContext(AuthContext);

  const handleBook = () => {
    if (!user) {
      openAuth('signin');
      return;
    }

    const storedBookings: Booking[] = JSON.parse(localStorage.getItem('lounge_bookings') || '[]');
    const booking: Booking = {
      id: 'LB' + Date.now().toString().slice(-6),
      name: user.name,
      email: user.email,
      lounge: lounge.name,
      date: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('lounge_bookings', JSON.stringify([...storedBookings, booking]));
    window.dispatchEvent(new Event('bookingsUpdated'));
    alert(`Booked ${lounge.name}! Check My Bookings for details.`);
  };

  return (
    <article className="card lounge-card" style={{ background: lounge.bg, color: 'var(--ink)' }}>
      <div className="lounge-card-header">
        <div className="lounge-icon">{lounge.icon}</div>
        <div>
          <h3>{lounge.name}</h3>
          <p>{lounge.airport}</p>
        </div>
      </div>

      <div className="lounge-card-body">
        <div className="lounge-rating">
          <span>⭐ {lounge.rating.toFixed(1)}</span>
          <span>{lounge.price}</span>
        </div>

        <div className="lounge-tags">
          {lounge.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button type="button" className="btn-solid" onClick={handleBook}>
        {user ? 'Book Now' : 'Sign in to book'}
      </button>
    </article>
  );
}

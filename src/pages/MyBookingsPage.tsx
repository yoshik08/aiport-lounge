// src/pages/MyBookingsPage.tsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Booking } from '../types';

export default function MyBookingsPage() {
  const { user, openAuth } = useContext(AuthContext);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const fetchBookings = () => {
    if (!user) return;
    const allBookings: Booking[] = JSON.parse(localStorage.getItem('lounge_bookings') || '[]');
    const mine = allBookings.filter(b => b.email === user.email || b.name === user.name);
    setUserBookings(mine.reverse());
  };

  useEffect(() => {
    fetchBookings();
    window.addEventListener('bookingsUpdated', fetchBookings);
    return () => window.removeEventListener('bookingsUpdated', fetchBookings);
  }, [user]);

  const handleCancel = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      let bookings: Booking[] = JSON.parse(localStorage.getItem('lounge_bookings') || '[]');
      bookings = bookings.filter(b => b.id !== id);
      localStorage.setItem('lounge_bookings', JSON.stringify(bookings));
      fetchBookings();
      window.dispatchEvent(new Event('bookingsUpdated'));
    }
  };

  return (
    <div className="page active" style={{ display: 'block' }}>
      <div className="container-md">
        <h2 className="page-title">My Bookings</h2>
        
        {!user ? (
          <div className="admin-box" style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ marginBottom: '16px' }}>Please sign in to view your bookings.</p>
            <button type="button" className="btn-solid" onClick={() => openAuth('signin')}>Sign In</button>
          </div>
        ) : userBookings.length === 0 ? (
          <div className="admin-box" style={{ textAlign: 'center', padding: '40px', color: 'var(--ink2)' }}>
            No active bookings found.
          </div>
        ) : (
          <div>
            {userBookings.map(b => (
              <div className="booking-list-item" key={b.id}>
                <div className="booking-info">
                  <h4>{b.lounge}</h4>
                  <p><strong>Booking ID:</strong> {b.id} &nbsp;|&nbsp; <strong>Date:</strong> {b.date}</p>
                  <span className="booking-badge">{b.status}</span>
                </div>
                <div>
                  <button type="button" className="btn-danger" onClick={() => handleCancel(b.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
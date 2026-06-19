// src/components/AdminPortal.tsx
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Booking, Member } from '../types';

export default function AdminPortal() {
  const { isAdminOpen, closeAdmin } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState('admin');
  const [adminPass, setAdminPass] = useState('admin123');

  const [members, setMembers] = useState<Member[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalCheckins, setTotalCheckins] = useState(0);
  
  const [searchMembers, setSearchMembers] = useState('');
  const [searchBookings, setSearchBookings] = useState('');
  
  const [verifyValue, setVerifyValue] = useState('');
  const [verifyResult, setVerifyResult] = useState<React.ReactNode>(null);

  const [mName, setMName] = useState('');
  const [mMobile, setMMobile] = useState('');
  const [mTicket, setMTicket] = useState('');
  const [mType, setMType] = useState('Silver');

  const loadData = () => {
    const mems = JSON.parse(localStorage.getItem('lounge_members') || 'null') || [
      {id:"LP1001",name:"John Smith",mobile:"9876543210",ticket:"AI20456789",tier:"Gold",visits:3},
      {id:"LP1002",name:"Sarah Lee",mobile:"9123456780",ticket:"UK83456712",tier:"Platinum",visits:5}
    ];
    setMembers(mems);
    
    const bks = JSON.parse(localStorage.getItem('lounge_bookings') || '[]');
    setBookings(bks);

    const tc = parseInt(localStorage.getItem('lounge_checkins') || '1420');
    setTotalCheckins(tc);
  };

  useEffect(() => {
    if (isAdminOpen && isAuthenticated) {
      loadData();
    }
  }, [isAdminOpen, isAuthenticated]);

  useEffect(() => {
    const handleUpdate = () => { if (isAuthenticated) loadData(); };
    window.addEventListener('bookingsUpdated', handleUpdate);
    return () => window.removeEventListener('bookingsUpdated', handleUpdate);
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === "admin" && adminPass === "admin123") {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert("Invalid credentials.");
    }
  };

  const handleVerify = () => {
    const v = verifyValue.trim();
    if (!v) return;

    // Check Member
    const m = members.find(x => x.id === v || x.mobile === v || x.ticket === v);
    if (m) {
      const updatedMembers = members.map(x => x.id === m.id ? { ...x, visits: x.visits + 1 } : x);
      setMembers(updatedMembers);
      localStorage.setItem('lounge_members', JSON.stringify(updatedMembers));
      
      const newTc = totalCheckins + 1;
      setTotalCheckins(newTc);
      localStorage.setItem('lounge_checkins', newTc.toString());

      setVerifyResult(
        <div style={{ color: '#2ecc71', padding: '12px', border: '1px solid #2ecc71', borderRadius: '8px', background: 'rgba(46, 204, 113, 0.1)' }}>
          <b>✓ Access Approved (Member)</b><br/>{m.name} | {m.tier} Member | ID: {m.id}
        </div>
      );
      return;
    }

    // Check Booking
    let bIndex = bookings.findIndex(x => x.id === v);
    if (bIndex !== -1) {
      const updatedBookings = [...bookings];
      updatedBookings[bIndex] = { ...updatedBookings[bIndex], status: 'Checked In' };
      setBookings(updatedBookings);
      localStorage.setItem('lounge_bookings', JSON.stringify(updatedBookings));
      window.dispatchEvent(new Event('bookingsUpdated'));
      
      const newTc = totalCheckins + 1;
      setTotalCheckins(newTc);
      localStorage.setItem('lounge_checkins', newTc.toString());

      setVerifyResult(
        <div style={{ color: '#2ecc71', padding: '12px', border: '1px solid #2ecc71', borderRadius: '8px', background: 'rgba(46, 204, 113, 0.1)' }}>
          <b>✓ Access Approved (Booking)</b><br/>{updatedBookings[bIndex].name} | {updatedBookings[bIndex].lounge}<br/>Booking ID: {updatedBookings[bIndex].id} | Status: Checked In
        </div>
      );
      return;
    }

    setVerifyResult(
      <div style={{ color: 'var(--danger)', padding: '12px', border: '1px solid var(--danger)', borderRadius: '8px', background: 'rgba(231, 76, 60, 0.1)' }}>
        <b>✗ Passenger Not Found</b>
      </div>
    );
  };

  const handleAddMember = () => {
    if (!mName || !mMobile || !mTicket) {
      alert('Please fill all member fields.');
      return;
    }
    const newMember: Member = {
      id: 'LP' + Date.now().toString().slice(-6),
      name: mName, mobile: mMobile, ticket: mTicket, tier: mType, visits: 0
    };
    const updatedMembers = [...members, newMember];
    setMembers(updatedMembers);
    localStorage.setItem('lounge_members', JSON.stringify(updatedMembers));
    setMName(''); setMMobile(''); setMTicket('');
    alert("New member added successfully.");
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      const updated = members.filter(x => x.id !== id);
      setMembers(updated);
      localStorage.setItem('lounge_members', JSON.stringify(updated));
    }
  };

  const handleCancelBooking = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking via Admin Portal?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem('lounge_bookings', JSON.stringify(updated));
      window.dispatchEvent(new Event('bookingsUpdated'));
    }
  };

  if (!isAdminOpen) return null;

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchMembers.toLowerCase()) || m.id.toLowerCase().includes(searchMembers.toLowerCase()) || m.ticket.toLowerCase().includes(searchMembers.toLowerCase()));
  const filteredBookings = bookings.filter(b => b.name.toLowerCase().includes(searchBookings.toLowerCase()) || b.id.toLowerCase().includes(searchBookings.toLowerCase()) || b.lounge.toLowerCase().includes(searchBookings.toLowerCase()));

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) closeAdmin(); }}>
      <div className="admin-modal-content modal-container" style={{ maxWidth: '1000px' }}>
        <button type="button" className="modal-close" onClick={closeAdmin}>✕</button>
        
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontFamily: 'DM Serif Display', fontSize: '28px' }}>Lounge Management</h2>
        </div>

        {!isAuthenticated ? (
          <form id="loginArea" onSubmit={handleLogin}>
            <div className="input-group" style={{ marginBottom: '12px' }}>
              <label>Username (admin)</label>
              <input value={adminUser} onChange={e => setAdminUser(e.target.value)} required />
            </div>
            <div className="input-group" style={{ marginBottom: '16px' }}>
              <label>Password (admin123)</label>
              <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} required />
            </div>
            <button type="submit" className="btn-solid">Login to Dashboard</button>
          </form>
        ) : (
          <div id="dashboard">
            <div className="admin-grid">
              <div className="stat-card"><h3>{members.length}</h3><p>Total Members</p></div>
              <div className="stat-card"><h3>{bookings.length}</h3><p>Total Bookings</p></div>
              <div className="stat-card"><h3>{totalCheckins}</h3><p>Total Check-ins</p></div>
              <div className="stat-card"><h3>87%</h3><p>Avg Occupancy</p></div>
            </div>

            <div className="admin-box">
              <h3>Passenger Check-in</h3>
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <input className="admin-input" placeholder="Booking ID / Ticket / Mobile / Member ID" style={{ margin: 0 }} value={verifyValue} onChange={e => setVerifyValue(e.target.value)} />
                <button type="button" className="btn-solid" onClick={handleVerify}>Verify & Check-in</button>
              </div>
              <div style={{ marginTop: '10px' }}>{verifyResult}</div>
            </div>

            <div className="admin-box">
              <h3>Add New Member</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '12px' }}>
                <input className="admin-input" placeholder="Full Name" style={{ margin: 0 }} value={mName} onChange={e => setMName(e.target.value)} />
                <input className="admin-input" placeholder="Mobile Number" style={{ margin: 0 }} value={mMobile} onChange={e => setMMobile(e.target.value)} />
                <input className="admin-input" placeholder="Ticket Number" style={{ margin: 0 }} value={mTicket} onChange={e => setMTicket(e.target.value)} />
                <select className="admin-input" style={{ margin: 0 }} value={mType} onChange={e => setMType(e.target.value)}>
                  <option>Silver</option>
                  <option>Gold</option>
                  <option>Platinum</option>
                </select>
              </div>
              <button type="button" className="btn-solid" style={{ marginTop: '12px' }} onClick={handleAddMember}>Save Member</button>
            </div>

            <div className="admin-box">
              <div className="admin-box-header">
                <h3>All Bookings</h3>
                <input type="text" className="admin-search" placeholder="Search bookings..." value={searchBookings} onChange={e => setSearchBookings(e.target.value)} />
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>ID</th><th>Date</th><th>Passenger</th><th>Lounge</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {[...filteredBookings].reverse().map(b => (
                      <tr key={b.id}>
                        <td>{b.id}</td><td>{b.date}</td><td>{b.name}</td>
                        <td>{b.lounge}</td><td><span className="booking-badge">{b.status}</span></td>
                        <td><button type="button" className="admin-delete-btn" onClick={() => handleCancelBooking(b.id)}>Cancel</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="admin-box">
              <div className="admin-box-header">
                <h3>Member Database</h3>
                <input type="text" className="admin-search" placeholder="Search members..." value={searchMembers} onChange={e => setSearchMembers(e.target.value)} />
              </div>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead><tr><th>ID</th><th>Name</th><th>Mobile</th><th>Ticket</th><th>Tier</th><th>Visits</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filteredMembers.map(m => (
                      <tr key={m.id}>
                        <td>{m.id}</td><td>{m.name}</td><td>{m.mobile}</td>
                        <td>{m.ticket}</td><td><span className="booking-badge" style={{ background: 'var(--bg2)', color: 'var(--ink)' }}>{m.tier}</span></td><td>{m.visits}</td>
                        <td><button type="button" className="admin-delete-btn" onClick={() => handleDeleteMember(m.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
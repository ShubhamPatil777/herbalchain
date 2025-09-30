import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [batchId, setBatchId] = useState('');
  const [batchData, setBatchData] = useState(null);
  const [error, setError] = useState('');

  const searchBatch = async () => {
    if (!batchId) {
      setError('Please enter a Batch ID');
      return;
    }
    setError('');
    try {
      const res = await axios.get(`http://localhost:4000/queryBatch/${batchId}`);
      setBatchData(res.data.result);
    } catch (err) {
      // if backend fails, show mock data
      setBatchData({
        batchId: batchId,
        herbName: 'Ashwagandha',
        collectorId: 'COL001',
        location: { latitude: '20.5937', longitude: '78.9629' },
        createdAt: '2025-09-30T10:00:00Z',
        metadata: 'Wild collected, 10kg',
        events: [
          { type: 'COLLECTION', details: 'Collected by farmer', timestamp: '2025-09-30T10:00:00Z' },
          { type: 'DRYING', details: 'Sun-dried for 48h', timestamp: '2025-09-30T14:00:00Z' },
          { type: 'PACKAGING', details: 'Packed into formulation', timestamp: '2025-10-01T08:00:00Z' }
        ]
      });
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌿 HerbalChain Traceability Dashboard</h1>
      <div style={styles.searchBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
        />
        <button style={styles.button} onClick={searchBatch}>🔍 Search</button>
      </div>
      {error && <p style={styles.error}>{error}</p>}

      {batchData && (
        <div style={styles.card}>
          <h2>Batch: {batchData.batchId}</h2>
          <p><strong>Herb:</strong> {batchData.herbName}</p>
          <p><strong>Collector ID:</strong> {batchData.collectorId}</p>
          <p><strong>Location:</strong> {batchData.location.latitude}, {batchData.location.longitude}</p>
          <p><strong>Created At:</strong> {batchData.createdAt}</p>
          <p><strong>Metadata:</strong> {batchData.metadata}</p>

          <h3>📜 Processing Events</h3>
          <ul>
            {batchData.events.map((event, index) => (
              <li key={index}>
                <strong>{event.type}</strong>: {event.details} <br />
                <em>{event.timestamp}</em>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '30px',
    textAlign: 'center',
    background: '#f0f8f5',
    minHeight: '100vh'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px'
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  input: {
    width: '300px',
    padding: '10px',
    marginRight: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    background: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  card: {
    marginTop: '20px',
    background: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: 'auto',
    textAlign: 'left'
  },
  error: {
    color: 'red'
  }
};

export default App;
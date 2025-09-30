import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('trace');
  const [batchId, setBatchId] = useState('');
  const [batchData, setBatchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const searchBatch = async () => {
    if (!batchId.trim()) {
      showMessage('Please enter a Batch ID');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setBatchData({
        batchId: batchId,
        herbName: 'Organic Ashwagandha',
        collectorId: 'FARM001',
        location: { latitude: '22.9734', longitude: '78.6569' },
        createdAt: '2024-01-15T10:00:00Z',
        metadata: 'Certified Organic, Wild Harvested from MP Forests',
        events: [
          { type: '🌱 COLLECTION', details: 'Hand-picked from organic forest', timestamp: '2024-01-15T10:00:00Z' },
          { type: '☀️ DRYING', details: 'Natural sun drying for 48 hours', timestamp: '2024-01-16T14:00:00Z' },
          { type: '🔬 QUALITY CHECK', details: 'Lab tested - Premium Grade A', timestamp: '2024-01-17T08:00:00Z' },
          { type: '📦 PACKAGING', details: 'Vacuum sealed packaging', timestamp: '2024-01-18T12:00:00Z' }
        ]
      });
      setLoading(false);
      showMessage('Batch traced successfully!');
    }, 1500);
  };

  const farmerActions = {
    createBatch: () => showMessage('✅ New batch creation started!'),
    viewAnalytics: () => showMessage('📊 Opening farm analytics...'),
    updateInventory: () => showMessage('📝 Inventory update panel opened')
  };

  const adminActions = {
    verifyFarmer: () => showMessage('👨‍🌾 Farmer verification panel opened'),
    viewTransactions: () => showMessage('💳 Loading all transactions...'),
    systemSettings: () => showMessage('⚙️ System settings opened'),
    blockchainExplorer: () => showMessage('🔗 Opening blockchain explorer...')
  };

  const purchaseActions = {
    addToCart: (product) => showMessage(`🛒 Added ${product} to cart!`),
    buyNow: (product) => showMessage(`🚀 Purchasing ${product}...`)
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <div style={styles.logo}>🌿</div>
          <div>
            <h1 style={styles.title}>HerbalChain</h1>
            <p style={styles.subtitle}>Nature's Trust, Blockchain's Truth</p>
          </div>
        </div>
        <nav style={styles.nav}>
          {['trace', 'market', 'farmer', 'admin'].map(tab => (
            <button
              key={tab}
              style={{
                ...styles.navButton,
                ...(activeTab === tab && styles.navButtonActive)
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'trace' && '🔍 Trace'}
              {tab === 'market' && '🛒 Market'}
              {tab === 'farmer' && '👨‍🌾 Farmer'}
              {tab === 'admin' && '⚙️ Admin'}
            </button>
          ))}
        </nav>
      </header>

      {/* Message Alert */}
      {message && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        
        {/* TRACE TAB */}
        {activeTab === 'trace' && (
          <div style={styles.tabContent}>
            <div style={styles.hero}>
              <h2>Track Your Herb's Journey</h2>
              <p>From soil to soul - Complete transparency</p>
            </div>

            <div style={styles.searchContainer}>
              <div style={styles.searchCard}>
                <h3>🌱 Enter Batch ID</h3>
                <div style={styles.searchBox}>
                  <input
                    style={styles.input}
                    placeholder="e.g., ASHWA2024, BATCH001"
                    value={batchId}
                    onChange={(e) => setBatchId(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchBatch()}
                  />
                  <button 
                    style={styles.primaryBtn}
                    onClick={searchBatch}
                    disabled={loading}
                  >
                    {loading ? '🔍 Tracing...' : 'Track Journey'}
                  </button>
                </div>
              </div>
            </div>

            {batchData && (
              <div style={styles.results}>
                <div style={styles.batchCard}>
                  <div style={styles.batchHeader}>
                    <h3>Batch Details</h3>
                    <span style={styles.batchId}>#{batchData.batchId}</span>
                  </div>

                  <div style={styles.detailsGrid}>
                    <div style={styles.detailItem}>
                      <span>Herb Name</span>
                      <strong>{batchData.herbName}</strong>
                    </div>
                    <div style={styles.detailItem}>
                      <span>Farmer ID</span>
                      <strong>{batchData.collectorId}</strong>
                    </div>
                    <div style={styles.detailItem}>
                      <span>Origin</span>
                      <strong>Madhya Pradesh</strong>
                    </div>
                    <div style={styles.detailItem}>
                      <span>Collection Date</span>
                      <strong>{new Date(batchData.createdAt).toLocaleDateString()}</strong>
                    </div>
                  </div>

                  <div style={styles.timeline}>
                    <h4>📜 Supply Chain Journey</h4>
                    {batchData.events.map((event, index) => (
                      <div key={index} style={styles.timelineItem}>
                        <div style={styles.timelineDot}></div>
                        <div style={styles.timelineContent}>
                          <div style={styles.eventHeader}>
                            <strong>{event.type}</strong>
                            <span>{new Date(event.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p>{event.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* MARKET TAB */}
        {activeTab === 'market' && (
          <div style={styles.tabContent}>
            <div style={styles.hero}>
              <h2>🌿 Herb Marketplace</h2>
              <p>Pure, Organic, Traceable Herbs</p>
            </div>

            <div style={styles.productsGrid}>
              {[
                { id: 1, name: 'Organic Ashwagandha', price: '₹1,200/kg', quality: 'Premium', image: '🟢' },
                { id: 2, name: 'Pure Shatavari', price: '₹1,500/kg', quality: 'Grade A', image: '🟡' },
                { id: 3, name: 'Turmeric Powder', price: '₹800/kg', quality: 'Organic', image: '🟠' },
                { id: 4, name: 'Tulsi Leaves', price: '₹900/kg', quality: 'Fresh', image: '🟣' }
              ].map(product => (
                <div key={product.id} style={styles.productCard}>
                  <div style={styles.productImage}>
                    {product.image}
                  </div>
                  <div style={styles.productInfo}>
                    <h4>{product.name}</h4>
                    <p style={styles.price}>{product.price}</p>
                    <span style={styles.quality}>{product.quality}</span>
                    <div style={styles.productActions}>
                      <button 
                        style={styles.secondaryBtn}
                        onClick={() => purchaseActions.addToCart(product.name)}
                      >
                        Add to Cart
                      </button>
                      <button 
                        style={styles.primaryBtn}
                        onClick={() => purchaseActions.buyNow(product.name)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FARMER TAB */}
        {activeTab === 'farmer' && (
          <div style={styles.tabContent}>
            <div style={styles.hero}>
              <h2>👨‍🌾 Farmer Dashboard</h2>
              <p>Manage your organic farm</p>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <h3>My Batches</h3>
                <div style={styles.statNumber}>12</div>
                <p>Active</p>
              </div>
              <div style={styles.statCard}>
                <h3>Total Revenue</h3>
                <div style={styles.statNumber}>₹85,000</div>
                <p>This Season</p>
              </div>
              <div style={styles.statCard}>
                <h3>Quality Score</h3>
                <div style={styles.statNumber}>98%</div>
                <p>Customer Rating</p>
              </div>
            </div>

            <div style={styles.actionGrid}>
              <button style={styles.actionCard} onClick={farmerActions.createBatch}>
                <span style={styles.actionIcon}>➕</span>
                <h4>Create New Batch</h4>
                <p>Register new herb collection</p>
              </button>
              <button style={styles.actionCard} onClick={farmerActions.viewAnalytics}>
                <span style={styles.actionIcon}>📊</span>
                <h4>View Analytics</h4>
                <p>Farm performance insights</p>
              </button>
              <button style={styles.actionCard} onClick={farmerActions.updateInventory}>
                <span style={styles.actionIcon}>📝</span>
                <h4>Update Inventory</h4>
                <p>Manage stock levels</p>
              </button>
            </div>
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && (
          <div style={styles.tabContent}>
            <div style={styles.hero}>
              <h2>⚙️ Admin Panel</h2>
              <p>System management</p>
            </div>

            <div style={styles.adminGrid}>
              <div style={styles.adminCard}>
                <h3>System Overview</h3>
                <div style={styles.adminStats}>
                  <p>Total Batches: <strong>156</strong></p>
                  <p>Active Farmers: <strong>24</strong></p>
                  <p>Transactions: <strong>89</strong></p>
                  <p>Blockchain Blocks: <strong>1,234</strong></p>
                </div>
              </div>

              <div style={styles.adminCard}>
                <h3>Quick Actions</h3>
                <div style={styles.adminActions}>
                  <button onClick={adminActions.verifyFarmer}>Verify New Farmer</button>
                  <button onClick={adminActions.viewTransactions}>View Transactions</button>
                  <button onClick={adminActions.systemSettings}>System Settings</button>
                  <button onClick={adminActions.blockchainExplorer}>Blockchain Explorer</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>Developed by <strong>Shubham Patil</strong> | Blockchain Herb Traceability System</p>
      </footer>
    </div>
  );
}

// Complete Styles Object
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #2d5016 0%, #4a7c59 50%, #8fbc8f 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '15px 30px',
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logo: {
    fontSize: '2.2rem',
    background: 'linear-gradient(45deg, #2d5016, #4a7c59)',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    margin: 0,
    fontSize: '1.6rem',
    fontWeight: '700',
    background: 'linear-gradient(45deg, #2d5016, #4a7c59)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  subtitle: {
    margin: 0,
    color: '#666',
    fontSize: '0.8rem'
  },
  nav: {
    display: 'flex',
    gap: '8px'
  },
  navButton: {
    padding: '10px 16px',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    color: '#666'
  },
  navButtonActive: {
    background: '#2d5016',
    color: 'white',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(45, 80, 22, 0.3)'
  },
  message: {
    position: 'fixed',
    top: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#2d5016',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
  },
  main: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  hero: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px'
  },
  searchCard: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px'
  },
  searchBox: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none'
  },
  primaryBtn: {
    padding: '12px 20px',
    background: '#2d5016',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  secondaryBtn: {
    padding: '10px 16px',
    background: 'transparent',
    color: '#2d5016',
    border: '2px solid #2d5016',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  results: {
    background: 'white',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
  },
  batchCard: {
    padding: '25px'
  },
  batchHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  batchId: {
    background: '#2d5016',
    color: 'white',
    padding: '5px 12px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  detailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '25px'
  },
  detailItem: {
    background: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    borderLeft: '4px solid #2d5016'
  },
  timeline: {
    borderTop: '2px solid #f0f0f0',
    paddingTop: '20px'
  },
  timelineItem: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px'
  },
  timelineDot: {
    width: '12px',
    height: '12px',
    background: '#2d5016',
    borderRadius: '50%',
    marginTop: '5px'
  },
  timelineContent: {
    flex: 1
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '5px'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px'
  },
  productCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  productImage: {
    height: '120px',
    background: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem'
  },
  productInfo: {
    padding: '15px'
  },
  price: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#2d5016',
    margin: '8px 0'
  },
  quality: {
    background: '#e8f5e8',
    color: '#2d5016',
    padding: '3px 8px',
    borderRadius: '6px',
    fontSize: '12px'
  },
  productActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '15px',
    marginBottom: '25px'
  },
  statCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#2d5016',
    margin: '10px 0'
  },
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px'
  },
  actionCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s'
  },
  actionIcon: {
    fontSize: '2rem',
    marginBottom: '10px'
  },
  adminGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px'
  },
  adminCard: {
    background: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  },
  adminStats: {
    color: '#333'
  },
  adminActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  footer: {
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
    marginTop: '40px'
  }
};

export default App;
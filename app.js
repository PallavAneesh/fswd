import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FetchDemo() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postId, setPostId] = useState(1);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Using built-in fetch()
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch post!');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]);

  return (
    <div style={styles.section}>
      <h2> Fetch API Demo</h2>
      <p style={styles.note}>Using built-in <code>fetch()</code> to get data from API.</p>

      {/* Post ID Selector */}
      <div style={styles.inputRow}>
        <label>Select Post ID (1-100):</label>
        <input
          type="number"
          value={postId}
          min="1"
          max="100"
          onChange={(e) => setPostId(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Loading State */}
      {loading && <div style={styles.loadingBox}>⏳ Loading data...</div>}

      {/* Error State */}
      {error && <div style={styles.errorBox}> Error: {error}</div>}

      {/* Data Display */}
      {!loading && !error && post && (
        <div style={styles.dataCard}>
          <p><strong>ID:</strong> {post.id}</p>
          <p><strong>Title:</strong> {post.title}</p>
          <p><strong>Body:</strong> {post.body}</p>
        </div>
      )}
    </div>
  );
}

function AxiosDemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetched, setFetched] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    setError(null);
    setFetched(true);

    // Using Axios
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch users! ' + err.message);
        setLoading(false);
      });
  };

  const [postResponse, setPostResponse] = useState(null);
  const sendPost = () => {
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'New React Post',
      body: 'This was sent using Axios POST method!',
      userId: 1,
    })
      .then(response => {
        setPostResponse(response.data);
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div style={styles.section}>
      <h2>⚡ Axios Demo</h2>
      <p style={styles.note}>Using <code>Axios</code> for GET and POST requests with automatic JSON parsing.</p>

      {/* GET Request */}
      <div style={styles.exampleBox}>
        <h3>GET Request - Fetch Users</h3>
        <button style={styles.btn} onClick={fetchUsers}>Fetch Users</button>

        {loading && <div style={styles.loadingBox}>⏳ Fetching users...</div>}
        {error && <div style={styles.errorBox}>❌ {error}</div>}

        {!loading && fetched && users.length > 0 && (
          <div style={styles.userGrid}>
            {users.map(user => (
              <div key={user.id} style={styles.userCard}>
                <h4>👤 {user.name}</h4>
                <p>📧 {user.email}</p>
                <p>🌐 {user.website}</p>
                <p>🏢 {user.company.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* POST Request */}
      <div style={styles.exampleBox}>
        <h3>POST Request - Send Data</h3>
        <button style={styles.btn} onClick={sendPost}>Send POST Request</button>
        {postResponse && (
          <div style={styles.successBox}>
            <p>✅ Post created successfully!</p>
            <p><strong>ID:</strong> {postResponse.id}</p>
            <p><strong>Title:</strong> {postResponse.title}</p>
            <p><strong>Body:</strong> {postResponse.body}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ComparisonTable() {
  const comparisons = [
    { feature: 'JSON Parsing', fetch: 'Manual (.json())', axios: 'Automatic ✅' },
    { feature: 'Error Handling', fetch: 'Manual check', axios: 'Automatic for 4xx/5xx ✅' },
    { feature: 'Request Timeout', fetch: 'Not built-in', axios: 'Built-in ✅' },
    { feature: 'Installation', fetch: 'Built-in ✅', axios: 'npm install axios' },
    { feature: 'Browser Support', fetch: 'Modern browsers', axios: 'All browsers ✅' },
  ];

  return (
    <div style={styles.section}>
      <h2>⚖️ Fetch vs Axios Comparison</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.th}>Feature</th>
            <th style={styles.th}>fetch()</th>
            <th style={styles.th}>Axios</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((row, index) => (
            <tr key={index} style={index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd}>
              <td style={styles.td}><strong>{row.feature}</strong></td>
              <td style={styles.td}>{row.fetch}</td>
              <td style={styles.td}>{row.axios}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MiniProject() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const searchUser = () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    setSearched(true);
    setUserData(null);
    setPosts([]);

    // Fetch user data and their posts simultaneously
    Promise.all([
      axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`),
      axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    ])
      .then(([userRes, postsRes]) => {
        setUserData(userRes.data);
        setPosts(postsRes.data);
        setLoading(false);
      })
      .catch(() => {
        setError('User not found! Please enter a valid ID (1-10).');
        setLoading(false);
      });
  };

  return (
    <div style={styles.section}>
      <h2>🚀 Mini Project: User Profile Finder</h2>
      <p style={styles.note}>
        Enter a User ID (1–10) to fetch their profile and posts from the API.
      </p>

      {/* Search Input */}
      <div style={styles.inputRow}>
        <input
          type="number"
          placeholder="Enter User ID (1-10)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
          min="1"
          max="10"
        />
        <button style={styles.btn} onClick={searchUser}>🔍 Search</button>
        {searched && (
          <button style={styles.resetBtn} onClick={() => {
            setUserId('');
            setUserData(null);
            setPosts([]);
            setError(null);
            setSearched(false);
          }}>
            Reset
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div style={styles.loadingBox}>
          ⏳ Fetching user data and posts...
        </div>
      )}

      {/* Error */}
      {error && <div style={styles.errorBox}>❌ {error}</div>}

      {/* User Profile */}
      {!loading && userData && (
        <div>
          <div style={styles.profileCard}>
            <div style={styles.avatar}>
              {userData.name.charAt(0)}
            </div>
            <div>
              <h3>{userData.name}</h3>
              <p>📧 {userData.email}</p>
              <p>📞 {userData.phone}</p>
              <p>🌐 {userData.website}</p>
              <p>🏢 {userData.company.name}</p>
              <p>📍 {userData.address.city}</p>
            </div>
          </div>

          {/* User Posts */}
          <h3 style={{ marginTop: '20px' }}>📝 Posts by {userData.name} ({posts.length})</h3>
          <div style={styles.postGrid}>
            {posts.slice(0, 6).map(post => (
              <div key={post.id} style={styles.postCard}>
                <h4>{post.title.substring(0, 40)}...</h4>
                <p style={styles.note}>{post.body.substring(0, 80)}...</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h1>⚛️ API Integration in React</h1>
        <p>26th February 2026 | Fetch, Axios & Mini Project</p>
      </div>

      {/* Fetch vs Axios Comparison */}
      <ComparisonTable />

      {/* Fetch Demo */}
      <FetchDemo />

      {/* Axios Demo */}
      <AxiosDemo />

      {/* Mini Project */}
      <MiniProject />

      {/* Footer */}
      <div style={styles.footer}>
        <p>Built with ⚛️ React | Internship Training - 26th February 2026</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#61dafb',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '20px',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '12px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  exampleBox: {
    backgroundColor: '#f0f4f8',
    padding: '15px',
    borderRadius: '10px',
    marginBottom: '15px',
  },
  inputRow: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    marginBottom: '15px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '10px',
    fontSize: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '200px',
  },
  btn: {
    padding: '10px 20px',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  resetBtn: {
    padding: '10px 20px',
    backgroundColor: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
  },
  loadingBox: {
    backgroundColor: '#fff3cd',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '16px',
  },
  errorBox: {
    backgroundColor: '#ffe0e0',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '10px',
    color: '#c0392b',
    fontWeight: 'bold',
  },
  successBox: {
    backgroundColor: '#e8ffe8',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '10px',
  },
  dataCard: {
    backgroundColor: '#f0f4f8',
    padding: '15px',
    borderRadius: '8px',
    marginTop: '10px',
  },
  userGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginTop: '15px',
  },
  userCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '10px',
    flex: '1',
    minWidth: '200px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  profileCard: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: '20px',
    borderRadius: '12px',
    marginTop: '10px',
  },
  avatar: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#61dafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  postGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    marginTop: '10px',
  },
  postCard: {
    backgroundColor: '#f0f4f8',
    padding: '15px',
    borderRadius: '10px',
    flex: '1',
    minWidth: '250px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  tableHeader: {
    backgroundColor: '#61dafb',
  },
  th: {
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    border: '1px solid #ddd',
  },
  td: {
    padding: '12px',
    border: '1px solid #ddd',
  },
  tableRowEven: {
    backgroundColor: '#f0f4f8',
  },
  tableRowOdd: {
    backgroundColor: 'white',
  },
  note: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px',
  },
  footer: {
    textAlign: 'center',
    padding: '20px',
    color: '#666',
  },
};

export default App;

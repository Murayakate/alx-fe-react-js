import React, { useState } from 'react';
import fetchUserData  from '../services/githubService';
import styles from './SearchBar.module.css';

function Search() {
  // 1. State Variables
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 2. Handle Search Logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops page refresh
    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const response = await fetchUserData(username);
      setUserData(response.data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
        
        {/* --- FORM SECTION --- */}
        <form onSubmit={handleSubmit} className={styles.wrapper}>
            <input 
                type="text" 
                placeholder="Search GitHub username..." 
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" className={styles.searchBtn}>Search</button>
        </form>

        {/* --- RESULTS SECTION --- */}
        {loading && <p>Loading...</p>}

        {error && <p>Looks like we cant find the user</p>}

        {userData && (
            <div className="user-card" style={{ marginTop: '20px', textAlign: 'center' }}>
                <img 
                  src={userData.avatar_url} 
                  alt="avatar" 
                  style={{ width: '100px', borderRadius: '50%' }} 
                />
                <h2>{userData.name || userData.login}</h2>
                
                <a href={userData.html_url} target="_blank" rel="noreferrer">
                    {userData.login}
                </a>
                
                <p>Repos: {userData.public_repos}</p>
                <p>Followers: {userData.followers}</p>
            </div>
        )}
    </div>
  );
}

export default Search;
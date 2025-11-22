import React, { useState } from 'react';
import fetchUserData from '../services/githubService'; // Make sure this matches your export type
import styles from './SearchBar.module.css';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        
        {/* FORM */}
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

        {/* RESULTS */}
        {loading && <p>Loading...</p>}
        {error && <p>Looks like we cant find the user</p>}

        {userData && (
            // Restoring the styles here:
            <div className={styles.card}>
                <div className={styles.banner}></div>
                
                <img 
                  src={userData.avatar_url} 
                  alt="avatar" 
                  className={styles.avatar} 
                />
                
                <div className={styles.content}>
                    <h2 className={styles.name}>{userData.name || userData.login}</h2>
                    <a href={userData.html_url} target="_blank" rel="noreferrer" className={styles.username}>
                        {userData.login}
                    </a>
                </div>
                
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{userData.public_repos}</span>
                        <span className={styles.statLabel}>Repos</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{userData.followers}</span>
                        <span className={styles.statLabel}>Followers</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{userData.following}</span>
                        <span className={styles.statLabel}>Following</span>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}

export default Search;
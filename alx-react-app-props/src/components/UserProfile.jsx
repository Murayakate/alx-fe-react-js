import { useContext } from 'react';
import { UserContext } from './UserContext.js';

function UserProfile() {
  // Using our context here just like in UserDetails
  const userData = useContext(UserContext);
  
  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-info">
        <div className="profile-field">
          <strong>Name:</strong> {userData.name}
        </div>
        <div className="profile-field">
          <strong>Email:</strong> {userData.email}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
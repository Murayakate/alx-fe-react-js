import { useContext } from 'react';
import { UserContext } from './UserContext';

function UserDetails() {
  // This is like reaching into our magical box to get the userData
  const userData = useContext(UserContext);
  
  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;
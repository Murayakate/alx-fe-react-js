import ProfilePage from './components/ProfilePage';
import { UserContext } from './components/UserContext';

function App() {
  // This is our user data that we want to share with other components
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    // UserContext.Provider is like opening our magical box
    // and putting userData inside it for other components to use
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}

export default App;
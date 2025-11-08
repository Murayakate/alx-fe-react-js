import UserInfo from './UserInfo';

// Notice we removed the { userData } prop - we don't need it anymore!
function ProfilePage() {
  // We don't need to pass any props - UserInfo can get data from Context
  return <UserInfo />;
}

export default ProfilePage;
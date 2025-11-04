const UserProfile = (props) => {
   return (
     <div style={{color: 'blue', border: '1px solid gray', padding: '10px', margin: '10px' }}>
     <h2 style={{ color: 'blue' }}>{props.name}</h2>
     <p>Age: <span style={{color: 'blue', fontWeight: 'bold' }}>{props.age}</span></p>
     <p> Bio: <span style={{ color: 'green', fontWeight: 'bold' }}>{props.bio}</span></p>
     </div>
   );
 };

 export default UserProfile;


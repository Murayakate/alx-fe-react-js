// Navbar.jsx
// This component will appear on all pages and help users navigate the site

// Import Link from react-router-dom to create navigation links
import { Link } from 'react-router-dom';

function Navbar() {
  // Style object for our navigation
  const navStyle = {
    backgroundColor: '#333',
    padding: '15px',
    marginBottom: '20px',
    display: 'flex', // Makes the nav items display in a row
    justifyContent: 'center', // Centers the nav items horizontally
    alignItems: 'center' // Centers the nav items vertically
  };

  // Style for our navigation links
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
    padding: '5px 10px',
    borderRadius: '3px',
    // When you hover over a link, it will become slightly transparent
    ':hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  };

  return (
    <nav style={navStyle}>
      {/* Each Link component will take us to a different page */}
      <Link to="/" style={linkStyle}>Home</Link>
      <Link to="/about" style={linkStyle}>About</Link>
      <Link to="/services" style={linkStyle}>Services</Link>
      <Link to="/contact" style={linkStyle}>Contact</Link>
    </nav>
  );
}

// Export the navbar component
export default Navbar;
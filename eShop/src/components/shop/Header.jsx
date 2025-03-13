import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const headerStyle = {
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const navStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem',
    };

    const homeStyle = {
        borderRadius: '50px',
        padding: '0.5rem 1.5rem',
        border: 'none',
        backgroundColor: '#6169d2',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',

    }

    const linkStyle = {
        color: '#333',
        fontSize: '1rem',
        marginRight: '1rem',
        textDecoration: 'none',
    };

    const formStyle = {
        display: 'flex',
        alignItems: 'center',
        maxWidth: '400px',
        margin: '0 auto',
    };

    const inputStyle = {
        width: '100%',
        borderRadius: '50px',
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        marginRight: '1rem',
    };

    const buttonStyle = {
        borderRadius: '50px',
        padding: '0.5rem 1.5rem',
        border: 'none',
        backgroundColor: '#6d73d7',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
    };

    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/" style={{ ...linkStyle, ...homeStyle }}>
                        Home
                    </Link>
                    <Link to="/shop?category=electronics" style={linkStyle}>
                        Electronics
                    </Link>
                    <Link to="/shop?category=books" style={linkStyle}>
                        Books
                    </Link>
                    <Link to="/shop?category=clothes" style={linkStyle}>
                        Clothes
                    </Link>
                </div>
                <form style={formStyle}>
                    <input
                        type="search"
                        placeholder="Search by product"
                        aria-label="Search"
                        style={inputStyle}
                    />
                    <button type="submit" style={buttonStyle}>
                        Search
                    </button>
                </form>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Link to="/auth" style={linkStyle}>
                        Log In
                    </Link>
                    <Link to="/cart" style={linkStyle}>
                        Cart
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;

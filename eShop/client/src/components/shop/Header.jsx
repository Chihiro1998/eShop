import React, { useState } from "react";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <Link to="/" style={{ marginLeft: "2rem" }}>
          <img
            src={logo}
            alt="E-Shop Logo"
            style={{ height: "50px", cursor: "pointer" }}
          />
        </Link>

        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            maxWidth: "700px",
            background: "#f3f3f3",
            padding: "0.5rem 1rem",
            borderRadius: "50px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1rem",
              cursor: "pointer",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            <option value="All Categories">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Clothes">Clothes</option>
          </select>

          <input
            type="search"
            placeholder="Search on E-Shop..."
            aria-label="Search"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              outline: "none",
              marginLeft: "1rem",
              fontFamily: "Roboto, sans-serif",
            }}
          />

          <button
            type="submit"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
          >
            <FiSearch />
          </button>
        </form>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginRight: "2rem",
          }}
        >
          <Link to="/cart" style={{ fontSize: "1.5rem", color: "#333" }}>
            <FiShoppingCart />
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "24px",
            }}
          >
            <span style={{ fontSize: "1.2rem", color: "#aaa" }}>|</span>
          </div>

          <div style={{ position: "relative" }}>
            <button
              onClick={toggleUserMenu}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              <FiUser />
            </button>

            {showUserMenu && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "2rem",
                  background: "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  to="/auth/login"
                  style={{
                    padding: "8px 16px",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  Log In
                </Link>
                <Link
                  to="/auth/register"
                  style={{
                    padding: "8px 16px",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

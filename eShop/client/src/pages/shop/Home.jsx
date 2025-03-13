import banner from "@/assets/Banner.png";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={banner}
          alt="E-Shop Banner"
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "15%",
            display: "flex",
            gap: "2rem",
          }}
        >
          <Link to="/productCategory">
            <button
              style={{
                width: "250px",
                height: "60px",
                backgroundColor: "#3B317D",
                color: "#fff",
                borderRadius: "8px",
                fontSize: "1.2rem",
                cursor: "pointer",
                border: "none",
                fontWeight: "bold",
                fontFamily: "Pacifico, cursive",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Buy Now
            </button>
          </Link>

          <Link to="/product/1">
            <button
              style={{
                width: "250px",
                height: "60px",
                backgroundColor: "transparent",
                color: "#3B317D",
                borderRadius: "8px",
                fontSize: "1.2rem",
                cursor: "pointer",
                border: "2px solid #3B317D",
                fontWeight: "bold",
                fontFamily: "Pacifico, cursive",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              View Detail
            </button>
          </Link>
        </div>
      </div>

      <h2
        style={{
          fontSize: "3rem",
          fontFamily: "Pacifico, cursive",
          fontWeight: "bold",
          marginTop: "0rem",
          marginLeft: "2rem",
          color: "#3B317D",
        }}
      >
        Featured Products
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "1.5rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "220px",
          }}
        >
          <Link
            to="/product/1"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#4C51BF",
            }}
          >
            Product 1
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

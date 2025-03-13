import banner from "@/assets/Banner.png"; // ✅ 确保 Banner 图片路径正确
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={banner}
          alt="E-Shop Banner"
          style={{ width: "100%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "2rem",
          color: "#444",
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
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "200px",
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
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "200px",
          }}
        >
          <Link
            to="/product/2"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#4C51BF",
            }}
          >
            Product 2
          </Link>
        </div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "200px",
          }}
        >
          <Link
            to="/product/3"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              color: "#4C51BF",
            }}
          >
            Product 3
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

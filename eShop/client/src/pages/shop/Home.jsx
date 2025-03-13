import { Link } from "react-router-dom";
import React from "react";

function Home() {
  return (
      <div>
          <h1>This is the home page</h1>

          <h2>Featured Products</h2>
          <div>
              <Link to="/product/1">Product 1</Link>
          </div>
      </div>
  )
}

export default Home;

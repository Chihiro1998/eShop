import {Link} from "react-router-dom";
import React from "react";


function ShopCheckout() {
  return (
      <div>

          <h1>check out Page</h1>

          <nav>
              <div>
                  <Link to="/cart">Return to Cart</Link>
              </div>
          </nav>
      </div>
  )
}


export default ShopCheckout

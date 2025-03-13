import {Link} from "react-router-dom";
import React from "react";



function ShopCart() {
  return (
      <div>

          <h1>Cart Page</h1>
          <nav >
              <div>
                  <Link to="/cart/checkout" >Check Out</Link>
              </div>
          </nav>
      </div>
  )
}


export default ShopCart

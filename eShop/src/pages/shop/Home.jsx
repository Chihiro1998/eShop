import { Link } from "react-router-dom";


function Home() {
  console.log("homhome")
  return (
    <div>
      <h1>Home Page</h1>
      <input type="text" placeholder="Search products..." />
      <h2>Categories</h2>
      <ul>
        <li><Link to="/shop?category=electronics">Electronics</Link></li>
        <li><Link to="/shop?category=clothing">Clothing</Link></li>
        <li><Link to="/shop?category=home">Home</Link></li>
      </ul>
      <h2>Featured Products</h2>
      <div>
        <Link to="/product/1">Product 1</Link>
        <Link to="/product/2">Product 2</Link>
      </div>
    </div>
  )
}

export default Home;

import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams(); // Get product's id

  return (
    <div>
      <h1>Product {id}</h1>
      <img src={`/images/product-${id}.jpg`} alt={`Product ${id}`} />
      <p>Product details here...</p>
      <button>Add to Cart</button>
    </div>
  )
}

export default Product
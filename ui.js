import React, { useState } from "react";

function App() {
  const productsData = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000 },
    { id: 2, name: "Headphones", category: "Electronics", price: 2000 },
    { id: 3, name: "Shoes", category: "Fashion", price: 3000 },
    { id: 4, name: "T-Shirt", category: "Fashion", price: 1000 },
    { id: 5, name: "Watch", category: "Accessories", price: 4000 }
  ];

  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = productsData.filter((product) => {
    const categoryMatch =
      category === "All" || product.category === category;

    const priceMatch =
      maxPrice === "" || product.price <= parseInt(maxPrice);

    return categoryMatch && priceMatch;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Mini E-Commerce Store</h1>
      <div style={styles.filters}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
        </select>

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} style={styles.card}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p style={styles.price}>₹{product.price}</p>
              <button style={styles.button}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    textAlign: "center"
  },
  heading: {
    marginBottom: "20px"
  },
  filters: {
    marginBottom: "20px"
  },
  input: {
    padding: "8px",
    margin: "0 10px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
  },
  price: {
    fontWeight: "bold"
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "black",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default App;

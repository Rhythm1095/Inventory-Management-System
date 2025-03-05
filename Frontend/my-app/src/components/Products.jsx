import React, { useState, useEffect } from "react";
import "../styles/Products.css";

const Products = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(""); // photo is now a URL string
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch products from the server
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(); // Load products when the component mounts
  }, []);

  // Handle product submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const newProduct = { name, quantity: parseInt(quantity), photo };

    try {
      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.status === 201) {
        setSuccessMessage("Product added successfully!");
        setError("");
        setName("");
        setQuantity("");
        setPhoto("");
        fetchProducts(); // Refresh the product list
      } else {
        const data = await response.json();
        setError(data.message || "Error adding product");
      }
    } catch (err) {
      setError("Error adding product: " + err.message);
    }
  };

  // Handle quantity update
  const handleQuantityChange = async (id, newQuantity, productName) => {
    if (newQuantity < 0) return;

    try {
      const response = await fetch(`http://localhost:5000/update-product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.status === 200) {
        fetchProducts(); // Refresh the product list
        // Show alert when the quantity is below 10
        if (newQuantity < 10) {
          alert(`Warning: The quantity of "${productName}" has dropped below 10.`);
        }
      } else {
        setError("Error updating product quantity");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-product/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        fetchProducts(); // Refresh the product list
      } else {
        setError("Error deleting product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <div className="products-container">
      <h2 className="title">Add Product</h2>
      <form onSubmit={handleProductSubmit} className="products-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Photo URL</label>
          <input
            type="text"
            id="photo"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
        </div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn">
          Add Product
        </button>
      </form>

      <h2 className="title">Product List</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Photo</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <img
                  src={product.photo} // Photo URL
                  alt={product.name}
                  className="product-photo"
                  style={{ width: "200px", height: "auto" }}
                />
              </td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleQuantityChange(product._id, product.quantity + 1, product.name)}
                >
                  +
                </button>
                <button
                  className="btn"
                  onClick={() => handleQuantityChange(product._id, product.quantity - 1, product.name)}
                  disabled={product.quantity <= 0}
                >
                  -
                </button>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;

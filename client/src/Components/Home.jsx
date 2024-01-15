// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link, Routes, Route, useParams } from 'react-router-dom';
import EditProduct from './EditProduct';
import ProductDetails from './ProductDetails';

const Home = ({ categories, isLoggedIn, onLogin, onLogout }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (category = '') => {
    try {
      const url = category
        ? `http://localhost:8000/api/products/by-category/${category}`
        : 'http://localhost:8000/api/products';

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}`);
      const updatedProducts = products.filter((product) => product.id !== productId);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error during product deletion:', error.response.data);
    }
  };

  return (
    <div>
      <Navbar
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        isLoggedIn={isLoggedIn}
        onLogout={onLogout}
      />
      <div>


        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} className="product-image" />
              <p className="product-title">{product.title}</p>
              {isLoggedIn && (
                <div className="product-actions">
                  <button onClick={() => handleDelete(product.id)}>Delete</button>
                  <Link to={`/edit-product/${product.id}`}>
                    <button>Edit</button>
                  </Link>
                  <Link to={`/product-details/${product.id}`}>
                    <button>View Details</button>
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
};

export default Home;
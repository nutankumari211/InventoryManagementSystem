// EditProduct.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';


const EditProduct = ({ productId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleEditProduct = async () => {
    try {
      // Placeholder: Add your update product logic here
      await axios.put(`http://localhost:8000/api/products/${id}`, product);

      // Assuming product update is successful, you may redirect or handle the UI accordingly
      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error during product update:', error);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>
      <form className="edit-form">
        <label>
          Title:
          <input type="text" name="title" value={product.title} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={product.description} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" name="price" value={product.price} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Discount Percentage:
          <input
            type="number"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Rating:
          <input type="number" name="rating" value={product.rating} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Stock:
          <input type="number" name="stock" value={product.stock} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Brand:
          <input type="text" name="brand" value={product.brand} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Category:
          <input type="text" name="category" value={product.category} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Thumbnail URL:
          <input type="text" name="thumbnail" value={product.thumbnail} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleEditProduct}>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

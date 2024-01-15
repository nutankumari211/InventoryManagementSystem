import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  console.log('Product ID:', id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products/details/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    console.log('Product State:', product);
  }, [product]);

  if (!product) {
    return <p className="loading-message">Loading...</p>;
  }

  return (
    <div className="product-details-container">
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">Price: ${product.price}</p>
      <p className="product-discount">Discount: {product.discountPercentage}%</p>
      <p className="product-rating">Rating: {product.rating}</p>
      <p className="product-stock">Stock: {product.stock}</p>
      <p className="product-brand">Brand: {product.brand}</p>
      <p className="product-category">Category: {product.category}</p>
      <img className="product-thumbnail" src={product.thumbnail} alt={product.title} />

      {product.images && (
        <div className="additional-images-container">
          <h3 className="additional-images-title">Additional Images</h3>
          {product.images.map((image, index) => (
            <img key={index} className="additional-image" src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const AddProduct = () => {
const { id } = useParams(); // Use useParams to get the id from the route
const navigate = useNavigate();
const [productDetails, setProductDetails] = useState({
title: '',
description: '',
price: 0,
discountPercentage: 0,
rating: 0,
stock: 0,
brand: '',
category: '',
thumbnail: '',
images: [],
});

useEffect(() => {
// If id is available, fetch the existing product details
console.log('ID:', id);
if (id) {
const fetchProductDetails = async () => {
try {
const response = await fetch(`http://localhost:8000/api/products/${id}`);
const data = await response.json();
console.log('Fetched Product Details:', data);

// set the initial state with the fetched data
setProductDetails(data);
} catch (error) {
console.error('Error fetching product details:', error);
}
};

fetchProductDetails();
}
}, [id]);


const handleInputChange = (e) => {
const { name, value } = e.target;
setProductDetails((prevDetails) => ({
...prevDetails,
[name]: value,
}));
};

const handleImageChange = (e) => {
const { value } = e.target;
const imagesArray = value ? value.split(',') : [];

// Update the productDetails state with the image URLs
setProductDetails((prevDetails) => ({
...prevDetails,
images: imagesArray,
}));
};


const handleSubmit = async (e) => {
e.preventDefault();

// Check if all required fields are filled
const requiredFields = ['title', 'price', 'brand', 'category', 'thumbnail'];
const isFormValid = requiredFields.every((field) => productDetails[field] !== '');

if (!isFormValid) {
alert('Please fill in all required fields');
return;
}


console.log('Product Details:', productDetails);
try {
const response = await fetch('http://localhost:8000/api/products', {
method:id?'PUT':'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(productDetails),
});
console.log('Full Response:', response);

const data = await response.json();
console.log('Product saved successfully:', data);
navigate('/'); 

} catch (error) {
console.error('Error saving product:', error);
}
};

return (
<div className="add-product-container">
<h2 className="add-edit-button">{id ? 'Edit Product' : 'Add Product'}</h2>
<form onSubmit={handleSubmit} className="product-form">
<label>Title:</label>
<input type="text" name="title" value={productDetails.title} onChange={handleInputChange} required />

<label>Description:</label>
<textarea
name="description"
value={productDetails.description}
onChange={handleInputChange}
></textarea>

<label>Price:</label>
<input type="number" name="price" value={productDetails.price} onChange={handleInputChange} required />

<label>Discount Percentage:</label>
<input
type="number"
name="discountPercentage"
value={productDetails.discountPercentage}
onChange={handleInputChange}
/>

<label>Rating:</label>
<input type="number" name="rating" value={productDetails.rating} onChange={handleInputChange} />

<label>Stock:</label>
<input type="number" name="stock" value={productDetails.stock} onChange={handleInputChange} />

<label>Brand:</label>
<input type="text" name="brand" value={productDetails.brand} onChange={handleInputChange} required />

<label>Category:</label>
<input
type="text"
name="category"
value={productDetails.category}
onChange={handleInputChange}
required
/>

<label>Thumbnail URL:</label>
<input
type="text"
name="thumbnail"
value={productDetails.thumbnail}
onChange={handleInputChange}
required
/>

<label>Images (URLs, comma-separated):</label>
<input
type="text"
name="images"
value={productDetails.images.join(',')}
onChange={handleImageChange}
/>

<button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
</form>
</div>
);
};

export default AddProduct;
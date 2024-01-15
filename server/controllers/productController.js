// controllers/productController.js
// controllers/productController.js
const axios = require('axios');
const { Product } = require('../models');
const { Sequelize, Op, fn, col } = require('sequelize');


const fetchAndStoreExternalProducts = async (req, res) => {
  try {
    // Fetch data from the external API
    const response = await axios.get('https://dummyjson.com/products');
    const externalProducts = response.data.products;

    // Create arrays to store unique product IDs and category names
    const uniqueProductIds = [];
    const uniqueCategoryNames = [];

    // Map the fetched data to match the structure of the Product model
    const mappedProducts = externalProducts.map(product => {
      // Check if the product ID already exists in the uniqueProductIds array
      if (uniqueProductIds.includes(product.id)) {
        // Skip this product to avoid conflicts
        return null;
      }

      // If the product ID is not present, add it to the uniqueProductIds array
      uniqueProductIds.push(product.id);

      // Return the mapped product without the 'id' field
      return {
        title: product.title,
        description: product.description,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        thumbnail: product.thumbnail,
        // Combine multiple images into a single string
        images: Array.isArray(product.images) ? product.images.join(',') : product.images,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    // Filter out null values (skipped products) from the mappedProducts array
    const validMappedProducts = mappedProducts.filter(product => product !== null);
    console.log(validMappedProducts);

    // Store the mapped products in the database
    await Product.bulkCreate(validMappedProducts);

    // Fetch unique category names from the products table
    const uniqueCategoriesFromProducts = [...new Set(mappedProducts.map(product => product.category))];

  
    res.json({ message: 'External products fetched and stored successfully.' });
  } catch (error) {
    console.error('Error fetching and storing external products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const createProduct = async (req, res) => {
  try {
  const newProduct = req.body;
  
  // Validate required fields and data types
  if (!newProduct.title || !newProduct.price || !newProduct.category || !newProduct.brand) {
  return res.status(400).json({ error: 'Title, price, category, and brand are required fields.' });
  }
  
  if (typeof newProduct.title !== 'string' || typeof newProduct.category !== 'string' || typeof newProduct.brand !== 'string') {
  return res.status(400).json({ error: 'Title, category, and brand must be strings.' });
  }
  
  if (typeof newProduct.price !== 'number' || isNaN(newProduct.price) || newProduct.price <= 0) {
  return res.status(400).json({ error: 'Price must be a positive number.' });
  }
  
  if (newProduct.discountPercentage && (typeof newProduct.discountPercentage !== 'number' || isNaN(newProduct.discountPercentage) || newProduct.discountPercentage < 0)) {
  return res.status(400).json({ error: 'Discount percentage must be a non-negative number.' });
  }
  
  if (newProduct.rating && (typeof newProduct.rating !== 'number' || isNaN(newProduct.rating) || newProduct.rating < 0 || newProduct.rating > 5)) {
  return res.status(400).json({ error: 'Rating must be a number between 0 and 5.' });
  }
  
  if (newProduct.stock && (typeof newProduct.stock !== 'number' || isNaN(newProduct.stock) || newProduct.stock < 0)) {
  return res.status(400).json({ error: 'Stock must be a non-negative number.' });
  }
  
  
  const createdProduct = await Product.create(newProduct);
  res.status(201).json(createdProduct);
  } catch (error) {
  console.error('Error creating product:', error);
  res.status(500).json({ error: 'Internal Server Error' });
  }
  };


const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update(updatedProductData);

    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete the product
    await product.destroy();

    // Respond with a success message
    res.status(200).json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductDetails = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUniqueCategories = async (req, res) => {
  try {
    const uniqueCategories = await Product.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category'],
      ],
    });
    res.json({ categories: uniqueCategories });
  } catch (error) {
    console.error('Error fetching unique categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProductsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.findAll({
      where: { category },
    });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  fetchAndStoreExternalProducts,
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getUniqueCategories,
  getProductsByCategory
};

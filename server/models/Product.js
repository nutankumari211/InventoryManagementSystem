const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    discountPercentage: {
      type: DataTypes.FLOAT,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    brand: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    images: {
      type: DataTypes.TEXT, 
      get() {
        const rawValue = this.getDataValue('images');
        // Return an array of image URLs if available, otherwise an empty array
        return rawValue ? rawValue.split(',') : [];
      },
      set(value) {
        // Store multiple URLs as a single string, separated by commas
        this.setDataValue('images', Array.isArray(value) ? value.join(',') : value);
      },
    },
  });



  return Product;
};

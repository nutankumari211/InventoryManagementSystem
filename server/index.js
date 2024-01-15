const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const db = require('./models');

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (React build)
app.use(express.static(path.join(__dirname, '../client/dist')));

// API routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/api/users', userRoutes);
app.use('/', productRoutes);

// Serve React app on any route other than API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Sync the database and start the server
db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync the database:', error);
  });

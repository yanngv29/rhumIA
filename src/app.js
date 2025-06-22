const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const connectDB = require('./config/database');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const authRoutes = require('./routes/authRoutes');
const rhumRoutes = require('./routes/rhumRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const port = process.env.PORT || 8080;

// Load Swagger document
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Logging
app.use(morgan('dev'));

// Security headers
app.use(helmet());

// Compress responses
app.use(compression());

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rhums', rhumRoutes);
app.use('/api/v1/ingredients', ingredientRoutes);
app.use('/api/v1/recipes', recipeRoutes);

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Any route that is not an API route will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
} else {
  // For development, just show a simple message
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});
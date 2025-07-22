/* ================================================================================
/app.js - Main Application File
================================================================================
This is the entry point of our application. It sets up the Express server, 
connects the essential middleware, defines the main routes, and establishes
a centralized error handling mechanism. No major changes here from the previous version.
*/
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');
const { sequelize } = require('./models'); // Import sequelize instance from models
const errorHandler = require('./middleware/errorHandler');

// --- Route Imports ---
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');

// --- Initialize Express App ---
const app = express();

// --- Test Database Connection ---
const assertDatabaseConnectionOk = async () => {
	console.log('Checking database connection...');
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.error('Unable to connect to the database:');
		console.error(error.message);
		process.exit(1);
	}
};
assertDatabaseConnectionOk();

// --- Core Middleware ---
app.use(cors()); 
app.use(helmet()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// --- Rate Limiting ---
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
});
app.use(limiter);

// --- API Routes ---
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Blog Platform API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

// --- Centralized Error Handling ---
app.use(errorHandler);

// --- Start Server ---
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});

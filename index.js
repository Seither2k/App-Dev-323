const express = require('express');
const mongoose = require('mongoose');
const readline = require('readline');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const winston = require('winston'); // Import winston for logging
const promMiddleware = require('express-prometheus-middleware'); // Import Prometheus middleware
const studentRoute = require('./routes/student.route.js');
const assignmentRoute = require('./routes/assignment.route.js');
const feedbackRoute = require('./routes/feedback.route.js');



const app = express();
app.use(express.json()); // To parse JSON request body
require('dotenv').config({ path: 'config.env' }); // Load custom .env file

// Secret key for JWT signing and verification
const JWT_SECRET = process.env.JWT_SECRET;

// Set up Winston for logging
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console(), // Log to console as well
    ],
});

app.use('/api/student',authenticateJWT, studentRoute);
app.use('/api/assignment', authenticateJWT,assignmentRoute);
app.use('/api/feedback', authenticateJWT, feedbackRoute);


//add authenticatedJWT

// Set up Morgan for HTTP request logging
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Prometheus middleware to collect metrics
app.use(promMiddleware({
    metricsPath: '/metrics', // Expose metrics at this path
    collectDefaultMetrics: {} // Collect default metrics like memory usage and CPU
}));

// Function to get user input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to prompt the user for MongoDB credentials
function getMongoCredentials() {
    return new Promise((resolve) => {
        rl.question('Enter MongoDB username: ', (username) => {
            rl.question('Enter MongoDB password: ', (password) => {
                rl.close();
                resolve({ username, password });
            });
        });
    });
}

// Middleware to protect routes and verify JWT
function authenticateJWT(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
            if (err) {
                logger.error('JWT verification failed: ' + err.message);
                return res.sendStatus(403); // Forbidden if token is invalid
            }
            req.user = user; // Attach user info to request
            next();
        });
    } else {
        logger.warn('No token provided for authentication.');
        res.sendStatus(401); // Unauthorized if no token is provided
    }
}

// Route to authenticate a user and generate a JWT
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const storedUser = { username: 'testuser', passwordHash: bcrypt.hashSync('password', 8) };

    // Check if username matches and password is correct
    if (username === storedUser.username && bcrypt.compareSync(password, storedUser.passwordHash)) {
        const token = jwt.sign({ username: storedUser.username }, JWT_SECRET, { expiresIn: '1h' });
        logger.info(`User ${username} logged in successfully.`);
        res.json({ token });
    } else {
        logger.warn(`Failed login attempt for user: ${username}`);
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Public route
app.get('/', (req, res) => {
    res.send('Welcome to our server running on port 5000!!!');
});

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
    res.send(`Hello ${req.user.username}, you have access to this protected route!`);
});

// Error-handling middleware
app.use((err, req, res, next) => {
    logger.error(err.stack); // Log the error stack
    res.status(500).send('Something broke!');
});

// Get MongoDB credentials from the user and connect
getMongoCredentials().then(({ username, password }) => {
    const mongoUri = `mongodb+srv://${username}:${password}@cluster0.pzujk.mongodb.net/serverDB`;

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        logger.info("Connected to database!");
        app.listen(5000, () => {
            logger.info('Server is running on port 5000');
        });
    })
    .catch((error) => {
        logger.error("Connection failed: " + error.message);
    });
});

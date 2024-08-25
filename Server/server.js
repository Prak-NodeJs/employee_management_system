const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path:"D:/employee_management_system/Server/.env"});

const cors = require('cors');
const userRoutes = require('./routes/employee.route')
const authRoutes = require('./routes/auth.route')
const {notFound} = require('./middleware/ApiError')

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

//serve static files 
app.use('/images', express.static('uploads'))


// Error handling middleware for 404 Not Found
app.use(notFound);

// Error handling middleware for other errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ success: false, message });
    next();
});


// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); 
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port number ${PORT}`);
});

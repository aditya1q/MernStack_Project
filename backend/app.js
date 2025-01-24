import express from 'express';
import { connectDB } from './config/db.js';
import { PORT, MONGO_URL } from './config/env.js';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middleware/corsMiddleware.js';
import authRoute from './routes/authRoute.js'
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware

// 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);

// Routes
app.use('/api', authRoute);

// Error handling middleware
app.use(errorHandler);

// Connect to DB and start server
connectDB(MONGO_URL);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

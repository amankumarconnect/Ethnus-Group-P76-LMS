import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Route Imports
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// Middleware Imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import paymentRoutes from './routes/paymentRoutes.js';
// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);


// --- Static Folder for Uploads ---
// Required for ES modules to get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- Fallback & Error Handling ---
app.get('/', (req, res) => {
  res.send('API is Running!')
});

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
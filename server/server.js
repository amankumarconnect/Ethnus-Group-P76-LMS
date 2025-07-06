import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // Use env var or Vite default
  credentials: true, // If you need cookies/auth headers
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
  res.send('API is Running!')
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
});
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/products', productRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`server started, at port ${port}`);
});

import express from 'express';
import bodyParser from 'body-parser';
import healthcheckRoutes from './routes/healthcheck';
import productRoutes from './routes/products';
import categoryRoutes from "./routes/categories";
import cartRoutes from "./routes/cart"
import userRoutes from "./routes/users"

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api', healthcheckRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', cartRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import healthcheckRoutes from './routes/healthcheck';
import productRoutes from './routes/products';
import categoryRoutes from "./routes/categories";
import cartRoutes from "./routes/cart"
import userRoutes from "./routes/users"

const app = express();

const corsOptions = {
    origin: 'http://localhost:3001', //URL frontend
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api', healthcheckRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', cartRoutes);
app.use('/api', userRoutes);

export default app;
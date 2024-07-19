import express from 'express';
import bodyParser from 'body-parser';
import healthcheckRoutes from './routes/healthcheck';

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('API Running'));

app.use('/api', healthcheckRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
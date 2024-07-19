import { Router } from 'express';
import sequelize from '../config/database';

const router = Router();

router.get('/healthcheck', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.status(200).json({ message: 'Connection has been established successfully.' });
  } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ message: 'Unable to connect to the database', error: err.message });
    } else {
        res.status(500).json({ error: 'Unknown error' });
    }
  }
});

export default router;

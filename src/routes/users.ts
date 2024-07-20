import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

export default router;
import { Router } from 'express';
import Cart from '../models/Cart';

const router = Router();

router.post('/cart', async (req, res) => {
    try {
        const cartItem = await Cart.create(req.body);
        res.status(201).json(cartItem);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

router.get('/cart', async (req, res) => {
    try {
        const cartItems = await Cart.findAll();
        res.status(200).json(cartItems);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.post('/cart/checkout', async (req, res) => {
    try {
        // implementar la lógica de checkout
        res.status(200).json({ message: 'Checkout successful' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

export default router;

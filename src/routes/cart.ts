import { Router } from 'express';
import CartItem from '../models/Cart';
import Product from '../models/Product';

const router = Router();

// Obtener los ítems del carrito
router.get('/cart', async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({
            include: Product,
        });
        res.status(200).json(cartItems);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

// Agregar un ítem al carrito
router.post('/cart', async (req, res) => {
    const { product_id, quantity } = req.body;
    try {
        let cartItem = await CartItem.findOne({
            where: { product_id },
            include: { model: Product, as: 'product' },
        });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await CartItem.create({
                product_id,
                quantity,
            });
            await cartItem.reload({ include: { model: Product, as: 'product' } });
        }
        res.status(201).json(cartItem);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

// Eliminar un ítem del carrito
router.delete('/cart/:id', async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (cartItem) {
            await cartItem.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

// Limpiar el carrito
router.delete('/cart', async (req, res) => {
    try {
        await CartItem.destroy({ where: {} });
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

export default router;
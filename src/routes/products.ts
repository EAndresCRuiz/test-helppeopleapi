import { Router } from 'express';
import Product from '../models/Product';

const router = Router();

router.post('/products', async (req, res) => {
    try {
        console.log("holaaaaaaaaaaaa!!");
        console.log(req.body);
        
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        console.log(err);
        
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const [updated] = await Product.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedProduct = await Product.findByPk(req.params.id);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        const deleted = await Product.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

export default router;

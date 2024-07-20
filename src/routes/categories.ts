import { Router } from 'express';
import Category from '../models/Category';

const router = Router();

router.post('/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.get('/categories/:id', async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.put('/categories/:id', async (req, res) => {
    try {
        const [updated] = await Category.update(req.body, {
            where: { id: req.params.id },
        });
        if (updated) {
            const updatedCategory = await Category.findByPk(req.params.id);
            res.status(200).json(updatedCategory);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

router.delete('/categories/:id', async (req, res) => {
    try {
        const deleted = await Category.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Category not found' });
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
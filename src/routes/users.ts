import { Router } from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import User from '../models/User';

const router = Router();
const upload = multer({ dest: 'uploads/' });

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

router.post('/users/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        type UserCreationAttributes = {
            username: string;
            email: string;
            password: string;
        };

        const users: UserCreationAttributes[] = [];
        fs.createReadStream(req.file.path)
            .pipe(csv())
            .on('data', (row) => {
                users.push({
                    username: row.username,
                    email: row.email,
                    password: row.password,
                });
            })
            .on('end', async () => {
                await User.bulkCreate(users);
                res.status(201).json({ message: 'Users uploaded successfully' });
            });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error' });
        }
    }
});

router.get('/users', async (req, res) => {
    try {
        const products = await User.findAll();
        res.status(200).json(products);
    } catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

export default router;
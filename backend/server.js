const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Product = require('./models/Product');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err));

// Rotas para categorias
app.post('/api/categories', async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ message: 'Nome e descrição são obrigatórios' });
    }
    const newCategory = new Category({ name, description });
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rotas para produtos
app.post('/api/products', async (req, res) => {
    const { name, quantity, price, category } = req.body;
    if (!name || !quantity || !price || !category) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }
    const newProduct = new Product({ name, quantity, price, category });
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


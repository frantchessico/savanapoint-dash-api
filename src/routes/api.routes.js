const api = require('express').Router();
const Blog = require('../models/Blog')


api.get('/api', async (req, res) => {
    const articles = await Blog.find().sort({
        createdAt: 'desc'
    })
    return res.json(articles)
});



module.exports = api;
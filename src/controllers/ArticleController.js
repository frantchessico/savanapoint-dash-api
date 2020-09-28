const Blog = require('../models/Blog');

module.exports = {
    async getOneArticle (req, res)  {
        const blog = await Blog.findOne({slgu: req.body.slgu})
     
        return res.json(blog)
        
     }
}
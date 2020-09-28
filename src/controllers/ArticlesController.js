const Blog = require('../models/Blog');
const firebase = require('../config/firebase');
const db = require('../config/firebase');


module.exports = {
    async index(req, res) {
        const articles = await Blog.find().sort({
            createdAt: 'desc'
        })
       return res.json(articles)
    },

    async store(req, res) {
      
        const { title,  description, markdown, code} = req.body;

   
    

   const currentUser = await auth.AUTHENTICATION.currentUser;
   db.DATABASE.collection('users').where('uid', '==', currentUser.uid)
   .get().then(user => {
       
       user.forEach(async data => {
         db.DATABASE.collection('articles').add({
            uid: currentUser.uid,
            title: title,
            markdown: markdown,
            userName: data.id,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL,
            likeCounter: 0,
            commentCounter: 0,
            viewCounter: 0,
            createdAt: Date.now(),
           
           }).then( async () => {
            const blog = new Blog({
            uid: currentUser.uid,
            title: title,
            markdown: markdown,
            userName: data.id,
            displayName: currentUser.displayName,
            email: currentUser.email,
            photoUrl: currentUser.photoURL,
            likeCounter: 0,
            commentCounter: 0,
            viewCounter: 0,
            });
                await blog.save()
           }).then(() => {
               return res.json({successMessage: 'Saved'})
           }).catch(err => {
               if(err.code === 11000)
               return res.json({error: 'Uma dupicação de chave, não pode ter dois artigos com o mesmo titulo'})
           })
       })
   })

   
   

  


    



    }
}
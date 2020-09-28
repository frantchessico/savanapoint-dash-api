const mongoose = require('mongoose')

var url = 'mongodb://localhost/blog';
const prod = 'mongodb+srv://francisco-savanapoint:Luisa@jaime1996@cluster0-jao6i.mongodb.net/narticles?retryWrites=true&w=majority'



mongoose.connect(prod, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('DB is connected'))
.catch(() => console.log('DB Error!'))


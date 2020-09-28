const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const  path = require('path');
const exphbs = require('express-handlebars');

const cors = require('cors');



const app = express();
app.use(cors())
 require('./db/db');




app.set('views', path.join(__dirname, 'pages/home'));

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));



app.set('view engine', '.hbs');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
});
app.use(multer({storage}).single('photoURL'));



app.use(express.static(path.join(__dirname, 'public')));




const router = require('./routes/routes');
const homePage = require('./routes/index.routes');

app.use('/api',router);
app.use(homePage);

module.exports = app;
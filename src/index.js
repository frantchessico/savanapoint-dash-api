const app = require('./app');

const port = process.env.PORT || 8200;
app.listen(port, () => {
    console.log(`Server on port ${port}`)
});




const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

//Uncomment when we have mongo added
// var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/<name of mongodb>');

const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');




app.get('/', (req, res) => {
    res.render('home', {msg:'Check out our other properties'});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

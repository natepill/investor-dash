
const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser')


//Uncomment when we have mongo added
// var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/<name of mongodb>');

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

    res.render('home', {msg:'Check out our other properties'});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.post('/home', (req, res) => {
    console.log(req.body)
    // res.render('detail_view',{})
})

app.get('/detail_view', (req, res) => {
    res.render('detail_view', {})
})

app.get('/properties_view', (req, res) => {
    var properties = [{price: 485289, bedrooms: 2, bathrooms: 2, address: "245 South Market st." }, {price: 485289, bedrooms: 2, bathrooms: 2, address: "2451 South Market st." },{price: 485289, bedrooms: 2, bathrooms: 2, address: "4245 South second st." },{price: 4859289, bedrooms: 2, bathrooms: 2, address: "245 South Market st." },{price: 485289, bedrooms: 2, bathrooms: 2, address: "245 West Market st." },{price: 485289, bedrooms: 2, bathrooms: 2, address: "245 South Market st." },{price: 485289, bedrooms: 2, bathrooms: 2, address: "245 South Market st." }
    ]

    res.render('properties_view', {properties: properties})
})

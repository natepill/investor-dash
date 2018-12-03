const {mongoose} = require('./db/mongoose');

const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');


const fs = require('fs');
const request = require('request')

const csv = require('csvtojson')
const csvFilePath = 'properties-22039.csv'
const port = process.env.PORT || 3000;

var guestProps = []


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));

var {Property} = require('./models/property');



app.get('/zillow', (req, res) => {
    // res.render('home', {msg:'Check out our other properties'});

    const {spawn} = require('child_process');
    const pyProg = spawn('python', ['./scrape.py', '94102']);

    pyProg.stdout.on('data', function(data) {

    res.send(data.toString());
    console.log(data.toString());
    res.write(data);
    res.end('end');

    });

})


app.get('/', (req, res) => {
    res.render('home',{})
})

app.get('/properties_view', (req, res) => {

    Property.find({}).then(properties => {
    res.render('properties_view', {properties: properties})
    }).catch((err) => {
        console.log(err.message);
    });
})

app.get('/dashboard', (req, res) => {
    console.log(guestProps)
    res.render('dashboard', {properties: guestProps})
})

app.post('/addProperties', (req, res) => {
    Property.find({_id:req.body.id}).then((property) => {
        guestProps.push(property)
        res.redirect('dashboard')
    }).catch((err) => {
        console.log(err.message);
    });
})

app.post('/property_selected', (req, res) => {
    Property.find({_id:req.body.id}).then((property) => {
        res.render('detail_view', {property: property})
    }).catch((err) => {
        console.log(err.message);
    });
})

app.get('/detail_view', (req, res) => {

    res.render('detail_view', {})
})










app.post('/property-cards', (req, res) => {
    let returnProps = [];
    //Web Scraper for Zillow already created csv file for zipcode 22039
    //Convert csv file of properties in zipcode to an array of JSON objects


    //Could probably refactor the (what will be) API request to the property csv
    csv().fromFile(csvFilePath).then((jsonArray)=>{
        jsonArray.forEach(function(prop) {
            const card = new Property({
                address: prop.address,
                beds: prop['facts and features'],
                baths: prop['facts and features'],
                size: prop['facts and features'],
                price: prop.price,
                realestateprovider: prop['real estate provider']
            });
            card.save().catch((err) => {
                console.log(err);
            });
        });
        res.json(jsonArray);
    })
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})


/*
        //For every JSON property object in our property_array; we store their values into our Mongo Models
    //     var i;
    //     for (i = 0; i < jsonArray.length; i++) {
    //         console.log(jsonArray[i]);
    //         var card = new Property({
    //             address: jsonArray[i].address,
    //             beds: jsonArray[i]['facts and features'],
    //             baths: jsonArray[i]['facts and features'],
    //             size: jsonArray[i]['facts and features'],
    //             price: jsonArray[i].price,
    //             realestateprovider: jsonArray[i]['real estate provider']
    //         })
    //
    //         card.save().then((property) => {
    //             res.json(property)
    //         }).catch((err) => {
    //             console.log(err);
    //         })
    //     }
    //
    // }).catch((err) => {
    //     console.log(err);
    // })
*/

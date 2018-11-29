
const {mongoose} = require('./db/mongoose');

const express = require('express')
const app = express()
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const fs = require('fs');
const request = require('request')

const csv = require('csvtojson')
const csvFilePath = 'properties-22039.csv'


var {Property} = require('./models/property');

//Uncomment when we have mongo added
// var mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/<name of mongodb>');

const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// NOTE: Web Scraper for Zillow --> Already created file for zipcode 22039
// let csvToJson = require('convert-csv-to-json');
// let fileInputName = 'properties-22039.csv';
// let fileOutputName = 'JSON-properties.json';
// csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);


// Get JSON from file
var contents = fs.readFileSync("JSON-properties.json");
// Define to JSON type
var propertyJSON = JSON.parse(contents);





app.get('/', (req, res) => {
    res.render('home', {msg:'Check out our other properties'});
})



app.post('/property-cards', (req, res) => {

    //Convert csv file of properties in zipcode to an array of JSON objects
    var property_array = csv().fromFile(csvFilePath).then((jsonArray)=>{

        //For every JSON property object in our property_array; we store their values into our Mongo Models
        var i;
        for (i = 0; i < jsonArray.length; i++) {

            var card = new Property({
                address: jsonArray[i].address,
                beds: jsonArray[i].factsandfeatures,
                baths: jsonArray[i].factsandfeatures,
                size: jsonArray[i].factsandfeatures,
                price: jsonArray[i].price,
                realestateprovider: jsonArray[i].realestateprovider
            })

            card.save().then((property) => {
                res.send(property)
            }).catch((err) => {
                console.log(err);
            })

            console.log(card);

        }


    }).catch((err) => {
        console.log(err);
    })

})




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

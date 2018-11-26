const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});


const Property = mongoose.model('Property', {
  address: String,
  beds: Number,
  baths: Number,
  price: Number,
  roi: Number,
  cashflow: Number,
  description: Number,
  amount: Number
});


module.exports = Property

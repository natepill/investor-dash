const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});


const Property = mongoose.model('Property', {

  address:{
      type: String,
      required: true,
      trim: true,
      default: "DEFAULT ADDRESS"
  },
  beds:{
      type: String,
      required: false,
      trim: true,
      default: 1
  },
  baths: {
      type: String,
      required: false,
      trim: true,
      default: 2
  },
  size:{
      type: String,
      required: false,
      trim: true,
      default: 3
  },
  price: {
      type: String,
      required: true,
      trim: true,
      default: 100000
  },
  realestateprovider: {
      type: String,
      required: false,
      trim: true,
      default: "REAL ESTATE PROVIDER"
  },

  roi: {
      type: Number,
      required: true,
      trim: true,
      default: 9999
  },
  cashflow: {
      type: Number,
      required: true,
      trim: true,
      default: 00000
  }
});





module.exports = {Property}

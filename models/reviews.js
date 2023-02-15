const mongoose = require('mongoose');

const review = new mongoose.Schema({
    comment:String,
    rating:Number
})

module.exports = mongoose.model('Review',review);
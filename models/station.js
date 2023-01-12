const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const station = new Schema({
    name:String,
    description:String,
    image:String,
    price:Number,
    location:String,
    fastcharging:Boolean
    
});



module.exports = mongoose.model('Station',station)
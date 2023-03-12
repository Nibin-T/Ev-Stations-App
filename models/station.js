const mongoose = require('mongoose');
const Review = require('./reviews');
const User = require('./user');

const Schema = mongoose.Schema;

const station = new Schema({
    name:String,
    description:String,
    image:String,
    price:Number,
    location:String,
    fastcharging:Boolean,
    author: {type:mongoose.Schema.Types.ObjectId , ref:'User'},
        
    review:[
        {type:mongoose.Schema.Types.ObjectId , ref:'Review'}
    ]
});

station.post('findOneAndDelete',async function (doc) {
    if (doc){
        await Review.deleteMany({
            _id : {
                $in : doc.review
            }
        })
    }
})


module.exports = mongoose.model('Station',station)



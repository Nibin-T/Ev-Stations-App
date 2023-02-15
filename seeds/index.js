const mongoose = require('mongoose');
const station = require('../models/station')
const reviews = require('../models/reviews')
const {name,location,description,fastcharge} = require('./seedhelper');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/Ev-station')
  .then(()=>{
    console.log("Mongo connected")
  })
  .catch(err =>{
    console.log("Error")
  })


const seed = async () =>{
    await station.deleteMany({});
    await reviews.deleteMany({});
    for(let i=0;i<2;i++){
        const sta = new station({
            name:`${name[Math.floor(Math.random() * 3)]}`,
            description:`${description[Math.floor(Math.random() * 3)]}`,
            location:`${location[Math.floor(Math.random() * 3)]}`,
            fastcharging:`${fastcharge[Math.floor(Math.random() * 1)]}`,
            image:'https://source.unsplash.com/collection/483251',
            price:`${Math.floor(Math.random()*500-100+1)+100}`
        })
        await sta.save();
    }
}


seed()
  .then(()=>{
    console.log("Data Seeded");
  })
  .catch(err=>{
    console.log(err);
  })
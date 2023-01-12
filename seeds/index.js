const mongoose = require('mongoose');
const station = require('../models/station')
const {name,location,description,fastcharge} = require('./seedhelper');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Ev-station');
}

const seed = async () =>{
    await station.deleteMany({});
    for(let i=0;i<3;i++){
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


seed();
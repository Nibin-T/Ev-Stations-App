const express = require('express');
const mongoose = require('mongoose');
const station = require('./models/station');
const ejsmate = require('ejs-mate')
const app = express();
const AppError = require('./error');
const methodOverride = require('method-override');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))
main().catch(err => console.log(err));

async function main() { 
  await mongoose.connect('mongodb://127.0.0.1:27017/Ev-station');
}
app.set('view engine','ejs');
  
app.listen('3000' , ()=>console.log('listening on port 3000'));
 
app.engine('ejs',ejsmate);


app.get('/' ,(req,res)=>{
    res.render('home')
})

app.get('/view' , async (req,res)=>{
    const stations = await station.find({});
    res.render('viewstations',{stations})
})

app.get('/add',(req,res)=>{
  res.render('add')
})

app.post('/station',async (req,res)=>{
  const sta = new station(req.body);
  await sta.save();
  res.redirect('/view');
})

app.get('/station/:id',async (req,res,next)=>{
  try{
    const sta = await station.findById(req.params.id)
    if(!sta)
      throw new AppError(404,'Product not found');
    res.render('details',{sta});
  }catch(e){
      next(e);
  }
    
  
})
app.get('/:id/edit' ,async (req,res)=>{
  const sta = await station.findById(req.params.id)
  res.render('edit',{sta})
})
app.delete('/:id/delete',async (req,res)=>{
    await station.findByIdAndDelete(req.params.id);
    res.redirect('/view');
})

app.put('/station/:id' ,async (req,res)=>{
  await station.findByIdAndUpdate(req.params.id , {...req.body})
  res.redirect('/view');
})

app.use((err,req,res,next)=>{
  const {status = 404,message='Error'}  = err;
  res.status(status).send(message);
})
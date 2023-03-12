const express = require('express');
const router = express.Router();
const station = require('../models/station');
const review = require('../models/reviews');
const {isLoggedIn} = require('../middleware')


router.get('/view' , async (req,res)=>{
    const stations = await station.find({});
    res.render('viewstations',{stations})
})

router.get('/add', isLoggedIn ,(req,res)=>{
  res.render('add')
})

router.post('/addnew',isLoggedIn,async (req,res)=>{
  const sta = new station(req.body);
  sta.author = req.user._id
  await sta.save();
  req.flash('success' , 'added a station')
  res.redirect('/stations/view');
})

router.get('/:id', isLoggedIn ,async (req,res,next)=>{
  try{
    const sta = await station.findById(req.params.id).populate('review').populate('author')
    console.log(sta)
    if(!sta)
      throw new AppError(404,'Product not found');
    res.render('details',{sta});
  }catch(e){ 
      next(e);
  }
    
  
})
router.get('/:id/edit' ,async (req,res)=>{
  const sta = await station.findById(req.params.id)
  res.render('edit',{sta})
})
router.delete('/:id/delete',async (req,res)=>{
    await station.findByIdAndDelete(req.params.id);
    req.flash('success' , 'deleted a station')
    res.redirect('/stations/view');
})

router.put('/:id' ,async (req,res)=>{
  await station.findByIdAndUpdate(req.params.id , {...req.body})
  req.flash('success' , 'updated a station')

  res.redirect('/stations/view');
})



router.use((err,req,res,next)=>{
  const {status = 404,message='Error'}  = err;
  res.status(status).render('errordis',{err});
})


module.exports = router;
const express = require('express');
const router = express.Router();
const station = require('../models/station');
const review = require('../models/reviews');

router.post('/stations/:id' , async (req,res)=>{
    const sta = await station.findById(req.params.id)
    const rev = new review(req.body.review);
    sta.review.push(rev);
    await sta.save();
    await rev.save();
    res.redirect(`/stations/${sta.id}`)
})

router.delete('/stations/:staid/:revid', async (req,res)=>{
  const {staid,revid} = req.params;
  await review.findByIdAndDelete(revid);
  await station.findByIdAndUpdate(staid,{$pull:{review:revid}})
  req.flash('success' , 'deleted a review')

  res.redirect(`/stations/${staid}`);
})

module.exports = router;
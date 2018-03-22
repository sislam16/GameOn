var express = require('express');
var router = express.Router();
var dbAPI = require('../db/dbAPI')

router.get('/all', function(req, res, next) {
  dbAPI.getAllSports((err, sports) => {
    if(err) {
     return next(err)
    }
    res.status(200)
    res.json({
      sports: sports,
      msg: 'Retrieved all sports'
    })
  })
});

router.delete('/delete', loginRequired, (req, res, next) => {
  let sport = req.body
  console.log(sport)
  dbAPI.deleteSport(sport, (err) => {
    if(err){return err}
    res.status(200)
    res.json({
      msg: 'Sport deleted'
    })
  })
})

router.post('/add', loginRequired, (req, res, next) => {
  let sport = req.body
  console.log(sport)
  dbAPI.addSport(sport, (err) => {
    if(err){return err}
    res.status(200)
    res.json({
      msg: 'Sport added'
    })
  })
})

module.exports = router;

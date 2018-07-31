const express = require('express');
const router = express.Router();
const User = require('../server/model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EyeCatcher' });
});

router.post('/subscribe', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    city: req.body.city
  })
  user.save((err, result) => {
    console.log(err, result);
  });
})

router.get('/users', (req, res, next) => {
  User.find({}, (err, result) => {
    res.json(result)
  })
})

module.exports = router;

const {Router} = require('express')
const User = require('../models/User')
const router = Router()

router.get('/read', function (req, res) {
  User.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.setHeader('Read', 'users')
      res.send(data);
    }
  });
});

router.post('/create', async (req, res) => {
  try {
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_number: req.body.phone_number
    })
    let saveUser = await user.save();
    User.upd
    res.status(201).send(saveUser);
  } catch (err) {
    console.log('err' + err);
    res.status(500).send(err);
  }
})

router.delete('/delete', function (req, res) {
  User.findByIdAndDelete((req.body.id),
      function (err, data) {
        try {
          res.setHeader('Read', 'users')
          res.send(data);
          res.send("Data deleted!");
        } catch (err) {
          console.log(err);
        }
      });
});

router.post('/update', function (req, res) {
  User.findByIdAndUpdate(req.body.id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number
      }, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
          console.log("Data updated!");
        }
      });
});

module.exports = router

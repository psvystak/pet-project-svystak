const {Router} = require('express')
const User = require('../models/User')
const router = Router()


router.get('/read', function (req, res) {
  User.find(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(data);
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
    res.status(201).send(saveUser);
  } catch (err) {
    console.log('err' + err);
    res.status(500).send(err);
  }
})

router.delete('/delete', function (req, res) {
  try {
    User.findByIdAndDelete(req.body.id, function (err) {
      res.status(200).send({id: req.body.id});
      if (err) console.log(err);
      console.log("Successful deletion");
    });
  } catch (err) {
    console.log('err ' + err);
    res.status(500).send({error: err});
  }
});

router.post('/update', function (req, res) {
  try {
    User.findByIdAndUpdate(req.body.id,
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          phone_number: req.body.phone_number
        }, function (err, data) {
          res.status(201).send({updatedUser: req.body});
          if (err) console.log(err);
          console.log("Data updated!");
        });
  } catch (err) {
    console.log('err ' + err);
    res.status(500).send({error: err});
  }
});

module.exports = router

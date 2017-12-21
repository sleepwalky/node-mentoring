const express = require('express');
const City = require('../mongoModels/city');
const router = express.Router();

router.use(express.json());

router.get('/', function (req, res) {
  City.count().exec(function (err, count) {
    const random = Math.floor(Math.random() * count)
    City.findOne().skip(random).exec(
      function (err, result) {
        if (err) {
          console.log('error ' + err);
          res.status(500).send(err);
        } else {
          res.json(result);
        }
      })
    })
});

router.post('/', function (req, res) {
  const city = new City(req.body);
  city.save();
  res.status(201).send(city);
})

router.use('/:cityId', function(req, res, next) {
  City.findById(req.params.cityId, function (err, city) {
    if (err) {
      res.status(500).send(err);
    } else if (city) {
      req.city = city;
      next();
    } else {
      res.status(404).send('City not found');
    }
  })
});

router.route('/:cityId')
  .get(function (req, res) {
    res.json(req.city);
  })
  .put(function (req, res) {
    req.city.name = req.body.name;
    req.city.descr = req.body.descr;
    req.city.hours = req.body.hours;
    req.city.type = req.body.type;
    req.city.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.city);
      }
    });
  })
  .patch(function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }

    for (let p in req.body) {
      req.city[p] = req.body[p];
    }

    req.city.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.city);
      }
    });
  })
  .delete(function (req, res) {
    req.city.remove(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.status(204).send('Removed');
      }
    });
  });

module.exports = router;

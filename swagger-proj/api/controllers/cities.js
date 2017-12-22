'use strict';
const City = require('../models/city');

module.exports = {
  getCity,
  addCity,
  getCityById,
  updateCity,
  deleteCity,
};

function getCity(req, res) {
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
}

function addCity(req, res) {
  const city = new City(req.body);
  city.save();
  res.json(city);
}

function getCityById(req, res) {
  City.findById(req.swagger.params.cityId.value, function (err, city) {
    if (err) {
      res.status(500).send(err);
    } else if (city) {
      res.json(city);
    } else {
      res.status(404).send('City not found');
    }
  })
}

function updateCity(req, res) {
  City.findById(req.swagger.params.cityId.value, function (err, city) {
    if (err) {
      res.status(500).send(err);
    } else if (city) {
      city.name = req.body.name;
      city.country = req.body.country;
      city.capital = req.body.capital;
      city.location = req.body.location;
      city.save(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.json(city);
        }
      });
    } else {
      res.status(404).send('City not found');
    }
  })
}

function deleteCity(req, res) {
  City.findById(req.swagger.params.cityId.value, function (err, city) {
    if (err) {
      res.status(500).send(err);
    } else if (city) {
      city.remove(function (err) {
        if (err)
          res.status(500).send(err);
        else {
          res.status(204).send('Removed');
        }
      });
    } else {
      res.status(404).send('City not found');
    }
  })
}

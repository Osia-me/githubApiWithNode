const express   = require('express');
const router    = express.Router({mergeParams: true});
const axios     = require('axios');
const config    = require('../config');
let repoId      = '';
let selected    = [];


router.post('/', (req, res) => {
  repoId = req.body.repo;
  res.redirect('/selected');
});

router.get('/', (req, res) => {
  getItemById(repoId);
  res.redirect('/repos');
});

const getItemById = (id) => {
  axios.get(`https://api.github.com/repositories/${id}?client_id=${config.client_id}&client_secret=${config.client_secret}`)
    .then((data) => {
      selected.push(data.data);
      console.log(selected);
    })
    .catch((error) => {
      console.log(error);
    });
}

//Code

module.exports = router;

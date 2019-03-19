const express   = require('express');
const router    = express.Router({mergeParams: true});
const axios     = require('axios');
const config    = require('../config');
let repoId      = '';
let selected    = [];

//Get the id of selected repository
router.post('/', (req, res) => {
  repoId = req.body.repo;
  getItemById(repoId);
  res.redirect('/repos');
});

//Show the information about selected repositories
router.get('/', (req, res) => {
  res.render('selected', {selected: selected});
  console.log(selected);
});

//logic for fetching data from github api
const getItemById = (id) => {
  axios.get(`https://api.github.com/repositories/${id}?client_id=${config.client_id}&client_secret=${config.client_secret}`)
    .then((data) => {
      selected.push(data.data)
    })
    .then(console.log(selected))
    .catch((error) => {
      console.log(error);
    });
}

//Code

module.exports = router;

const express = require('express');
const router  = express.Router({mergeParams: true});
const axios   = require('axios');
const config  = require('../config');
let   query   = '';
let   user    = [];
let   repos   = {};

//routes
router.post('/', (req, res) => {
  if(query === null){
    res.redirect('back');
  } else {
    query = req.body.userName;
    res.redirect('/repos');

  }
});

router.get('/', (req, res) => {
  getUser(query);
  res.render('repos', {repos: repos})
});

//logic
const getUser = (userName) => {
  axios.get(`https://api.github.com/users/${userName}?client_id=${config.client_id}&client_secret=${config.client_secret}`)
    .then((data) => {
      user = data.data;
      getRepos(user.repos_url);
    })
    .catch((error) => {
      console.log(error);
    });
  }

const getRepos = (url) => {
  axios.get(url)
  .then(data => {
    repos = data.data;
  })
  .catch(err => console.log(err))
}

module.exports = router;

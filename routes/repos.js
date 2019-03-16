const express = require('express');
const router  = express.Router({mergeParams: true});
const axios   = require('axios');
const config  = require('../config');
let   query   = '';
let   user    = [];
let   repos   = {};

//routes
router.post('/', (req, res) => {
  query = req.body.userName;
  if(query === null){
    res.redirect('back');
  } else {
    res.redirect('/repos');
    getUser(query);
  }
});

router.get('/', (req, res) => {
  res.render('repos', {repos: repos})
});

//logic
const getUser = (userName) => {
  axios.get(`https://api.github.com/users/${userName}?client_id=${config.client_id}&client_secret=${config.client_secret}`)
    .then((data) => {
      user = data.data;
      console.log(user.repos_url);
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
    console.log(data.data)
  })
  .catch(err => console.log(err))
}

module.exports = router;

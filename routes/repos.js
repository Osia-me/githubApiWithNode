const express = require('express');
const router  = express.Router({mergeParams: true});
const axios   = require('axios');
const config  = require('../config');
let   query   = '';
let   user    = [];
let   repos   = null;

//Getting query from input
router.post('/', (req, res) => {
  if(query === null){
    res.redirect('back');
  } else {
    query = req.body.userName;
    res.redirect('/repos');

  }
});

//Rendering the page with repositories of the query user
router.get('/', (req, res) => {
    getUser(query);
    setTimeout(function() {
    res.render('repos', {repos: repos})
  }, 2000);
});

//Logic for fetching user with query name
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


//Logic for fetching repositories for query user
const getRepos = (url) => {
  axios.get(url)
  .then(data => {
    repos = data.data;
  })
  .then(console.log(repos))
  .catch(err => console.log(err))
}

module.exports = router;

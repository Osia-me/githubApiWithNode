const express = require('express');
var router  = express.Router({mergeParams: true});

router.get('/', (req, res) => res.render('landing'));



module.exports = router;

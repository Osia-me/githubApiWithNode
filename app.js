const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      index         = require('./routes/index'),
      repos         = require('./routes/repos'),
      selected      = require('./routes/selected');


// parse application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set ejs
app.set('view engine', 'ejs');
//set public directory for other depended files
app.use(express.static(__dirname + '/public'));
//use routes
app.use('/', index);
app.use('/repos', repos);
app.use('/selected', selected);

// SERVERHOST
app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log('Api has Started!');
});

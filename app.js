// be able to use .env file
require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var passport = require('passport');
var expressValidator = require('express-validator');
var session = require('express-session');
var fs = require('fs');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');
var https = require('https');
var http = require('http');

// Init app
var app = express();

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.use(cors({

}));

// Express Session
app.use(session({
	secret: 'secret',
	resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
})); 

// // Set static  folder for route
 require('./routes/items.route')(app);
 require('./routes/buyItems.route')(app);
// require('./routes/answer_history.route')(app);
// require('./routes/classes.route')(app);
// require('./routes/course.route')(app);
// require('./routes/course_format.route')(app);
// require('./routes/project.route')(app);
// require('./routes/question.route')(app);
// require('./routes/role.route')(app);
// require('./routes/student.route')(app);
// require('./routes/draft_answer.route')(app);
// require('./routes/user.route')(app);
// require('./routes/course_setting.route')(app);
// require('./routes/course_delivery.route')(app);
// require('./routes/dashboard.route')(app);
// require('./routes/class_student.route')(app);
// require('./routes/course_format_delivery.route')(app);
// require('./routes/cronjob.route')(app);


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'))
});

app.on("error", function(err) {
  console.log(err);
})

// Set port
app.set('port', (process.env.PORT || 3000));

// Check if it is connected
app.listen(app.get('port'), function() {
	console.log('Server started at port: '+ app.get('port'));
}).on('error', (err) => {
  console.log('On error handler');
  console.log(err);
});

process.on('uncaughtException', (err) => {
  console.log('Process.on handler');
  console.log(err);
})

// require('./cronjob/main');
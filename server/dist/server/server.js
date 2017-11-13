'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

/* var config = require('./config.json');*/

/* app.set('view engine', 'ejs')*/

/* Serve static files */
/* app.use('/static', express.static(path.resolve(__dirname, './static')))*/

// Routes
app.get('/', function (req, res) {
    /* res.render('index', {html: 'Hello'})*/
    console.log(req);
    res.send('Hi there!');
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Running on port ' + port + '!');
});
var express = require('express');

var app = express();
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.render('index');
});
app.listen(3000);
console.log('server listening to port 3000');
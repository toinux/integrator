var express = require('express');
var app = express();
var urlRedirection = process.argv.length > 2 ? process.argv[2] : false;
app.get('/', function (req, res) {
  res.send('tout est dans /css et /sass');
});

app.use('/css', express.static(__dirname + '/css'));
app.use('/sass', express.static(__dirname + '/sass'));

app.get('*', function (req, res) {
	if (urlRedirection) {
		console.log("redirect sur "+ 'http://www.pointp.fr' + req.originalUrl);
 		res.redirect(urlRedirection + req.originalUrl);
	} else {
		res.status(404).send('Not found');
	}
});

var server = app.listen(process.env.PORT, function () {
  var host = server.address().address;
  var port = server.address().port;


  
  console.log('Serveur web des fichiers css et sass démarré : http://%s:%s', host, port);

  if (urlRedirection) {
  	console.log("Url de redirecton par défaut : %s", urlRedirection);	
  } else {
  	console.log("Attention, aucune url de redirecton par défaut n'a été définie !");	
  }
});

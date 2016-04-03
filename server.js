var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('golferlist', ['golferlist']);
var dbe = mongojs('entrylist', ['entrylist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/golferlist', function (req, res){
	console.log("I received a GET request")

	db.golferlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/golferlist', function (req, res) {
	console.log(req.body);
	db.golferlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/golferlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.golferlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/golferlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.golferlist.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	});
});

app.put('/golferlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body);
	db.golferlist.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set: {
			firstName: req.body.firstName, 
			lastName: req.body.lastName,
			tier: req.body.tier,
			dayOneScore: req.body.dayOneScore,
			dayTwoScore: req.body.dayTwoScore,
			dayThreeScore: req.body.dayThreeScore,
			dayFourScore: req.body.dayFourScore,
			madeCut: req.body.madeCut
			 }},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});









app.get('/entrylist', function (req, res){
	console.log("I received a GET request from entry")

	dbe.entrylist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/entrylist', function (req, res) {
	console.log(req.body);
	dbe.entrylist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/entrylist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	dbe.entrylist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/entrylist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	dbe.entrylist.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	});
});

app.put('/entrylist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body);
	dbe.entrylist.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update: {$set: {
			firstName: req.body.firstName, 
			lastName: req.body.lastName,
			entryName: req.body.entryName,
			tierOneGolfer: req.body.tierOneGolfer,
			tierTwoGolfer: req.body.tierTwoGolfer,
			tierThreeGolfer: req.body.tierThreeGolfer,
			tierFourGolfer: req.body.tierFourGolfer,
			tierFiveGolfer: req.body.tierFiveGolfer,
			tierSixGolfer: req.body.tierSixGolfer,
			isPaid: req.body.isPaid
			 }},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});


app.listen(3000);
console.log("Server running on port 3000");
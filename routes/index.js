var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async')
var users = []


router.get('/', function(req, res, next) {
	res.render('index', { message: null });
});

router.get('/login', function(req, res, next) {
	res.render('login', {});
});

router.get('/register', function(req, res, next) {
	res.render('register', {});
});

router.post('/register', function(req, res, next) {
	let found = false
	for(let i = 0; i < users.length; i++) {
		if(users[i].login == req.body.login) {
			found = true
			res.render('index', {message: 'This user exist'})
		}
	}
	if(!found) { //found == false
		users.push({
			login: req.body.login,
			pass: req.body.pass
		})
		res.render('index', {message: 'You are registered'})
	}
});

router.post('/login', function(req, res, next) {
	let found = false
	for(let i = 0; i < users.length; i++) {
		if(users[i].login == req.body.login && users[i].pass == req.body.pass) {
			found = true
			res.render('index', {message: 'You are logged in!'})
		}
	}
	if(!found) { //found == false
		res.render('index', {message: 'This user is not exists'})
	}
});

router.get('/get/data', function(req, res, next) {
	var query = 'http://catalog.api.2gis.ru/2.0/catalog/branch/search?locale=ru_KG&region_id=112&q=%D1%82%D0%B5%D0%B0%D1%82%D1%80&region_id=1&page=*page*&page_size=1&fields=items.reviews&format=json&key=ruoedw9225';
	//page=*page*
	var names = []
	var ids = []
	
	for(let i = 1;i <= 12; i++) {
		ids.push(i)
	}

	async.eachSeries(ids, function iterator(id, callback) {
		var axilary = query.replace('*page*', id)
		request(axilary, function (error, response, body) { 
			var obj = JSON.parse(body)
			var name = obj.result.items[0].name
			names.push(name)
			callback()
		});
	}, function done() {
		res.send(names)
	});
});

router.get('/form', function(req, res, next) {
	res.render('form', {});
});

router.post('/form', function(req, res, next) {
	var query = 'http://catalog.api.2gis.ru/2.0/catalog/branch/search?locale=ru_KG&region_id=112&q=*some_place*&region_id=1&page=*page*&page_size=1&fields=items.reviews&format=json&key=ruoedw9225';
	var names = []
	var ids = []
	var place = []
	

	for(let i = 1;i <= 10; i++) {
		ids.push(i)
	}
	place.push(req.body.place)
	async.eachSeries(ids, function iterator(id, callback) {
		var axilary = query.replace('*some_place*', place[0])
		axilary = query.replace('*page*', id)
			console.log(place[0])
			console.log(id)
			console.log(axilary)
		request(axilary, function (error, response, body) { 
			var obj = JSON.parse(body)
			var name = obj.result.items[0].name
			names.push(name)
			callback()
		});
	}, function done() {
		res.send(names)
	});
});

module.exports = router;



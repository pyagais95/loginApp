var express = require('express');
var router = express.Router();
var users = []

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {

  res.render('login', {});
});


router.post('/login', function(req, res, next) {
	var message = 'succes'
	let check = false
	for(let i = 0; i < users.length; i++){
		if (req.body.login == users[i].name && req.body.pass == users[i].password) {
			check = true
			break
			res.send('this user already exist')
		}
	}
	res.send('you are logged in')
  res.render('login', {});
});

router.get('/register', function(req, res, next) {
  res.render('register', {});
});


router.post('/register', function(req, res, next) {
	let check = false
	for(let i = 0; i < users.length; i++){
		if (req.body.login == users[i].name) {
			check = true
		}
	}

	if (check == false) {
	users.push({
		name:req.body.login,
		password:req.body.pass
	})
	}else if (check == true) {
		res.send('Nickname already in use, try a different one')
	}
	console.log(users)
  res.render('register', {});
});

router.get('/main', function(req, res, next) {
  res.render('main', {});
});

module.exports = router;

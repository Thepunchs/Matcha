function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function makefirstname() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";
  var possible1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 5; i++)
  {
  	if (i == 0)
    	text += possible1.charAt(Math.floor(Math.random() * possible.length));
    else
    	text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function makelastname() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function maketag() {
  var text = "";
  var possible = "abcdef";

  for (var i = 0; i < 3; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

con.query('SELECT login FROM users where login = ?', ['FakeUser42'], function (err, result) { if (err) throw err;
	if (result.length == 0) {

var i = 0
	pass = '$2a$10$fXJ03NwABaEi4HLQhWiGpOhdbpcTEo93DvY0UBAJlbyhpdvPkXnzu' // Fakeuser42
	confirm = 1
	
while (i < 600) {
	var login = 'FakeUser' + i
		email = 'fakeuser' + i + '@gmail.com'
		bio = 'La belle bio du FakeUser' + i
		score = 5 * getRandomInt(200)
		fakelocation = 'La fakelocation du FakeUser' + i
		key = 'Key'+ i
		age = getRandomInt(60) + 18;
		longitude = i % 90
		latitude = i % 90
		quelgenre = getRandomInt(2)
		quelorientation = getRandomInt(3)
		firstname = makefirstname();
		lastname = makelastname();
		showlocation = 0;

		
	if (quelgenre == 0)
		gender = 'Male'
	else
		gender = 'Female'
	
	if (quelorientation == 0) {
			orientation = 'Heterosexual'
	}
	else if (quelorientation == 1) {
			orientation = 'Bisexual'
	}
	else {
			orientation = 'Homosexual'
	}

	if (i % 4 == 0) {
		var img1 = '/seed/1.jpg'
			img2 = '/seed/2.jpg'
			img3 = '/seed/3.jpg'
			img4 = '/seed/4.jpg'
			img5 = '/seed/5.jpg'
	}
	else if (i % 4 == 1) {
		var img1 = '/seed/6.jpg'
			img2 = '/seed/7.jpg'
			img3 = '/seed/8.png'
			img4 = '/seed/9.jpg'
			img5 = '/seed/10.jpg'
	}
	else if (i % 4 == 2) {
		var img1 = '/seed/11.jpg'
			img2 = '/seed/12.png'
			img3 = '/seed/13.jpg'
			img4 = '/seed/14.jpg'
			img5 = '/seed/15.png'
	}
	else {
		var img1 = '/seed/16.jpg'
			img2 = '/seed/17.jpg'
			img3 = '/seed/18.jpg'
			img4 = '/seed/19.jpg'
			img5 = '/seed/20.jpg'
	}
	sql = 'INSERT INTO `users` (`login`, `firstname`, `lastname`, `pass`, `email`, `confirmkey`, `confirm`, `gender`,\
	 `orientation`, `bio`, `age`, `score`, `fakelocation`, `showlocation`, `img1`, `img2`, `img3`, `img4`, `img5`, `longitude`, `latitude`)\
	  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
	con.query(sql, [login, firstname, lastname, pass, email, key, confirm, gender, orientation, bio, age,
	 score, fakelocation, showlocation, img1, img2, img3, img4, img5, longitude, latitude], function (err, result) { if (err) throw err })

	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })
	sql = 'INSERT INTO `tags` (tag, user_id) VALUES (?,?)'
	con.query(sql, [maketag(), i], function (err, result) { if (err) throw err })

	sql = 'INSERT INTO `visits` (user_id, his_id) VALUES (?,?)'
	con.query(sql, [getRandomInt(600), getRandomInt(600)], function (err, result) { if (err) throw err })

	sql = 'INSERT INTO `likes` (user_id, his_id) VALUES (?,?)'
	con.query(sql, [getRandomInt(600), getRandomInt(600)], function (err, result) { if (err) throw err })
	i++
} } });
res.render('index.ejs', {req: req, css: css})
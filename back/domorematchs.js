function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var i = 0
while (i < 5000) {
	var a = getRandomInt(600);
	var b = getRandomInt(600);
	if (a != b)
	{
		sql = 'INSERT INTO `likes` (user_id, his_id) VALUES (?,?)'
		con.query(sql, [a, b], function (err, result) { if (err) throw err })
	}
	i++
}
res.redirect('/')
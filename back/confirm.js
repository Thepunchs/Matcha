if (req.query.login && req.query.key)
{
  	sql = 'SELECT * FROM users WHERE login = ? AND confirmkey = ' + req.query.key
	con.query(sql, [req.query.login, req.query.key],
    function (error, result)
    { if (error) throw error
    	if (result.length !== 0)
    	{
    		sql = 'UPDATE users SET confirm = 1 WHERE login = ?'
			con.query(sql, [req.query.login], function (err) { if (err) throw err })
             req.session = req.session
             req.session.login = req.body.login
    		res.render('login.ejs', {req: req, css: css, success: 'Votre compte est activé ! Connectez-vous !'})
 		}
		else
    		res.render('register.ejs', {css: css, error: 'Something went wrong, your account was not confirmed'})
    })
}
else
    res.render('register.ejs', {css: css, error: 'Stop trying to get to places you dont belong!'})
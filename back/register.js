if (req.body.login && req.body.firstname && req.body.lastname && req.body.pass && req.body.confirmpass && req.body.mail)
    {
        if (req.body.pass === req.body.confirmpass)
        {
        var login = eschtml(req.body.login)
            firstname = eschtml(req.body.firstname)
            lastname = eschtml(req.body.lastname)
            pass = eschtml(req.body.pass)
            email = eschtml(req.body.mail)
            regLow = /[a-z]/ 
            regUp = /[A-Z]/
            if (pass.length > 5)
            {
                if (pass.search(regLow) !== -1) 
                {
                    if (pass.search(regUp) !== -1) 
                    {
                        if (validator.isEmail(email))
                        {
                            sql = 'SELECT login FROM users WHERE login = ? OR email = ?'
                            con.query(sql, [login, email],
                            function (error, result) 
                            { if (error) throw error
                                if (result.length == 0)
                                {
                                var smtpTransport = mailer.createTransport("SMTP", 
                                    {
                                        service: "Gmail", auth: { user: "find.your.peer.42@gmail.com", pass: "Qwerty1234zxcv" } 
                                    })           
                                    key = rand.generateDigits(9)
                                    mail =
                                        {
                                            from: "find.your.peer.42@gmail.com", to: email, subject: "Confirmation de votre compte",
                                            html: '<html><body><div align=center> \
                                            CLICK ON THE FOLLOWING LINK TO VALIDATE YOUR ACCOUNT: <BR />\
                                            <a href=http://localhost:8080/confirm?login='+login +'&key='+key +'>Confirm your Account</a> \
                                            </div></body></html>'
                                        }
                                        smtpTransport.sendMail(mail, function(error, response){
                                        if (error) {
                                            res.render('register.ejs', {css: css, error: 'Error whilst sending e-mail : ' + error}) 
                                        }
                                        else {
                                            res.render('register.ejs', {css: css, success: "Un mail de confirmation vient d'être envoyer !"})
                                        }
                                    smtpTransport.close() })
                                        bcrypt.hash(pass, 10, function(err, hash) { if (err) throw err
                                        sql = 'INSERT INTO `users` (`login`, `firstname`, `lastname`, `pass`, `email`, `confirmkey`) VALUES (?, ?, ?, ?, ?, ?)'
                                        variables = [login, firstname, lastname, hash, email, key]
                                        var promise1 = new Promise(function(resolve, reject) { con.query(sql, variables, function (err, res) { if (err) throw err }) }) 
                                        
                                        promise1.then(con.query('SELECT * FROM users WHERE login = ?', [login], function (err, res) { if (err) throw err
                                            fs.mkdir(__dirname + '/img/users/' + res[0].id, function(err) {
                                            if (err) { if (err.code == 'EEXIST') { return ; } else { throw err; } }})})) });
                                }
                                else
                                    res.render('register.ejs', {css: css, error: 'login or email already exists'}) 
                            })
                        }
                        else
                            res.render('register.ejs', {css: css, error: 'Please use a Valid E-mail !'})
                    }
                    else
                        res.render('register.ejs', {css: css, error: 'Password must contain an uppercase !'})
                }
                else
                    res.render('register.ejs', {css: css, error: 'Password must contain a lowercase !'})
            }
            else
                res.render('register.ejs', {css: css, error: 'Password must be at least 6 characters long'})
        }
        else
            res.render('register.ejs', {css: css, error: 'Password and Confirm Password must be the same!'})
    }
    else
        res.render('register.ejs', {css: css, error: 'Filling in Every field is required'})
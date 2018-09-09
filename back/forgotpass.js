
email = eschtml(req.body.email)
sql = 'SELECT * FROM users WHERE email = ?'
    con.query(sql, [email],
    function (error, result) 
    { 
    if (error) throw error
    if (result.length > 0)
    {

var smtpTransport = mailer.createTransport("SMTP", 
    {
        service: "Gmail", auth: { user: "find.your.peer.42@gmail.com", pass: "Qwerty1234zxcv" } 
    })
    
    newpass = rand.generate(10)
    mail = 
        {
            from: "find.your.peer.42@gmail.com", to: email, subject: "Reinitialisation de votre mot de passe",
            html: '<html><body><div align=center> \
            YOUR LOGIN : <BR />\
            '+result[0].login+'<BR /><BR />\
            YOUR NEW PASSWORD : <BR />\
            '+newpass+'<BR />\
            </div></body></html>'
        }
        
    smtpTransport.sendMail(mail, function(error, response){
    if (error) { 
          res.render('login.ejs', {req: req, css: css, error: 'Error whilst sending e-mail : ' + error}) 
      }
    else {
        bcrypt.hash(newpass, 10, function(err, hash) { 
            if (err) throw err
            sql = 'UPDATE users SET pass = ? WHERE email = ?'
            con.query(sql, [hash, email],
            function (error, result) 
            { 
            if (error) throw error }) })
        res.render('login.ejs', {req: req, css: css, success2: "Un mail de reinitialisation du mot de passe vient d'être envoyé !"})
     }
     smtpTransport.close() })
    }
    else
        res.render('login.ejs', {req: req, css: css, error2: "Email inexistant !"})
})
// requires
var express = require('express')
    mysql = require('mysql')
    compression = require('compression')
    cookie = require('cookie-session')
    bodyParser = require('body-parser')
    fs = require('fs')
    html = require('html')
    bcrypt = require('bcrypt')
    validator = require('validator')
    mailer = require("nodemailer")    
    rand = require("random-key")
    eschtml = require('htmlspecialchars')
    vm = require('vm')
    ssn = require('express-session')
    formidable = require('formidable')
    geopoint = require('geopoint')
    http = require("http")
    ent = require("ent")

// others
var app = express()
    server = http.createServer(app);
    io = require("socket.io").listen(server);
    urlencodedParser = bodyParser.urlencoded({ extended: false })
    css = { style : fs.readFileSync('./style.css','utf8') }
    MemoryStore = require('session-memory-store')(ssn);
    
    sessionMiddleware = ssn({
        secret: "Eloi has a beautiful secret",
        store: new MemoryStore(),
        key: 'sid',
        resave: true, 
        saveUninitialized: true
    });

app.use(sessionMiddleware);

app.use(express.static(__dirname + '/img'))
app.use(bodyParser.urlencoded({ extended: true }))

var user = new Array;
io.sockets.on('connection', function (socket) {
    eval(fs.readFileSync(__dirname + "/back/socket.js")+'')
});


server.listen(8080)

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root42"
})

con.connect(function(err) { if (err) throw err
    eval(fs.readFileSync(__dirname + "/back/database.js")+'')
})

function    getnotifs(id, callback) {
    con.query('SELECT * FROM notifs WHERE user_id = ? ORDER BY date DESC LIMIT 20', [id], function(err, notifs){ if (err) throw err
    if (notifs.length == 0)
        return callback(id);
    else
        return callback(notifs);
}) }
function    checkmatch(user_id, his_id, callback)
{
    var a = 0
    var b = 0
     con.query('SELECT * FROM likes WHERE user_id = ? AND his_id = ?', [user_id, his_id], function (err, rows) { if (err) throw err 
        if (rows.length == 1)
            a = 1;       
        con.query('SELECT * FROM likes WHERE user_id = ? AND his_id = ?', [his_id, user_id], function (err, rows) { if (err) throw err 
        if (rows.length == 1)
            b = 1;
        if (a == 1 && b == 1)
            return callback(1);
        else
            return callback(0);
     }) })
}
    app.get('/', function(req,res){
        if (req.session.profile == undefined)
            res.redirect('/index')
        else
            res.redirect('/profile')
    })
    .get('/index', function(req, res) {
        res.render('index.ejs')
    })
    .get('/register', function(req,res){
        res.render('register.ejs', {css: css, error: 'none'})
    })
    .post('/register', urlencodedParser, function(req,res){
        eval(fs.readFileSync(__dirname + "/back/register.js")+'')
    })
    .get('/confirm', urlencodedParser, function(req,res){
        eval(fs.readFileSync(__dirname + "/back/confirm.js")+'')
     })
    .all('/login', urlencodedParser, function(req,res){
        eval(fs.readFileSync(__dirname + "/back/login.js")+'')
    })
    .post('/forgot', urlencodedParser, function(req,res){
        eval(fs.readFileSync(__dirname + "/back/forgotpass.js")+'')
    })
    .get('/logout', function(req,res){
        req.session.destroy()
        req.session = 0;
        res.redirect('/')
    })
    .get('/seed', urlencodedParser, function(req,res){
        eval(fs.readFileSync(__dirname + "/back/createaccounts.js")+'')
     })
    .get('/domatch', urlencodedParser, function(req,res){
       eval(fs.readFileSync(__dirname + "/back/domorematchs.js")+'')
    })
    app.use(function(req, res, next) {
        if (req.session.profile == undefined)
            res.redirect('/');
        else
            next();
    });
    app.get('/peers', function(req, res) {
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/peers.js")+'') })
    })
    .get('/user_profile/:id', function(req,res){
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/public_profile.js")+'') })
    })
    .post('/public_profile/:id', function(req, res) {
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/public_profile.js")+'') })
    })
    .get('/user_chat/:id', function(req,res){
        con.query("SELECT * from `users` where id = ?", [req.params.id], function( err, user2 ) { if (err) throw err
        con.query('SELECT * FROM `chat` WHERE user_id = ? OR his_id = ?', [req.params.id, req.params.id], function (err, chat) { if (err) throw err 
        checkmatch(req.session.profile.id, req.params.id, function(match){
            if (match == 0)
                res.redirect('/')
            else {
                getnotifs(req.session.profile.id, function(notifs){
                res.render('chat.ejs', {notif: notifs, req: req, css: css, user2: user2[0], chat:chat}) }) } })  }) })
    })
    .get('/matchs', function(req,res){
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/matchs.js")+'') })
    })
    .get('/public_profile', function(req,res){
        getnotifs(req.session.profile.id, function(notifs){
        res.render('public_profile.ejs', {notif: notifs, req: req, like: -1, block: 0, online: 1, report: 0, css: css, profile: req.session.profile, tag: req.session.profile.tag}) })
    })
    .post('/peers', function(req, res) {
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/peers.js")+'') })
    })
    .all('/profile', urlencodedParser, function(req,res){
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/profile.js")+'') })
    })
    .post('/new_img', urlencodedParser, function(req,res){
        getnotifs(req.session.profile.id, function(notifs){
        eval(fs.readFileSync(__dirname + "/back/new_img.js")+'') })
    })
    .all('*', function(req, res) {
      res.redirect('/');
    });
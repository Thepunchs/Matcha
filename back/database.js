    con.query('CREATE DATABASE IF NOT EXISTS `matcha`', function (err) { if (err) throw err })
    con.query('USE `matcha`', function (err) { if (err) throw err })
    con.query('SET NAMES utf8mb4', function (err) { if (err) throw err })
    var users = `CREATE TABLE IF NOT EXISTS users ( \
        id INT AUTO_INCREMENT PRIMARY KEY, \
        login VARCHAR(255), \
        firstname VARCHAR(255), \
        lastname VARCHAR(255), \
        pass VARCHAR(255), \
        email VARCHAR(255), \
        confirmkey VARCHAR(10), \
        confirm INT DEFAULT 0, \
        gender VARCHAR(255), \
        orientation VARCHAR(255), \
        bio TEXT, \
        age INT DEFAULT 0, \
        score INT DEFAULT 0, \
        longitude DOUBLE, \
        latitude DOUBLE, \
        location TEXT, \
        fakelocation TEXT, \
        showlocation INT DEFAULT 1, \
        active DATETIME, \
        img1 VARCHAR(255) DEFAULT 'empty.png', \
        img2 VARCHAR(255) DEFAULT 'empty.png', \
        img3 VARCHAR(255) DEFAULT 'empty.png', \
        img4 VARCHAR(255) DEFAULT 'empty.png', \
        img5 VARCHAR(255) DEFAULT 'empty.png')`
    con.query(users, function (err) { if (err) throw err })

    var tags = `CREATE TABLE IF NOT EXISTS tags ( \
        id INT AUTO_INCREMENT PRIMARY KEY, \
        user_id INT, \
        tag VARCHAR(255))`
    con.query(tags, function (err) { if (err) throw err }) 
    
    var likes = `CREATE TABLE IF NOT EXISTS likes (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        user_id INT NOT NULL, \ 
        his_id INT NOT NULL)`
    con.query(likes, function (err) { if (err) throw err }) 
    
    var block = `CREATE TABLE IF NOT EXISTS block (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        user_id INT NOT NULL, \ 
        his_id INT NOT NULL)`
    con.query(block, function (err) { if (err) throw err }) 
    
    var report = `CREATE TABLE IF NOT EXISTS report (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        user_id INT NOT NULL, \ 
        his_id INT NOT NULL)`
    con.query(report, function (err) { if (err) throw err })

    var visits = `CREATE TABLE IF NOT EXISTS visits (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        user_id INT NOT NULL, \ 
        his_id INT NOT NULL, \
        date DATETIME DEFAULT CURRENT_TIMESTAMP)`
     con.query(visits, function (err) { if (err) throw err })

     var notifs = `CREATE TABLE IF NOT EXISTS notifs (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        user_id INT NOT NULL, \ 
        his_id INT NOT NULL, \
        notif TEXT, \
        seen INT NOT NULL DEFAULT 0, \
        date DATETIME DEFAULT CURRENT_TIMESTAMP)`
     con.query(notifs, function (err) { if (err) throw err })
     
     var chat = `CREATE TABLE IF NOT EXISTS chat (\
        id INT AUTO_INCREMENT PRIMARY KEY, \
        message TEXT, \
        user_id INT NOT NULL, \ 
        his_id INT NOT NULL, \
        date DATETIME DEFAULT CURRENT_TIMESTAMP)`
    con.query(chat, function (err) { if (err) throw err })
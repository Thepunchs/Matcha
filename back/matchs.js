function    checkmatchs(user_id, callback)
{
    con.query('SELECT * FROM likes WHERE user_id = ?', [user_id], function (err, rows1) { if (err) throw err 
    con.query('SELECT * FROM likes WHERE his_id = ?', [user_id], function (err, rows2) { if (err) throw err 
    if (rows1.length == 0 || rows2.length == 0)
        return callback('none');
    var    a = 0; i = 0;
    id = new Array();
    while (rows1[a])
    {
        var b = 0;
        while (rows2[b])
        {
            if (rows1[a].his_id == rows2[b].user_id)
            {
                id[i] = rows1[a].his_id;
                i++;
            }
            b++;
        }
        a++;
    }
    if (!id[0])
        return callback('none');
    var i = 0; id_2 = '(';
    while (id[i]) {
        id_2 += id[i];
        i++;
        if (id[i])
            id_2 += ', ';
    } id_2 += ')'
    return callback(id_2)
    }) })
}

checkmatchs(req.session.profile.id, function(ids) {
    if (ids == 'none')
        res.render('matchs.ejs', {req: req, notif: notifs, css: css, match: 'none'})
    else
    {
        con.query( "SELECT * from `users` where `id` IN "+ ids, function( err, matchs ) { if (err) throw err
        res.render('matchs.ejs', {req: req, notif: notifs, css: css, match: matchs}) }) 
    }
})
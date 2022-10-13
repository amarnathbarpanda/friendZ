//actions for routes: controllers
// module.exports.actionName = function(req, res){}
module.exports.home = function(req, res){
    console.log(req.cookies); //accessing cookies

    res.cookie('user_id', 25);// setting a cookie
    return res.render('home', {
        title: 'Home'
    });
}
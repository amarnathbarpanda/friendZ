//actions for routes: controllers

module.exports.home = function(req, res){
    return res.render('home', {
        title: 'Home'
    });
}
const passport =require('passport')
exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next();
        return;
    }
    res.redirect('/login')
}

exports.loginUser = passport.authenticate('local',{
    failureRedirect:'/login',
    successRedirect:'/addStore'
})
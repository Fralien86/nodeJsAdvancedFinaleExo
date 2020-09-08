const mongoose = require('mongoose')
const User = mongoose.model('user')
exports.registerUser = async(req,res,next)=>{
    const user = await new User({email:req.body.email, name:req.body.name});
    try{
        await User.register(user,req.body.password);
        res.redirect("/")
        next();
    }catch(e){
        console.log(e);
    }
    next();
    console.log(req.body);
}
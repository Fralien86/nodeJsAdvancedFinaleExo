const mongoose = require('mongoose')
const store = mongoose.model('store');

exports.index = async (req,res)=>{
    const stores = await store.find({}).lean();
    res.render('pages/index',{
        hasNav:true,
        title:"HOME PAGE",
        stores,
    })
}

exports.about = (req,res)=>{
    res.render('pages/about',{
        hasNav:true,
        title:"ABOUT",
    })
}

exports.shopDetails = async(req,res)=>{
    const detail = await store.findOne({slug:req.params.slug}).lean()
    console.log(detail);
   try{
        res.render('pages/shopDetails',{
            hasNav:false,
            title:"DETAILS", 
            detail,
        })
   }catch(e){
       console.log(e);
   }
}


exports.addStore = async (req,res) => {
    try{
        res.render('pages/addStore',{
            hasNav:false,
            title:"ADD SHOP", 
        })
   }catch(e){
       console.log(e);
   }
}

exports.register = (req,res)=>{
    res.render('pages/register',{
        hasNav:false,
        title:"REGISTER",
    })
}

exports.login = (req,res)=>{
    res.render('pages/login',{
        hasNav:false,
        title:"LOGIN",
    })
}


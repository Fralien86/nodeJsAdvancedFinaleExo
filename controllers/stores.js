const mongoose = require('mongoose')
const store = mongoose.model('store')

exports.createStore = async (req,res)=>{

    const store1 = await new store(req.body).save()

    // console.log(req.body)
    res.redirect('/')
}
//multer storage
const multer = require('multer')
const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req,file,next){
        const isPhoto = file.mimetype.startsWith('image/')
        if(isPhoto){
            next(null,true)
        } else{
            next({message : 'this filetype is not allowed'})
        }
    }
}

exports.upload = multer(multerOptions).single('photo')

const uuid = require('uuid')
const jimp = require('jimp')

exports.resize = async (req,res,next)=>{
    console.log ('coucou')
    if(!req.file){
        next()
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800,jimp.AUTO);
    await photo.write(`${process.cwd()}/public/img/shop/${req.body.photo}`)
    next();
}
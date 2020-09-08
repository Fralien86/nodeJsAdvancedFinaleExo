const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name : {
        type :String,
        required : 'thanks to introduce a name'
    },
    slug : {
        type :String,
        trim : true
    },
    description : {
        type :String,
    },
    photo : {
        type :String,
    },
    location : {
        type :{
            type : String,
            default:'point'
        },
        coordinates:[
            {
                type:Number
            }
        ],
        address:{
            type:String
        }
    },
});
schema.pre('save',async function(next){
    const slug =require('slugs');
    this.slug = slug(this.name);
    const storesWithSlug = await this.constructor.find({slug:this.slug})
    if(storesWithSlug.length) this.slug = `${this.slug}-${storesWithSlug.length+1}`
    console.log(this.slug);
    next();
})
module.exports = mongoose.model('store', schema)
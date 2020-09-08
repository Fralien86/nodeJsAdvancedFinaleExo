const [major, minor] = process.versions.node.split('.').map(parseFloat);
if(major < 10 || major ===10 && minor <=2){
    console.log('the version node of the server is too low for modern prog')
    throw("the node version of the server is too low")
}

// inititialize en variables
require('dotenv').config({path:'.variables.env'})

const initServer = async () =>{
        //Launch Mongo Connection
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
    try{
        mongoose.connect(process.env.DB_HOST,{useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
            console.log('Mongo is connecter');
        })
    }catch(err){
        if (err) throw err;
    }

    //Load all models from mongoose
    require(`${process.cwd()}/models/store`)
    require(`${process.cwd()}/models/user`)

    //start our app if everything is allright and runnig
    const app = require(`${process.cwd()}/app`)
    app.set('port', process.env.PORT || 8000)
    const server = app.listen(app.get('port'), () => {
        console.log(`express running - PORT ${server.address().port}`)
    })
}
initServer();







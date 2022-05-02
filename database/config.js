const mongoose= require('mongoose')

const dbConection = async()=>{
    try {
        mongoose.connect(process.env.MONDODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            //useCreateIndex:true, 
           // useFindAndModify:false 
        });
        console.log("coneccion con la bd correcta")
    } catch (error) {
        console.log(error)
        throw new Error('error el iniciar la BD')
    }

}

module.exports={
    dbConection
}

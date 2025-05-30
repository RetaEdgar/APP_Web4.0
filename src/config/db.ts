import mongoose from "mongoose";

const connectDBMongo= async ():Promise<void> =>{
    const mongoUri="mongodb://localhost:27017/proyecto";
    //mongodb://<user>:<contraseña>@<servidor>:<puerto>/<db>?authSource=admin" Cuando tenemos uruaio y contraseña
    //mongodb://<servidor>:<puerto>/<db>" Cuando no hay usuario y contraseña
    //mongodb://localhost:27017/proyecto" Cuando no hay usuario y contraseña

    try{
        await mongoose.connect(mongoUri);
        console.log("Conexion a mongo");
    }catch(error){
        console.log("Error conexion a mongo: ", error);

    }
} 

export default connectDBMongo;
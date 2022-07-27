const jwt = require('jsonwebtoken');

const generarJWT = (uid,name) =>{

    return new Promise((resolve,reject)=>{
        const payload = {uid,name};

        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                expiresIn:process.env.DURACION_TOKEN
            },(err,token)=>{
                if(err){
                    console.log(err);
                    reject('no se pude generar el token');
                }
                resolve(token);

            })
    })
}

module.exports={
    generarJWT
}
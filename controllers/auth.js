
const  {response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const {generarJWT}= require('../helpers/jwt');

const crearUsuario = async  (req,res = response) => { /** el  response es para no perder la autoayuda del intelicense*/
    //console.log(req.body);
    //const {name,email,password} = req.body;
    const {email,password} = req.body;

    try{
        
        let usuario = await Usuario.findOne({email:email});

        if(usuario){
            return res.status(400).json({
                ok: false,
                msg:'un usuario existe con ese correo',
            });
        }


        usuario = new Usuario(req.body);
        
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt);

        await usuario.save();

        //generar jwt
        const token = await generarJWT(usuario.id,usuario.name);


        res.status(201).json({
            ok: true,
            uid:usuario.id,
            name:usuario.name, 
            token           
        });

    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'porfavor hable con el admin'
        });
    }
       
}

const loginUsuario = async  (req,res = response) => { /** el  response es para no perder la autoayuda del intelicense*/

    const {name,email,password} = req.body;
    
    try{

        const usuario = await Usuario.findOne({email:email});
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg:'El usuario no existe con ese correo',
            });
        }

        //confirmar los password
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg:'password incorrecta',
            });
        }


        //generar json web token
        const token = await generarJWT(usuario.id,usuario.name);


        res.json({
           ok:true,
           uid:usuario.id,
           name:usuario.name,   
           token,
        });


    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'porfavor hable con el admin'
        }); 
    }
   

}

const RevalidarToken = async (req,res = response) => { /** el  response es para no perder la autoayuda del intelicense*/

    const {uid,name}= req;
    //generar json web token
    const token = await generarJWT(uid,name);


    res.json({
        ok: true,
        uid,
        name,
        token,
        msg:'renew',
    });

}

module.exports = {
    crearUsuario,
    loginUsuario,
    RevalidarToken
}
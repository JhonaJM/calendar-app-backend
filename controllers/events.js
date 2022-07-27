const  {response} = require('express');
const Evento = require('../models/evento');

const getEventos = async (req,res)=>{

//    console.log(req.body);

const eventos = await Evento.find()
                            //.populate('IdUser')//→ con eso me traigo toda la info del user;
                            .populate('IdUser','name');//→ con esto solo pido el name, el id siempre lo trae (se puede remover, pero para que?)

    return res.status(400).json({
        ok: true,
        eventos
    });
}

const crearEventos =async (req,res)=>{
    
    const evento = new Evento(req.body);
    try{

        evento.IdUser = req.uid;
        const eventoGuardado = await evento.save();

        
        return res.status(200).json({
            ok: true,
            evento:eventoGuardado,
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg:'hable con el admin',
        });
    }
    
    //console.log(req.body);    
}

const ActualizarEventos = async (req,res)=>{
    //console.log(req.body);
    const IdEvento = req.params.IdEvento;
    const IdUsuarioActual = req.uid;
    try{
        const evento = await Evento.findById(IdEvento);
    
        if(!evento){
            res.status(404).json({
                ok:false,
                msg:'No se encontro el evento'
            });
        }
       
        if(evento.IdUser.toString() !== IdUsuarioActual){
           return  res.status(401).json({
                ok:false,
                msg:'no puede editar ese evento'
            });
        }

        const nuevoEvento={
            ...req.body,
            IdUser:IdUsuarioActual
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(IdEvento,nuevoEvento,{new:true});

        res.json({
            ok:true,
            evento:eventoActualizado
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg:'hable con el admin',
            error
        });
    }
}

const EliminarEventos =async (req,res)=>{
    
    const IdEvento = req.params.IdEvento;
    const IdUsuarioActual = req.uid;

   try{
        const evento = await Evento.findById(IdEvento);
    
         if(!evento){
             res.status(404).json({
                 ok:false,
                 msg:'No se encontro el evento'
            });
        }
       
        if(evento.IdUser.toString() !== IdUsuarioActual){
           return res.status(401).json({
                ok:false,
                msg:'no puede eliminar ese evento'
         });
        }

       
        await Evento.findOneAndDelete(IdEvento);

        res.json({
            ok:true,       
        });

    }catch(error){
        return res.status(500).json({
            ok: false,
            msg:'hable con el admin',
            error
        });
    }
}
module.exports ={
    getEventos,
    crearEventos,
    ActualizarEventos,
    EliminarEventos
}

const {Schema,model} = require('mongoose');

const EventoSchema = Schema({

    title:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    start:{
        type:Date,  
        required:true
    },
    end:{
        type:Date,  
        required:true
    },

    IdUser :{
        type : Schema.Types.ObjectId,//esto indica que es una referencia
        ref : 'Usuario', //nombre del otro schema
        required:true
    }

});

//cambiar el  id para que no se guarda como _id sino se llame IdEvento
//solo es para visualizacion, en la bd seguira igual
EventoSchema.method('toJSON',function(){
   const {__v,_id,...object}  = this.toObject();

   object.idEvento=_id;

   return object;
})
module.exports= model('Evento',EventoSchema);
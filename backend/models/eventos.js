import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: 5
    },
    fecha:{
        type: Date,
        required: [true, 'La fecha d es obligatoria'],
        
    },
    tipo:{
        type: String,
        required: true,
        enum: ['Taller', 'Conferencia', 'Networking'],    
    },
    cupomaximo:{
        type: Number,
        required: [true, 'cantidad maxima de cupos'],
    },
    asistentes:{
        type: Number,
         default: 0
    }

 
    
    

},
{timestamps:true}
);
export default mongoose.model('Evento', eventoSchema);
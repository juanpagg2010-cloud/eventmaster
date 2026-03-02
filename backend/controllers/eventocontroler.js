    import Evento from '../models/eventos.js';

// Get - Lisatar todos

export const obtenerEventos = async (req, res) => {
    try {
        const eventos = await Evento.find();
        res.status(200).json(eventos);
    }catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los eventos', error: error.message });
    }
};

//post - crear evento

export const crearEvento = async (req, res) => {
    try {
        const nuevoEvento = new Evento(req.body);
        await nuevoEvento.save();
        res.status(201).json(nuevoEvento);
    }catch (error) {
        res.status(400).json({ mensaje: 'Error al crear el evento', detalle: error.message });

    }

};

// patch - registro de asistentes (validacion de cupo)
export const registrarAsistente = async (req, res) => {
    try {
        const { id } = req.params;
        const eventoEncontrado = await Evento.findById(id);

        if (!eventoEncontrado) return res.status(404).json({ mensaje: 'Evento no encontrado' });

        //validacion de RNF: no exceder el cupo maximo

        if (eventoEncontrado.asistentes >= eventoEncontrado.cupomaximo) {
            return res.status(400).json({ mensaje: 'Cupo máximo alcanzado para este evento!' });
        }

        eventoEncontrado.asistentes += 1;
        await eventoEncontrado.save();
        res.status(200).json(eventoEncontrado);
    }catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar asistente', error: error.message });
    }

};

// Delete - eliminar evento
export const eliminarEvento = async (req, res) => {
    try {
        await Evento.findByIdAndDelete(req.params.id);
        res.status(200).json({ mensaje: 'Evento eliminado con éxito' });
    }catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el evento', error: error.message });
    }
};
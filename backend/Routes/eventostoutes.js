import { Router } from "express";
import { obtenerEventos, crearEvento,registrarAsistente,eliminarEvento, } from "../controllers/eventocontroler.js";

const router = Router();

router.get('/', obtenerEventos);
router.post('/', crearEvento);
router.patch('/:id/registrar', registrarAsistente);
router.delete('/:id', eliminarEvento);

export default router;

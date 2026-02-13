import { Router } from 'express';
import { 
    obtenerProductos, 
    obtenerProductoPorId,
    crearProducto, 
    actualizarProducto, 
    eliminarProducto 
} from '../controladores/inventarioControlador.js';

const router = Router();

// Definición de endpoints CRUD
router.get('/', obtenerProductos);           // GET: Listar todo
router.get('/:id', obtenerProductoPorId);    // GET: Ver uno solo
router.post('/', crearProducto);             // POST: Crear nuevo
router.put('/:id', actualizarProducto);      // PUT: Actualizar existente
router.delete('/:id', eliminarProducto);     // DELETE: Borrar

export default router;
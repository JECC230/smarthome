import repositorio from '../repositories/ProductoRepository.js'; 

// 1. OBTENER TODOS
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await repositorio.obtenerTodos();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor", detalle: error.message });
    }
};

// 2. OBTENER POR ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const producto = await repositorio.obtenerPorId(id);

        if (!producto) {
            return res.status(404).json({ error: "No encontrado", mensaje: "Producto no existe" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};

// 3. CREAR
export const crearProducto = async (req, res) => {
    try {
        const { nombre, categoria, stock, stockMinimo } = req.body;

        // Validaciones Fail Fast
        if (!nombre || !categoria) {
            return res.status(400).json({ error: "Datos incompletos", mensaje: "Falta nombre o categoria" });
        }
        if (stock < 0) {
            return res.status(400).json({ error: "Stock inválido", mensaje: "El stock no puede ser negativo" });
        }

        const nuevoProducto = await repositorio.crear({ nombre, categoria, stock, stockMinimo });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: "Error al crear producto", detalle: error.message });
    }
};

// 4. ACTUALIZAR
export const actualizarProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cuerpo = req.body;

        if (cuerpo.stock !== undefined && cuerpo.stock < 0) {
            return res.status(400).json({ error: "Stock inválido" });
        }

        const actualizado = await repositorio.actualizar(id, cuerpo);

        if (!actualizado) {
            return res.status(404).json({ error: "No encontrado", mensaje: "Producto no existe o inactivo" });
        }

        res.status(200).json(actualizado);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// 5. ELIMINAR
export const eliminarProducto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const exito = await repositorio.eliminar(id);

        if (!exito) {
            return res.status(404).json({ error: "No encontrado" });
        }

        res.status(204).send(); // 204 No Content es estándar para delete exitoso
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};
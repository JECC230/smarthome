import { pool } from '../db.js';

class ProductoRepository {
    
    // LEER TODOS 
    async obtenerTodos() {
        const consulta = 'SELECT id, nombre, categoria, stock, stock_minimo AS "stockMinimo", activo FROM productos WHERE activo = true';
        const resultado = await pool.query(consulta);
        return resultado.rows;
    }

    // LEER POR ID
    async obtenerPorId(id) {
        const consulta = 'SELECT id, nombre, categoria, stock, stock_minimo AS "stockMinimo", activo FROM productos WHERE id = $1 AND activo = true';
        const resultado = await pool.query(consulta, [id]);
        
        if (resultado.rows.length === 0) return null;
        
        
        return resultado.rows[0];
    }

    // CREAR
    async crear(datos) {
        const { nombre, categoria, stock, stockMinimo } = datos;
        
        const consulta = `
            INSERT INTO productos (nombre, categoria, stock, stock_minimo)
            VALUES ($1, $2, $3, $4)
            RETURNING id, nombre, categoria, stock, stock_minimo AS "stockMinimo", activo
        `;
        
        const valores = [nombre, categoria, stock || 0, stockMinimo || 1];
        const resultado = await pool.query(consulta, valores);
        
        return resultado.rows[0];
    }

    // ACTUALIZAR
    async actualizar(id, datos) {
        // Primero verificamos que exista
        const productoActual = await this.obtenerPorId(id);
        if (!productoActual) return null;

        const { nombre, categoria, stock, stockMinimo } = datos;

        const consulta = `
            UPDATE productos
            SET nombre = $1, categoria = $2, stock = $3, stock_minimo = $4
            WHERE id = $5
            RETURNING id, nombre, categoria, stock, stock_minimo AS "stockMinimo", activo
        `;

        const valores = [
            nombre || productoActual.nombre,
            categoria || productoActual.categoria,
            stock !== undefined ? stock : productoActual.stock,
            stockMinimo !== undefined ? stockMinimo : productoActual.stockMinimo,
            id
        ];

        const resultado = await pool.query(consulta, valores);
        
        // CORREGIDO: Aquí también decía returnZF
        return resultado.rows[0];
    }

    // ELIMINAR (Soft Delete)
    async eliminar(id) {
        const producto = await this.obtenerPorId(id);
        if (!producto) return false;

        const consulta = 'UPDATE productos SET activo = false WHERE id = $1';
        await pool.query(consulta, [id]);
        return true;
    }
}

export default new ProductoRepository();
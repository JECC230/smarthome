const API_URL = '/api/productos';

let inventarioGlobal = [];

// 1. Cargar Productos
async function cargarProductos() {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '<div class="loading">Cargando inventario...</div>';

    try {
        const respuesta = await fetch(API_URL);
        const productos = await respuesta.json();

        // Guardamos copia global para los filtros
        inventarioGlobal = productos;
        
        // Renderizamos todo inicialmente
        renderizarLista(productos);

    } catch (error) {
        console.error('Error:', error);
        contenedor.innerHTML = '<p style="color:var(--accent-red)">Error de conexión.</p>';
    }
}

// 2. Función para "Pintar" el HTML (Separada para reusar en filtros)
function renderizarLista(productos) {
    const contenedor = document.getElementById('lista-productos');
    contenedor.innerHTML = '';

    if (productos.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#666;">No hay productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const div = document.createElement('div');
        const alertaClase = producto.stock < producto.stockMinimo ? 'bajo-stock' : '';
        
        div.className = `producto-card ${alertaClase}`;
        
        // Al hacer click en la tarjeta, abrimos el modal de edición
        // Nota: onclick en el div principal abre detalles
        div.onclick = () => abrirModalEdicion(producto);

        div.innerHTML = `
            <div class="producto-info">
                <strong>${producto.nombre}</strong> 
                <small>${producto.categoria}</small>
                <div class="stock-badge">📦 Stock: ${producto.stock} | Mín: ${producto.stockMinimo}</div>
            </div>
            <button class="btn-delete" onclick="event.stopPropagation(); eliminarProducto(${producto.id})" title="Eliminar">✕</button>
        `;
        contenedor.appendChild(div);
    });
}

// 3. Filtros por Categoría
function aplicarFiltros() {
    const categoriaSeleccionada = document.getElementById('filtro-categoria').value;

    if (categoriaSeleccionada === 'todos') {
        renderizarLista(inventarioGlobal);
    } else {
        const filtrados = inventarioGlobal.filter(p => p.categoria === categoriaSeleccionada);
        renderizarLista(filtrados);
    }
}

// 4. Agregar Nuevo Producto
document.getElementById('form-producto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        stock: parseInt(document.getElementById('stock').value),
        stockMinimo: parseInt(document.getElementById('stockMinimo').value)
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
        });
        document.getElementById('form-producto').reset();
        cargarProductos(); // Recargar API
    } catch (error) {
        alert('Error al guardar');
    }
});

// 5. Eliminar (Con confirmación nativa)
window.eliminarProducto = async (id) => {
    if(!confirm('⚠️ ¿Estás seguro de eliminar este producto permanentemente?')) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        cargarProductos();
    } catch (error) {
        alert('Error al eliminar');
    }
};

/* --- LÓGICA DEL MODAL DE EDICIÓN --- */

let productoEnEdicionId = null; // Para saber qué ID estamos editando

window.abrirModalEdicion = (producto) => {
    productoEnEdicionId = producto.id;
    
    // Llenar campos del modal
    document.getElementById('edit-nombre').value = producto.nombre;
    document.getElementById('edit-stock').value = producto.stock;
    document.getElementById('edit-stockMinimo').value = producto.stockMinimo;
    document.getElementById('edit-id').value = producto.id;

    // Mostrar modal
    document.getElementById('modal-edicion').classList.remove('hidden');
};

window.cerrarModal = () => {
    document.getElementById('modal-edicion').classList.add('hidden');
    productoEnEdicionId = null;
};

// Botones +/- en el modal
window.ajustarStock = (cantidad) => {
    const input = document.getElementById('edit-stock');
    let valor = parseInt(input.value) || 0;
    valor += cantidad;
    if (valor < 0) valor = 0;
    input.value = valor;
};

// Guardar cambios del Modal (PUT)
document.getElementById('form-editar').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const datosActualizados = {
        nombre: document.getElementById('edit-nombre').value,
        // No enviamos categoría en el modal para simplificar, pero podrías agregarla
        stock: parseInt(document.getElementById('edit-stock').value),
        stockMinimo: parseInt(document.getElementById('edit-stockMinimo').value)
    };

    try {
        const res = await fetch(`${API_URL}/${productoEnEdicionId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });

        if (res.ok) {
            cerrarModal();
            cargarProductos(); // Refrescar lista
        } else {
            alert('Error al actualizar');
        }
    } catch (error) {
        console.error(error);
        alert('Error de conexión');
    }
});

// Inicializar
cargarProductos();
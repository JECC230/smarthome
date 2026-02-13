import express from 'express';
import inventarioRutas from './rutas/inventarioRutas.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PUERTO = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/productos', inventarioRutas);
app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`);
});
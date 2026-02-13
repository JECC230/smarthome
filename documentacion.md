# Smarthome - Backend MVP

Este repositorio contiene el avance del proyecto final para la materia de Desarrollo FullStack. Se trata de un MVP (Producto Minimo Viable) enfocado en la logica del servidor (Backend) para la gestion de inventario.

## Parte Conceptual

A continuacion se detallan los objetivos y el alcance del proyecto general.

### Que quieres desarrollar?
Una aplicacion Web Full Stack para la gestion integral de los recursos del hogar. El sistema esta diseñado para centralizar el control de la despensa y la organizacion de las tareas domesticas en una plataforma accesible.

### Que problema resuelve tu proyecto?
Resuelve la desorganización habitual en la gestion de insumos del hogar, ayudando a evitar compras duplicadas o el desabastecimiento de alimentos (stock agotado). Tambien soluciona la falta de claridad en la distribucion de tareas entre los miembros de la vivienda.

### A quien va dirigido?
El sistema esta dirigido a familias, grupos de estudiantes o compañeros de piso que comparten una vivienda y necesitan una herramienta digital para organizar sus compras y deberes diarios.

### Cual es el enfoque principal del sistema?
El enfoque principal es la administracion eficiente. Se busca sustituir las listas de papel o notas mentales por un sistema digital que permita llevar un registro exacto del inventario y responsables de actividades.

## MVP (Producto Minimo Viable)

Definicion del alcance para esta primera entrega tecnica.

### Que es lo minimo que debe funcionar en tu proyecto?
Para este avance, lo minimo funcional es una API REST (Backend) que permita gestionar el ciclo de vida de los datos de una entidad principal, simulando la persistencia de datos en memoria local.

### Que funcionalidades incluye esta primera version?
1. Arquitectura MVC (Modelo-Vista-Controlador) establecida.
2. Servidor funcional desarrollado en Node.js y Express.
3. CRUD completo (Crear, Leer, Actualizar, Eliminar) para la entidad Productos.
4. Validacion de datos de entrada (manejo de errores 400 y 404).
5. Persistencia de datos temporal en memoria (arrays).

### Que funcionalidades quedaran fuera por ahora?
En esta etapa no se incluyen:
- Base de datos real (MongoDB/DynamoDB).
- Autenticacion y login de usuarios.
- Gestion de tareas (To-Do list).
- Interfaz grafica (Frontend).
- Sistema de notificaciones por correo.

## Datos del Alumno

Nombre: Juan Esteban Campos Cruz
Matricula: AL05064315
Universidad: Universidad Tecmilenio



 

## Endpoints Disponibles (Entidad Productos)

Puedes probar estos endpoints utilizando Postman:

[GET] /api/productos
Obtiene la lista completa de productos.

[GET] /api/productos/:id
Obtiene un producto especifico por su ID.

[POST] /api/productos
Crea un nuevo producto. Requiere enviar un JSON con "nombre" y "categoria".

[PUT] /api/productos/:id
Actualiza un producto existente por su ID.

[DELETE] /api/productos/:id
Elimina un producto del inventario por su ID.

Enlace Postman
https://juanesteban2823-8230577.postman.co/workspace/JECC's-Workspace~8fed328e-2d92-488a-8e0f-3813f3c065bd/request/51906937-6c0be5f5-6e1a-4d73-8cfb-5880867ade7f
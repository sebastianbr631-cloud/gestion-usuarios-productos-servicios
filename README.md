# Gestión de Usuarios, Productos y Servicios

## Descripción
Aplicación web CRUD desarrollada con **React, Node.js, Express y MongoDB** para la gestión de usuarios, productos y servicios.  
Permite crear, leer, actualizar y eliminar registros desde una interfaz intuitiva y responsive.

## Tecnologías usadas
- **Frontend:** React, Bootstrap  
- **Backend:** Node.js, Express  
- **Base de datos:** MongoDB  
- **Otros:** react-router-dom

## Estructura de carpetas

backend_frontend/
├── API_GA4_Backend/ # Backend Node.js + Express
├── frontend_react/ # Frontend React

## Instrucciones para ejecutar

### 1. Clonar el repositorio
```bash
git clone https://github.com/sebastianbr631-cloud/gestion-usuarios-productos-servicios.git
cd gestion-usuarios-productos-servicios
2. Backend
cd API_GA4_Backend
npm install
npm run dev

El backend corre en http://localhost:3000
 por defecto.

3. Frontend
cd frontend_react
npm install
npm start

El frontend corre en http://localhost:3001
 por defecto.

4. Usuarios de prueba
Rol	Correo	Contraseña
Admin	admin@gmail.com
	admin123

Usa estos datos para iniciar sesión y probar la aplicación.

Notas

Asegúrate de tener Node.js y MongoDB instalados.

La aplicación permite gestionar usuarios, productos y servicios desde un CRUD completo.

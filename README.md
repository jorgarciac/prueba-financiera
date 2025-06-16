# Prueba Técnica Frontend - Angular

## 📌 Descripción
Aplicación desarrollada como parte de la prueba técnica. Permite gestionar productos financieros: listado, búsqueda, paginación, creación, edición y eliminación, cumpliendo buenas prácticas (SOLID, clean code).

## ⚙️ Tecnologías
- Angular 16.x
- TypeScript
- CSS puro
- Karma + Jasmine (tests unitarios)
- Node.js (backend local de prueba)

## 🚀 ¿Cómo correr el proyecto?

### Backend (API local)
1️⃣ Ve al directorio del backend:
```bash
cd repo-interview-main
```
2️⃣ Instala dependencias:
```bash
npm install
```
3️⃣ Importante: abre `src/main.ts` y **descomenta la línea 8**:
```typescript
// cors: true,
```
👉 Así debe quedar:
```typescript
cors: true,
```
Esto habilita CORS para que el frontend se comunique con el backend sin errores.

4️⃣ Inicia el servidor:
```bash
npm run start:dev
```
👉 Servirá en `http://localhost:3002`

### Frontend
1️⃣ Ve al directorio del frontend:
```bash
cd prueba-financiera
```
2️⃣ Instala dependencias:
```bash
npm install
```
3️⃣ Levanta el servidor Angular:
```bash
ng serve
```
👉 Accede en `http://localhost:4200`

## 🧪 Pruebas unitarias
Ejecuta:
```bash
ng test --code-coverage
```
💡 Abre el reporte en:
```
coverage/index.html
```
✅ Cobertura actual:
- Statements: ~70%  
- Branches: ~70%  
- Functions: ~60%  
- Lines: ~69%  

## 💡 Funcionalidades
✔ Listado de productos financieros  
✔ Búsqueda de productos  
✔ Paginación (5, 10, 20 registros)  
✔ Agregar producto (con validación y verificación de ID)  
✔ Editar producto  
✔ Eliminar producto (con modal de confirmación)  
✔ Validaciones visuales en formularios  
✔ Menú contextual para acciones  

## 📁 Estructura destacada
```
src/
 ├── app/
 │    ├── pages/
 │    │    ├── products-list/
 │    │    └── product-form/
 │    ├── services/
 │    └── shared/ (modal, etc)
```
👉 Separación clara de responsabilidades.

## 🚀 Mejoras posibles
- Añadir debounce a búsqueda para optimizar rendimiento  
- Loader / skeleton mientras carga la tabla  
- Responsividad completa para móviles  

## 📝 Autor
Eduardo García Castro  
Prueba Técnica TCS

## 💬 Notas
Este proyecto respeta los principios **SOLID**, es mantenible y escalable.

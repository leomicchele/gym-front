# Gym Dashboard

## Descripción
Gym Dashboard es una aplicación web desarrollada con React que permite la gestión de un gimnasio. La aplicación facilita la administración de alumnos, profesores, rutinas de entrenamiento y seguimiento del historial de los usuarios.

## Características
- **Gestión de Alumnos**: Registro y administración de información de los alumnos.
- **Gestión de Profesores**: Administración del personal del gimnasio.
- **Creación de Rutinas**: Diseño y asignación de rutinas de entrenamiento personalizadas.
- **Historial**: Seguimiento del progreso y actividades de los usuarios.
- **Fichas Personales**: Mantenimiento de información detallada de cada usuario.
- **Autenticación**: Sistema de login para acceso seguro.

## Tecnologías Utilizadas
- **React**: Biblioteca JavaScript para construir interfaces de usuario.
- **React Router**: Para la navegación entre diferentes componentes.
- **Bootstrap**: Framework CSS para el diseño responsivo.
- **Sass**: Preprocesador CSS para estilos avanzados.
- **Framer Motion**: Biblioteca para animaciones en React.
- **Vite**: Herramienta de construcción que proporciona un entorno de desarrollo más rápido.
- **PWA**: Configuración para Progressive Web App.

## Requisitos Previos
- Node.js (versión recomendada: 14.x o superior)
- npm o yarn

## Instalación
1. Clonar el repositorio:
   ```
   git clone [URL del repositorio]
   ```

2. Navegar al directorio del proyecto:
   ```
   cd gym-front
   ```

3. Instalar dependencias:
   ```
   npm install
   ```

4. Configurar variables de entorno:
   - Copiar el archivo `.env.example` a `.env`
   - Configurar las variables necesarias

## Ejecución
- **Desarrollo**:
  ```
  npm run dev
  ```

- **Producción**:
  ```
  npm run build
  npm run preview
  ```

## Estructura del Proyecto
- `/src`: Código fuente de la aplicación
  - `/components`: Componentes React organizados por funcionalidad
  - `/context`: Contextos de React para el manejo de estado global
  - `/utils`: Funciones de utilidad
  - `/assets`: Recursos estáticos (imágenes, iconos, etc.)
  - `/scss`: Estilos SASS

## Despliegue
La aplicación está configurada para ser desplegada en Netlify, utilizando los archivos `netlify.toml` y `_redirects` para la configuración del despliegue.

## Licencia
**Propietario - Todos los derechos reservados**

Este software es de propiedad privada. No se permite su redistribución, copia, modificación o uso sin autorización explícita por escrito del propietario. El código fuente y todos los componentes asociados están protegidos por leyes de propiedad intelectual y derechos de autor.

## Contacto
[Información de contacto del desarrollador o equipo]
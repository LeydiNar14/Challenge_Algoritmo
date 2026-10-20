# Desafío pila de libros

Proyecto básico de React + Vite, solo frontend y sin estilos.

## Cómo correrlo

```
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Qué incluye

- Clase `Stack` con `push`, `pop`, `peek`, `isEmpty`, `size` y `toArray`.
- Pila inicial con 6 libros (nombre, ISBN, autor y editorial).
- Pantalla "Agregar libro": formulario que hace `push` a la pila.
- Pantalla "Ver pila": imprime la pila de arriba hacia abajo y tiene un botón para quitar el libro de arriba (`pop`).

Toda la lógica está en `src/App.jsx`.

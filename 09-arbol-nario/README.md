# Desafío 09 · Menú lateral

Proyecto de React + Vite, solo frontend, sin librerías extra.

## Cómo correrlo

```
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Qué incluye

1. Proyecto nuevo en React (Vite).
2. Árbol N-ario (`NaryTree` y `MenuNode`): cada ítem tiene `title`, `link`
   y `component`, y puede tener cualquier cantidad de hijos.
3. Menú lateral que se imprime recorriendo ese árbol con el componente
   `MenuItem`, que se llama a sí mismo para pintar los submenús.

Al hacer clic en un ítem se muestra su componente a la derecha, y los menús con
submenús (Mis cursos y Mi cuenta) se abren y se cierran.

Toda la lógica está en `src/App.jsx` y los estilos en `src/App.css`.

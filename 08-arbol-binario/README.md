# Desafío 08 · Árbol binario

Proyecto básico de React + Vite, solo frontend.

## Cómo correrlo

```
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173)
y abre la consola del navegador (F12) para ver los recorridos.

## Qué incluye

1. `BinarySearchTree` con `insert` y los recorridos `inorder`, `postorder` y `preorder`,
   que se imprimen por consola.
2. `contains(valor)`: revisa si un valor está en el árbol (hay un campo "Buscar número").
3. El árbol dibujado con `react-d3-tree` (`npm install react-d3-tree`).

`react-d3-tree` pide los datos con la forma `{ name: "...", children: [...] }`;
el método `toTreeData()` convierte el árbol a ese formato.

Toda la lógica está en `src/App.jsx`. Para ver cómo debe quedar el árbol por dentro
puedes compararlo con https://visualgo.net

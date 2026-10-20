# Desafío 11 · Buscador con Trie y Heap

Proyecto básico de React + Vite, solo frontend y sin estilos.

## Cómo correrlo

```
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Qué incluye

- Clase `Trie` con `insert(nombre, popularidad)` y `searchPrefix(prefijo)`.
- Clase `MaxHeap` con `push` y `pop`: el producto más popular queda arriba.
- Clase `SearchEngine` con `searchTopK(prefijo, k)`, que busca en el Trie y saca
  los K más populares del Heap.
- Productos de ejemplo, entre ellos los de la diapositiva. Al abrir la página se imprime
  `searchTopK("air", 2)` en la consola del navegador (F12).
- Un formulario para buscar por prefijo y elegir K, y otro para agregar productos.

Toda la lógica está en `src/App.jsx`.

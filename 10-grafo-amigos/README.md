# Desafío 10 · Grafo de amigos y ciudades

Proyecto de React + Vite, solo frontend.

## Cómo correrlo

```
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Qué incluye

- Clase `SocialGraph` con `addCity`, `addPerson` (nombre, edad y ciudad),
  `addFriendship`, `getCities` y `getPeopleInCity`.
- Cada persona y cada ciudad es un nodo. Cada persona se conecta a UNA ciudad
  y también puede conectarse con sus amigos.
- Un selector de ciudad que imprime la lista de personas que viven allí.
- El grafo dibujado con `react-d3-graph` (`toGraphData()` lo convierte al
  formato `{ nodes, links }` que pide la librería).

Nota: `react-d3-graph` es una librería antigua y declara React 16. Por eso el
proyecto incluye un archivo `.npmrc` con `legacy-peer-deps=true`; así
`npm install` no da error con React 18.

Toda la lógica está en `src/App.jsx`.

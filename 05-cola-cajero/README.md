# Desafío de colas, cajero

Proyecto básico de React + Vite, solo frontend y sin estilos.

## Cómo correrlo

```
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

## Qué incluye

- Clase `Queue` con `enqueue`, `dequeue`, `peek`, `isEmpty`, `size` y `toArray`.
- Cola inicial con 6 personas (nombre, monto de retiro y fecha de llegada al azar).
- Pantalla "Agregar persona": formulario que hace `enqueue`. La fecha de llegada la asigna el sistema.
- Pantalla "Ver cola": imprime la cola del más antiguo al más reciente y tiene un botón para atender a la primera persona (`dequeue`).

Toda la lógica está en `src/App.jsx`. El rango de fechas al azar se cambia en las
constantes `RANGE_START` y `RANGE_END` al inicio del archivo.

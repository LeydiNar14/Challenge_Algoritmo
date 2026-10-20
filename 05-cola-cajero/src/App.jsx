import React, { useState } from "react";


const RANGE_START = new Date(2026, 9, 1, 0, 0, 0); // 1 de octubre, 00:00
const RANGE_END = new Date(2026, 9, 1, 23, 59, 59); // 1 de octubre, 23:59

// El sistema asigna la fecha de llegada
function randomArrivalDate() {
  const start = RANGE_START.getTime();
  const end = RANGE_END.getTime();
  return new Date(start + Math.random() * (end - start));
}

// ---- Cola ----
// La persona que llegó primero (fecha más antigua) queda al frente.
class Queue {
  constructor() {
    this.items = [];
  }
  // Agrega a la persona y deja la cola ordenada por fecha de llegada
  enqueue(person) {
    this.items.push(person);
    this.items.sort((a, b) => a.arrival - b.arrival);
  }
  // Saca a la persona del frente (null si la cola está vacía)
  dequeue() {
    if (this.items.length === 0) return null;
    return this.items.shift();
  }
  // Mira a la persona del frente sin sacarla
  peek() {
    return this.items.length === 0 ? null : this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  size() {
    return this.items.length;
  }
  toArray() {
    return [...this.items];
  }
}

// ---- Formatos ----
function formatMoney(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(date) {
  return date.toLocaleString("es-CO");
}

// ---- Datos simulados ----
function buildQueue() {
  const queue = new Queue();
  const people = [
    { name: "Carlos Andrés Muñoz", amount: 250000 },
    { name: "Valentina Ospina", amount: 800000 },
    { name: "Jhon Fredy Rengifo", amount: 100000 },
    { name: "Daniela Castaño", amount: 1500000 },
    { name: "Sebastián Lozano", amount: 60000 },
    { name: "Natalia Quintero", amount: 420000 },
  ];
  people.forEach((p) =>
    queue.enqueue({ ...p, arrival: randomArrivalDate() })
  );
  return queue;
}

// ---- Pantalla 1: Formulario para agregar una persona ----
function FormPage({ onAdd }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (!name.trim() || !(value > 0)) {
      setMessage("Escribe un nombre y un monto mayor que 0.");
      return;
    }
    // La fecha de llegada la asigna el sistema, no el usuario
    onAdd({ name: name.trim(), amount: value, arrival: randomArrivalDate() });
    setName("");
    setAmount("");
    setMessage("Persona agregada a la cola.");
  };

  return (
    <div>
      <h2>Agregar persona</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Nombre: <input value={name} onChange={(e) => setName(e.target.value)} />
        </p>
        <p>
          Monto a retirar (COP):{" "}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </p>
        <button type="submit">Agregar a la cola</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

// ---- Pantalla 2: Imprimir la cola ----
function QueuePage({ people, onServe }) {
  return (
    <div>
      <h2>Cola del cajero</h2>
      <p>Personas en la cola: {people.length}</p>
      <button onClick={onServe} disabled={people.length === 0}>
        Atender siguiente
      </button>
      {people.length === 0 ? (
        <p>No hay nadie en la cola.</p>
      ) : (
        <ol>
          {people.map((p, i) => (
            <li key={p.name + i}>
              {i === 0 ? <b>{p.name} (sigue)</b> : p.name}
              <br />
              Retiro: {formatMoney(p.amount)} | Llegada: {formatDate(p.arrival)}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

// ---- App: navegación entre las 2 pantallas ----
export default function App() {
  const [queue] = useState(() => buildQueue());
  const [people, setPeople] = useState(() => queue.toArray());
  const [route, setRoute] = useState("queue");

  const addPerson = (person) => {
    queue.enqueue(person);
    setPeople(queue.toArray());
  };

  const serveNext = () => {
    queue.dequeue();
    setPeople(queue.toArray());
  };

  return (
    <div>
      <h1>Desafío de colas, cajero</h1>
      <button onClick={() => setRoute("form")}>Agregar persona</button>{" "}
      <button onClick={() => setRoute("queue")}>Ver cola</button>
      <hr />
      {route === "form" ? (
        <FormPage onAdd={addPerson} />
      ) : (
        <QueuePage people={people} onServe={serveNext} />
      )}
    </div>
  );
}

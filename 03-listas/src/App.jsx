import React, { useState, useMemo } from "react";

/* =========================================================
   DESAFÍO 03 - versión básica, sin estilos
   1) Lista enlazada simple  -> reproductor de canciones
   2) Lista doblemente enlazada -> historial de navegación
   ========================================================= */

// ---- Lista enlazada simple ----
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
  }
  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}

// ---- Lista doblemente enlazada ----
class DNode {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }
  append(value) {
    const node = new DNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    return node;
  }
  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}

// ---- Datos simulados ----
function buildPlaylist() {
  const list = new LinkedList();
  ["Tusa", "La Bicicleta", "Me Enamora", "Provenza", "Bonita"]
    .forEach((s) => list.append(s));
  return list;
}

function buildHistory() {
  const list = new DoublyLinkedList();
  const nodes = ["/home", "/noticias", "/deportes/futbol", "/clima", "/contacto"]
    .map((p) => list.append(p));
  return { list, startNode: nodes[2] };
}

// ---- Página 1: Reproductor ----
function PlayerPage() {
  const list = useMemo(() => buildPlaylist(), []);
  const songs = useMemo(() => list.toArray(), [list]);
  const [current, setCurrent] = useState(list.head);

  return (
    <div>
      <h2>Reproductor (lista enlazada simple)</h2>
      <p>Sonando: {current.value}</p>
      <button onClick={() => setCurrent(list.head)}>Reiniciar</button>{" "}
      <button
        onClick={() => setCurrent((n) => n.next || n)}
        disabled={!current.next}
      >
        Siguiente
      </button>
      <ul>
        {songs.map((s, i) => (
          <li key={i}>{s === current.value ? <b>{s}</b> : s}</li>
        ))}
      </ul>
    </div>
  );
}

// ---- Página 2: Historial ----
function HistoryPage() {
  const { list, startNode } = useMemo(() => buildHistory(), []);
  const all = useMemo(() => list.toArray(), [list]);
  const [current, setCurrent] = useState(startNode);

  return (
    <div>
      <h2>Historial (lista doblemente enlazada)</h2>
      <p>Página actual: {current.value}</p>
      <button
        onClick={() => setCurrent((n) => n.prev || n)}
        disabled={!current.prev}
      >
        Atrás
      </button>{" "}
      <button
        onClick={() => setCurrent((n) => n.next || n)}
        disabled={!current.next}
      >
        Adelante
      </button>
      <ul>
        {all.map((p, i) => (
          <li key={i}>{p === current.value ? <b>{p}</b> : p}</li>
        ))}
      </ul>
    </div>
  );
}

// ---- App: navegación entre las 2 páginas ----
export default function App() {
  const [route, setRoute] = useState("player");

  return (
    <div>
      <h1>Desafío 03</h1>
      <button onClick={() => setRoute("player")}>Reproductor</button>{" "}
      <button onClick={() => setRoute("history")}>Historial</button>
      <hr />
      {route === "player" ? <PlayerPage /> : <HistoryPage />}
    </div>
  );
}

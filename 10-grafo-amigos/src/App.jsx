import React, { useState } from "react";
import { Graph } from "react-d3-graph";

/* =========================================================
   DESAFÍO 10 - grafo de amigos y ciudades
   Un grafo es un conjunto de nodos conectados por aristas.
   - Cada persona es un nodo (nombre, edad) y apunta a UNA ciudad
   - Cada ciudad es un nodo (nombre)
   - Las personas también se conectan con sus amigos
   - Se puede listar las personas que viven en una ciudad
   - El grafo se dibuja con react-d3-graph
   ========================================================= */

// ---- Grafo ----
class SocialGraph {
  constructor() {
    this.nodes = []; // personas y ciudades
    this.edges = []; // conexiones entre nodos
  }

  // Agrega una ciudad (nodo con nombre)
  addCity(name) {
    this.nodes.push({ id: "ciudad-" + name, type: "city", name });
  }

  // Agrega una persona (nodo con nombre y edad) y la conecta a su ciudad
  addPerson(name, age, cityName) {
    const cityId = "ciudad-" + cityName;
    if (!this.nodes.some((n) => n.id === cityId)) {
      throw new Error("La ciudad " + cityName + " no existe");
    }
    const id = "persona-" + name;
    this.nodes.push({ id, type: "person", name, age });
    this.edges.push({ source: id, target: cityId });
  }

  // Conecta a dos personas como amigas
  addFriendship(nameA, nameB) {
    this.edges.push({ source: "persona-" + nameA, target: "persona-" + nameB });
  }

  getCities() {
    return this.nodes.filter((n) => n.type === "city");
  }

  // Lista las personas que viven en una ciudad
  getPeopleInCity(cityName) {
    const cityId = "ciudad-" + cityName;
    return this.edges
      .filter((e) => e.target === cityId)
      .map((e) => this.nodes.find((n) => n.id === e.source));
  }

  // Convierte el grafo al formato que pide react-d3-graph:
  // { nodes: [{ id }], links: [{ source, target }] }
  toGraphData() {
    return {
      nodes: this.nodes.map((n) => ({
        id: n.id,
        label: n.type === "city" ? n.name : n.name + " (" + n.age + ")",
        color: n.type === "city" ? "#e07b39" : "#4a90d9",
        symbolType: n.type === "city" ? "square" : "circle",
      })),
      links: this.edges.map((e) => ({ source: e.source, target: e.target })),
    };
  }
}

// ---- Datos simulados ----
function buildGraph() {
  const graph = new SocialGraph();

  graph.addCity("Cali");
  graph.addCity("Pasto");
  graph.addCity("Popayán");

  graph.addPerson("Mariana", 21, "Cali");
  graph.addPerson("Julián", 27, "Cali");
  graph.addPerson("Laura", 19, "Cali");
  graph.addPerson("Felipe", 31, "Pasto");
  graph.addPerson("Paola", 24, "Pasto");
  graph.addPerson("Esteban", 29, "Popayán");

  graph.addFriendship("Mariana", "Julián");
  graph.addFriendship("Mariana", "Paola");
  graph.addFriendship("Laura", "Esteban");
  graph.addFriendship("Felipe", "Paola");
  graph.addFriendship("Julián", "Esteban");

  return graph;
}

const graph = buildGraph();

// ---- Configuración de react-d3-graph ----
const config = {
  width: 700,
  height: 450,
  directed: false,
  nodeHighlightBehavior: true,
  node: {
    size: 600,
    fontSize: 13,
    highlightFontSize: 14,
    labelProperty: "label", // texto que se muestra en cada nodo
  },
  link: {
    highlightColor: "lightblue",
  },
};

// ---- App ----
export default function App() {
  const cities = graph.getCities();
  const [selectedCity, setSelectedCity] = useState(cities[0].name);
  // Se guarda una sola vez porque la librería modifica estos datos por dentro
  const [data] = useState(() => graph.toGraphData());

  const people = graph.getPeopleInCity(selectedCity);

  return (
    <div>
      <h1>Desafío 10 · Grafo de amigos y ciudades</h1>

      <h3>Personas que viven en una ciudad</h3>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {cities.map((c) => (
          <option key={c.id} value={c.name}>
            {c.name}
          </option>
        ))}
      </select>
      <ul>
        {people.map((p) => (
          <li key={p.id}>
            {p.name} - {p.age} años
          </li>
        ))}
      </ul>

      <h3>Grafo (cuadrados naranja = ciudades, círculos azules = personas)</h3>
      <div style={{ border: "1px solid black", width: "700px" }}>
        <Graph id="grafo-amigos-ciudades" data={data} config={config} />
      </div>
    </div>
  );
}

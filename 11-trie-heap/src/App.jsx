import React, { useState } from "react";

/* =========================================================
   DESAFÍO 11 - buscador inteligente + top resultados
   1) Los productos se guardan en un Trie (letra por letra)
   2) Se busca por prefijo: "air" encuentra "air max", "air force"...
   3) Un Heap devuelve los K productos más populares
   ========================================================= */

// ---- Nodo del Trie ----
class TrieNode {
  constructor() {
    this.children = {}; // una letra -> el siguiente nodo
    this.product = null; // si aquí termina un nombre, se guarda el producto
  }
}

// ---- Trie ----
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Guarda un producto recorriendo su nombre letra por letra.
  // Si el nombre ya existía, solo se actualiza la popularidad.
  insert(name, popularity) {
    let cur = this.root;
    for (const letter of name) {
      if (!cur.children[letter]) cur.children[letter] = new TrieNode();
      cur = cur.children[letter];
    }
    cur.product = { name, popularity };
  }

  // Devuelve todos los productos cuyo nombre empieza por el prefijo
  searchPrefix(prefix) {
    let cur = this.root;
    for (const letter of prefix) {
      if (!cur.children[letter]) return [];
      cur = cur.children[letter];
    }
    const out = [];
    this.collect(cur, out);
    return out;
  }

  // Baja por todas las ramas desde un nodo y junta los productos
  collect(node, out) {
    if (node.product) out.push(node.product);
    for (const letter in node.children) {
      this.collect(node.children[letter], out);
    }
  }
}

// ---- Heap de máximos ----
// El producto más popular siempre queda en la posición 0.
// Para el nodo i: padre = (i - 1) / 2, hijos = 2i + 1 y 2i + 2
class MaxHeap {
  constructor() {
    this.items = [];
  }
  size() {
    return this.items.length;
  }
  // Agrega al final y lo sube mientras sea más popular que su padre
  push(product) {
    this.items.push(product);
    let i = this.items.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.items[parent].popularity >= this.items[i].popularity) break;
      this.swap(i, parent);
      i = parent;
    }
  }
  // Saca el más popular: el último pasa a la raíz y se baja a su lugar
  pop() {
    if (this.items.length === 0) return null;
    const top = this.items[0];
    const last = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = last;
      let i = 0;
      while (true) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let biggest = i;
        if (left < this.items.length && this.items[left].popularity > this.items[biggest].popularity) biggest = left;
        if (right < this.items.length && this.items[right].popularity > this.items[biggest].popularity) biggest = right;
        if (biggest === i) break;
        this.swap(i, biggest);
        i = biggest;
      }
    }
    return top;
  }
  swap(a, b) {
    [this.items[a], this.items[b]] = [this.items[b], this.items[a]];
  }
}

// ---- Buscador: une el Trie y el Heap ----
class SearchEngine {
  constructor() {
    this.trie = new Trie();
  }
  insert(name, popularity) {
    this.trie.insert(name.trim().toLowerCase(), popularity);
  }
  // Busca por prefijo en el Trie y saca los K más populares del Heap
  searchTopK(prefix, k) {
    const heap = new MaxHeap();
    this.trie
      .searchPrefix(prefix.trim().toLowerCase())
      .forEach((p) => heap.push(p));
    const top = [];
    while (top.length < k && heap.size() > 0) top.push(heap.pop());
    return top;
  }
}

// ---- Datos simulados (el ejemplo de la diapositiva y algunos más) ----
function buildEngine() {
  const engine = new SearchEngine();
  engine.insert("air max", 90);
  engine.insert("air force", 95);
  engine.insert("air jordan", 85);
  engine.insert("adidas boost", 80);
  engine.insert("adidas samba", 93);
  engine.insert("adidas forum", 72);
  engine.insert("air max 90", 78);
  engine.insert("vans old skool", 83);
  engine.insert("converse chuck 70", 87);
  return engine;
}

// Se crea una sola vez y se imprime el ejemplo de la diapositiva por consola
const initialEngine = buildEngine();
console.log('searchTopK("air", 2):', initialEngine.searchTopK("air", 2));

// ---- App ----
export default function App() {
  const [engine] = useState(() => initialEngine);
  const [prefix, setPrefix] = useState("air");
  const [k, setK] = useState(2);
  const [results, setResults] = useState(() => engine.searchTopK("air", 2));
  const [name, setName] = useState("");
  const [popularity, setPopularity] = useState("");
  const [message, setMessage] = useState("");

  const search = (p, amount) => setResults(engine.searchTopK(p, amount));

  const handleSearch = (e) => {
    e.preventDefault();
    const amount = Number(k);
    if (!(amount > 0)) {
      setMessage("K debe ser mayor que 0.");
      return;
    }
    setMessage("");
    search(prefix, amount);
  };

  const handleInsert = (e) => {
    e.preventDefault();
    const value = Number(popularity);
    if (!name.trim() || popularity === "" || value < 0) {
      setMessage("Escribe un nombre y una popularidad de 0 o más.");
      return;
    }
    engine.insert(name, value);
    setMessage('Producto "' + name.trim().toLowerCase() + '" guardado.');
    setName("");
    setPopularity("");
    search(prefix, Number(k) || 1);
  };

  return (
    <div>
      <h1>Desafío 11 · Buscador con Trie y Heap</h1>

      <h3>Buscar los K más populares</h3>
      <form onSubmit={handleSearch}>
        Prefijo:{" "}
        <input value={prefix} onChange={(e) => setPrefix(e.target.value)} />{" "}
        K:{" "}
        <input
          type="number"
          value={k}
          onChange={(e) => setK(e.target.value)}
          style={{ width: "50px" }}
        />{" "}
        <button type="submit">Buscar</button>
      </form>
      {results.length === 0 ? (
        <p>Ningún producto empieza por "{prefix}".</p>
      ) : (
        <ol>
          {results.map((p) => (
            <li key={p.name}>
              {p.name} - popularidad {p.popularity}
            </li>
          ))}
        </ol>
      )}

      <h3>Agregar producto</h3>
      <form onSubmit={handleInsert}>
        Nombre: <input value={name} onChange={(e) => setName(e.target.value)} />{" "}
        Popularidad:{" "}
        <input
          type="number"
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
          style={{ width: "70px" }}
        />{" "}
        <button type="submit">Guardar en el Trie</button>
      </form>
      <p>{message}</p>

      <h3>Todos los productos guardados</h3>
      <ul>
        {engine.trie.searchPrefix("").map((p) => (
          <li key={p.name}>
            {p.name} - {p.popularity}
          </li>
        ))}
      </ul>
    </div>
  );
}

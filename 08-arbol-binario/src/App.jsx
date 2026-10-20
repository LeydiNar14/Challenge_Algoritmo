import React, { useState } from "react";
import Tree from "react-d3-tree";

// ---- Nodo ----
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// ---- Árbol binario de búsqueda ----
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // Inserta un número. Devuelve false si ya estaba en el árbol.
  insert(value) {
    const node = new TreeNode(value);
    if (!this.root) {
      this.root = node;
      return true;
    }
    let cur = this.root;
    while (true) {
      if (value === cur.value) return false;
      if (value < cur.value) {
        if (!cur.left) {
          cur.left = node;
          return true;
        }
        cur = cur.left;
      } else {
        if (!cur.right) {
          cur.right = node;
          return true;
        }
        cur = cur.right;
      }
    }
  }

  // Punto 2: revisa si un valor está en el árbol
  contains(value) {
    let cur = this.root;
    while (cur) {
      if (value === cur.value) return true;
      cur = value < cur.value ? cur.left : cur.right;
    }
    return false;
  }

  // Izquierda -> raíz -> derecha (sale ordenado de menor a mayor)
  inorder(node = this.root, out = []) {
    if (node) {
      this.inorder(node.left, out);
      out.push(node.value);
      this.inorder(node.right, out);
    }
    return out;
  }

  // Raíz -> izquierda -> derecha
  preorder(node = this.root, out = []) {
    if (node) {
      out.push(node.value);
      this.preorder(node.left, out);
      this.preorder(node.right, out);
    }
    return out;
  }

  // Izquierda -> derecha -> raíz
  postorder(node = this.root, out = []) {
    if (node) {
      this.postorder(node.left, out);
      this.postorder(node.right, out);
      out.push(node.value);
    }
    return out;
  }

  // Convierte el árbol al formato que pide react-d3-tree:
  // { name: "texto", children: [ ...más nodos ] }
  toTreeData(node = this.root) {
    if (!node) return null;
    const data = { name: String(node.value) };
    const children = [];
    if (node.left) children.push(this.toTreeData(node.left));
    if (node.right) children.push(this.toTreeData(node.right));
    if (children.length > 0) data.children = children;
    return data;
  }
}

// ---- Punto 1: imprimir por consola ----
function printTraversals(tree) {
  console.log("Inorder:", tree.inorder().join(", "));
  console.log("Postorder:", tree.postorder().join(", "));
  console.log("Preorder:", tree.preorder().join(", "));
}

// ---- Datos simulados ----
function buildTree() {
  const tree = new BinarySearchTree();
  [42, 21, 68, 10, 33, 55, 90, 27, 37, 61, 75].forEach((n) => tree.insert(n));
  return tree;
}

// Se crea una sola vez, fuera del componente, para imprimir una sola vez
const initialTree = buildTree();
printTraversals(initialTree);

// ---- App ----
export default function App() {
  const [tree] = useState(() => initialTree);
  const [data, setData] = useState(() => tree.toTreeData());
  const [insertValue, setInsertValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const handleInsert = (e) => {
    e.preventDefault();
    if (insertValue === "") {
      setMessage("Escribe un número para insertar.");
      return;
    }
    const value = Number(insertValue);
    if (tree.insert(value)) {
      setMessage("Número " + value + " insertado.");
      setData(tree.toTreeData());
      printTraversals(tree);
    } else {
      setMessage("El número " + value + " ya estaba en el árbol.");
    }
    setInsertValue("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === "") {
      setSearchResult("Escribe un número para buscar.");
      return;
    }
    const value = Number(searchValue);
    setSearchResult(
      tree.contains(value)
        ? "El " + value + " SÍ está en el árbol."
        : "El " + value + " NO está en el árbol."
    );
  };

  return (
    <div>
      <h1>Desafío 08 · Árbol binario</h1>

      <form onSubmit={handleInsert}>
        Insertar número:{" "}
        <input
          type="number"
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
        />{" "}
        <button type="submit">Insertar</button> {message}
      </form>

      <form onSubmit={handleSearch}>
        Buscar número:{" "}
        <input
          type="number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />{" "}
        <button type="submit">Buscar</button> {searchResult}
      </form>

      <h3>Recorridos (también salen por la consola del navegador)</h3>
      <p>Inorder: {tree.inorder().join(", ")}</p>
      <p>Postorder: {tree.postorder().join(", ")}</p>
      <p>Preorder: {tree.preorder().join(", ")}</p>

      <h3>Árbol</h3>
      {/* react-d3-tree necesita que el contenedor tenga ancho y alto */}
      <div style={{ width: "700px", height: "450px", border: "1px solid black" }}>
        <Tree
          data={data}
          orientation="vertical"
          translate={{ x: 350, y: 50 }}
          collapsible={false}
        />
      </div>
    </div>
  );
}

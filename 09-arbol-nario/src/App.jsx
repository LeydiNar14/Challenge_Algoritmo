import React, { useState } from "react";
import "./App.css";


// Esta función crea un componente con un título y texto.
function makePage(title) {
  return function Page() {
    return (
      <div>
        <h2>{title}</h2>
        <p>Aquí va el contenido de: {title}</p>
      </div>
    );
  };
}

// ---- Nodo del árbol N-ario ----
class MenuNode {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = []; // puede tener 0, 1, 2, 3... hijos
  }
  addChild(node) {
    this.children.push(node);
    return node;
  }
}

// ---- Árbol N-ario ----
class NaryTree {
  constructor() {
    // La raíz no se muestra: solo agrupa los menús principales
    this.root = new MenuNode("Menú", "/", makePage("Inicio"));
  }
  // Busca un nodo por su link (recorre el árbol completo)
  findByLink(link, node = this.root) {
    if (node.link === link) return node;
    for (const child of node.children) {
      const found = this.findByLink(link, child);
      if (found) return found;
    }
    return null;
  }
}

// ---- Datos simulados: menús y submenús ----
function buildMenuTree() {
  const tree = new NaryTree();
  const root = tree.root;

  root.addChild(new MenuNode("Inicio", "/inicio", makePage("Inicio")));

  const courses = root.addChild(
    new MenuNode("Mis cursos", "/cursos", makePage("Mis cursos"))
  );
  courses.addChild(
    new MenuNode("Algoritmos II", "/cursos/algoritmos", makePage("Algoritmos II"))
  );
  courses.addChild(
    new MenuNode("Bases de datos", "/cursos/bases-datos", makePage("Bases de datos"))
  );
  courses.addChild(
    new MenuNode("Cálculo integral", "/cursos/calculo", makePage("Cálculo integral"))
  );

  root.addChild(
    new MenuNode("Calificaciones", "/calificaciones", makePage("Calificaciones"))
  );

  const account = root.addChild(
    new MenuNode("Mi cuenta", "/cuenta", makePage("Mi cuenta"))
  );
  account.addChild(
    new MenuNode("Datos personales", "/cuenta/datos", makePage("Datos personales"))
  );
  account.addChild(
    new MenuNode("Cambiar contraseña", "/cuenta/contrasena", makePage("Cambiar contraseña"))
  );
  account.addChild(
    new MenuNode("Notificaciones", "/cuenta/notificaciones", makePage("Notificaciones"))
  );

  root.addChild(new MenuNode("Cerrar sesión", "/salir", makePage("Sesión cerrada")));

  return tree;
}

const menuTree = buildMenuTree();

// ---- Ítem del menú (se llama a sí mismo para pintar los hijos) ----
function MenuItem({ node, current, onSelect }) {
  const [open, setOpen] = useState(true);
  const hasChildren = node.children.length > 0;

  const handleClick = () => {
    onSelect(node.link);
    if (hasChildren) setOpen(!open);
  };

  return (
    <li>
      <button
        className={current === node.link ? "active" : ""}
        onClick={handleClick}
      >
        {node.title}
        {hasChildren ? (open ? " ▲" : " ▼") : ""}
      </button>
      {hasChildren && open && (
        <ul className="submenu">
          {node.children.map((child) => (
            <MenuItem
              key={child.link}
              node={child}
              current={current}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

// ---- App ----
export default function App() {
  const [current, setCurrent] = useState("/inicio");

  // Busca en el árbol el nodo del link actual y usa su componente
  const node = menuTree.findByLink(current);
  const Page = node.component;

  return (
    <div className="layout">
      <nav className="sidebar">
        <ul>
          {menuTree.root.children.map((item) => (
            <MenuItem
              key={item.link}
              node={item}
              current={current}
              onSelect={setCurrent}
            />
          ))}
        </ul>
      </nav>
      <main className="content">
        <p>Link actual: {node.link}</p>
        <Page />
      </main>
    </div>
  );
}

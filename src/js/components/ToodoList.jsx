import React, { useState, useEffect } from "react";

// inicio creando el componente funcional 'ToodoList'
const ToodoList = () => {
  // creo las variables de estado necesarias para este componente
  const [tareas, setTareas] = useState([]); // variable de estado para el listado de tareas, por eso al hook le paso [] vacio
  const [nuevaTarea, setNuevaTarea] = useState(""); // variable de estado para el campo de entrada inicializado ('') vacia

  // Función para obtener las tareas
  const obtenerTareas = () => {
    fetch("https://playground.4geeks.com/todo/todos/NuevoRozpide")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Error al obtener las tareas");
        }
        return resp.json();
      })
      .then((data) => setTareas(data))
      .catch((error) => console.log(error));
  };

  // Función para añadir una nueva tarea
  const añadirTareas = () => {
    if (nuevaTarea !== "") {
      // verifica que no esta vacio ''.
      const nueva = { label: nuevaTarea, done: false };
      fetch("https://playground.4geeks.com/todo/todos/NuevoRozpide", {
        method: "POST",
        body: JSON.stringify(nueva),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => {
          if (!resp.ok) {
            throw new Error("Error al añadir la tarea");
          }
          return resp.json();
        })
        .then((data) => {
          setTareas([...tareas, data]); // añade data a tareas por medio del hook setTareas y ...tareas
          setNuevaTarea(""); // por ultimo limpia el campo del input
        })
        .catch((error) => console.log(error));
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = (index) => {
    const tareaAEliminar = tareas[index];
    console.log("Tarea a eliminar: ",tareaAEliminar)
    fetch(`https://playground.4geeks.com/todo/todos/NuevoRozpide/`+ tareaAEliminar, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Error al eliminar la tarea");
        }
        return resp.json();
      })
      .then((data) => {
        const actualizarTareas = tareas.filter((_, i) => i !== index);
        setTareas(actualizarTareas);
      })
      .catch((error) => console.log(error));
  };

  // Obtener las tareas al cargar el componente
  useEffect(() => {
    obtenerTareas();
  }, []);

  // Creamos las funciones flecha necesarias para realizar todas las acciones del ToodoList
  // 1º En esta funcion, estoy llamando a setNuevaTarea, que es una función del hook useState de React. El valor que paso a setNuevaTarea es e.target.value. 'e' es el evento que se desencadena cuando hay una entrada en el campo del input, target es el elemento que dispara el evento (en este caso, el input) y value es el valor actual de ese input.
  const manejarEntrada = (e) => {
    setNuevaTarea(e.target.value);
  };

  // Aquí estoy declarando una función de flecha llamada manejarTecla que toma un parámetro e(evento)
  const manejarTecla = (e) => {
    if (e.key === "Enter") {
      // Esta línea evalúa si la tecla presionada es la tecla 'Enter'. 'e' es el evento del teclado que se dispara, y 'key' es una propiedad del evento que contiene el valor de la tecla presionada. Si la tecla presionada es 'Enter', la condición se evalúa como verdadera.
      añadirTareas(); // llama a la funcion añadirTareas si se presiona 'Enter'
    }
  };

  return (
    <>
      <h1 className="titulo">todos</h1>
      <div className="entrada-tarea">
        <input
          type="text"
          className="input-tarea"
          value={nuevaTarea}
          onChange={manejarEntrada}
          onKeyDown={manejarTecla}
          placeholder="What needs to be done?"
        />
      </div>
      <ul className="lista-tareas">
        {tareas.map((tarea, index) => (
          <li
            key={index}
            className={`tarea-item ${index > 0 ? "tarea-apilada" : ""}`}>
            {tarea.label}
            <button
              onClick={() => eliminarTarea(index)}
              className="boton-eliminar oculto">
              <span className="material-symbols-outlined">close</span>{/*este es el que sustituye al boton por una X */}
            </button>
          </li>
        ))}
        <p className="items-restantes">{tareas.length} item(s) left</p>
      </ul>
      <div className="folio"></div>
      <div className="folio-2"></div>
    </>
  );
};

export default ToodoList;

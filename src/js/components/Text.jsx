import React, { useState, useEffect } from "react";

// inicio creando el componente funcional 'Text'
const Text = () => {
    // creo las variables de estado necesarias para este componente
    const [tareas, setTareas] = useState([]); // variable de estado para el listado de tareas, por eso al hook le paso [] vacio
    const [nuevaTarea, setNuevaTarea] = useState(''); // variable de estado para el campo de entrada inicializado ('') vacia

    // Función para obtener las tareas
    const obtenerTareas = () => {
        fetch('https://playground.4geeks.com/todo/todos/users/NuevoRozpide')
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error al obtener las tareas');
                }
                return resp.json();
            })
            .then(data => setTareas(data))
            .catch(error => console.log(error));
    };

    // Función para añadir una nueva tarea
    const añadirTareas = () => {
        if (nuevaTarea !== '') {
            const nueva = { label: nuevaTarea, done: false };
            fetch('https://playground.4geeks.com/todo/todos/NuevoRozpide', {
                method: "POST",
                body: JSON.stringify(nueva),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Error al añadir la tarea');
                }
                return resp.json();
            })
            .then(data => {
                setTareas([...tareas, data]);
                setNuevaTarea('');
            })
            .catch(error => console.log(error));
        }
    };

    // Función para eliminar una tarea
    const eliminarTarea = (index) => {
        const tareaAEliminar = tareas[index];
        return fetch(`https://playground.4geeks.com/todo/todos/${tareaAEliminar.id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json"  
            }
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            return resp.text();
        })
        .then(() => {
            const actualizarTareas = tareas.filter((_, i) => i !== index);
            setTareas(actualizarTareas);
        })
        .catch(error => console.log(error));
    };

    // Función para eliminar todas las tareas con un bucle sin async/await
    const eliminarTodasTareas = () => {
        const promesas = tareas.map((_, i) => eliminarTarea(i));
        Promise.all(promesas)
            .then(() => setTareas([]))
            .catch(error => console.log(error));
    };

    // Obtener las tareas al cargar el componente
    useEffect(() => {
        obtenerTareas();
    }, []);

    // Creamos las funciones flecha necesarias para realizar todas las acciones del Text
    const manejarEntrada = (event) => {
        setNuevaTarea(event.target.value);
    };

    const manejarTecla = (e) => {
        if (e.key === 'Enter') {
            añadirTareas();
        }
    };

    const manejarClicDeEliminar = () => {
        eliminarTodasTareas();
    };

    const manejarClic = () => {
        añadirTareas();
    };

    return (
        <>
            <h1 className="titulo">todos</h1>
            <span>
                <button onClick={manejarClicDeEliminar} className="boton-eliminar-todas-tareas">Eliminar Todas las Tareas</button>
            </span>
            <div className="entrada-tarea">
                <input type="text" className="input-tarea" value={nuevaTarea} onChange={manejarEntrada} onKeyDown={manejarTecla} placeholder="What needs to be done?" />
                
            </div>
            <ul className="lista-tareas">
                {tareas.map((tarea, index) => (
                    <li key={index} className={`tarea-item ${index > 0 ? 'tarea-apilada' : ''}`}>{tarea.label}
                        <button onClick={() => eliminarTarea(index)} className="boton-eliminar oculto">
                            <span className="material-symbols-outlined">close</span>
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

export default Text;

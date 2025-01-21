import React, { useState, useEffect } from "react";

// inicio creando el componente funcional 'TodoList'
const Text = () => {
    // creo las variables de estado necesarias para este componente
    const [tareas, setTareas] = useState([]); // variable de estado para el listado de tareas, por eso al hook le paso [] vacio
    const [nuevaTarea, setNuevaTarea] = useState(''); // variable de estado para el campo de entrada inicializado ('') vacia

    // Función para obtener las tareas
    const obtenerTareas = () => {
        fetch('https://playground.4geeks.com/todo/todos/NuevoRozpide')
            .then(resp => {
                if (!resp.ok) {// si la respuesta no es correcta
                    throw new Error('Error al obtener las tareas');// lanza un error
                }
                return resp.json();// si la respuesta es correcta, devuelve la respuesta en formato json
            })
            .then(data => setTareas(data))// si la respuesta es correcta, actualiza el estado de las tareas con la respuesta
            .catch(error => console.log(error));// si hay un error, lo muestra en la consola
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
                setNuevaTarea(''); // por ultimo limpia el campo del input
            })
            .catch(error => console.log(error));
        }
    };

    // Función para eliminar una tarea
    const eliminarTarea = (tareaAEliminar) => {
        fetch(`https://playground.4geeks.com/todo/todos/${tareaAEliminar.id}`, {// hace una peticion a la url con el id de la tarea a eliminar
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json"  
            }
        })
        .then((resp) => {// si la respuesta es correcta
            if (!resp.ok) {// si la respuesta no es correcta
                throw new Error('Error al eliminar la tarea');// lanza un error
            }
            return resp.text(); // que devuelve la respuesta en formato texto
        })
        .then(() => {// si la respuesta es correcta
            const actualizarTareas = tareas.filter(t => t.id !== tareaAEliminar.id);// crea una variable que almacena las tareas actualizadas
            setTareas(actualizarTareas);// actualiza el listado de tareas
        })
        .catch(error => console.log(error));// si hay un error, lo muestra en la consola
    };

    // Función para eliminar todas las tareas
    
    //hay que implementar aqui la funcion para eliminar todas las tareas

    // Obtener las tareas al cargar el componente
    useEffect(() => {
        obtenerTareas();
    }, []);

    // Creamos las funciones flecha necesarias para realizar todas las acciones del TodoList
    const manejarEntrada = (e) => {
        setNuevaTarea(e.target.value);
    };

    const manejarTecla = (e) => {
        if (e.key === 'Enter') {
            añadirTareas();
        }
    };

    const manejarClic = () => {
        añadirTareas();
    };

    const manejarClicDeEliminar = () => {
        eliminarTodasTareas();
    };

    return (
        <>
            <h1 className="titulo">todos</h1>
            <div className="entrada-tarea">
                <input type="text" className="input-tarea" value={nuevaTarea} onChange={manejarEntrada} onKeyDown={manejarTecla} placeholder="What needs to be done?" />
                <button onClick={manejarClic} className="boton-añadir-tarea">Añadir Tarea</button>
            </div>
            <ul className="lista-tareas">
                {tareas.map((tarea, index) => (
                    <li key={index} className={`tarea-item ${index > 0 ? 'tarea-apilada' : ''}`}>{tarea.label}
                        <button onClick={() => eliminarTarea(tarea)} className="boton-eliminar-tarea">
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </li>
                ))}
                <p className="items-restantes">{tareas.length} item(s) left</p>
            </ul>
            <button onClick={manejarClicDeEliminar} className="boton-eliminar-todas-tareas">Eliminar Todas las Tareas</button>
            <div className="folio"></div>
            <div className="folio-2"></div>
        </>
    );
};

export default Text;



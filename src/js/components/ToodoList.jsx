import React, { useState, useEffect } from "react";

// inicio creando el componente funcional 'ToodoList'
const ToodoList = () => {
    // creo las variables de estado necesarias para este componente
    const [tareas, setTareas] = useState([]); // variable de estado para el listado de tareas, por eso al hook le paso [] vacio
    const [nuevaTarea, setNuevaTarea] = useState(''); // variable de estado para el campo de entrada inicializado ('') vacia

    // Función para obtener las tareas
    const obtenerTareas = () => {
        fetch('https://playground.4geeks.com/todo/todos/users/NuevoRozpide')// hace una peticion a la url, desde postman la url no lleva 'todos'
            .then(resp => {//
                if (!resp.ok) {// si la respuesta no es correcta lanza un error
                    throw new Error('Error al obtener las tareas');// lanza un error
                }
                return resp.json();// si la respuesta es correcta, devuelve la respuesta en formato json
            })//
            .then(data => setTareas(data))// si la respuesta es correcta, llama a la funcion setTareas y le pasa la respuesta en formato json
            .catch(error => console.log(error));// si hay un error, lo muestra en la consola
    };

    // Función para añadir una nueva tarea
    const añadirTareas = () => {// funcion para añadir tareas
        if (nuevaTarea !== '') { // verifica que no esta vacio ''.
            const nueva = { label: nuevaTarea, done: false };// crea un objeto con la tarea y el estado de la tarea
            fetch('https://playground.4geeks.com/todo/todos/NuevoRozpide', {// hace una peticion a la url
                method: "POST",// metodo de la peticion POST para añadir una tarea nueva a la lista de tareas 
                body: JSON.stringify(nueva), // convierte el objeto en formato json
                headers: { 
                    "Content-Type": "application/json" // tipo de contenido que se envia en la peticion /json
                }
            })
            .then(resp => { // si la respuesta es correcta
                if (!resp.ok) {// si la respuesta no es correcta
                    throw new Error('Error al añadir la tarea');// lanza un error
                }
                return resp.json();// si la respuesta es correcta, devuelve la respuesta en formato json
            })
            .then(data => {// si la respuesta es correcta 
                setTareas([...tareas, data]);// añade la nueva tarea al listado de tareas 
                setNuevaTarea(''); // por ultimo limpia el campo del input para que el usuario pueda añadir otra tarea
            })
            
        }
    };

    // Función para eliminar una tarea
    const eliminarTarea = (index) => {
        const tareaAEliminar = tareas[index];
        fetch(`https://playground.4geeks.com/todo/todos/${tareaAEliminar.id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json"  
            }
        })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            return resp.text(); // Cambié .text() a .json() para asegurarnos de que procesamos la respuesta correctamente
        })
        .then(() => {
            const actualizarTareas = tareas.filter((_, i) => i !== index);
            setTareas(actualizarTareas);
        })
        .catch(error => console.log(error));
    };
    
    // Obtener las tareas al cargar el componente
    useEffect(() => {
        obtenerTareas();
    }, []);


    // Creamos las funciones flecha necesarias para realizar todas las acciones del ToodoList
    // 1º En esta funcion, estoy llamando a setNuevaTarea, que es una función del hook useState de React. El valor que paso a setNuevaTarea es e.target.value. 'e' es el evento que se desencadena cuando hay una entrada en el campo del input, target es el elemento que dispara el evento (en este caso, el input) y value es el valor actual de ese input.
    const manejarEntrada = (event) => {// el error estaba en el evento (e) que en manejarTecla estaba igual que en manejarTecla
        setNuevaTarea(event.target.value);
    };

    // Aquí estoy declarando una función de flecha llamada manejarTecla que toma un parámetro e(evento)
    const manejarTecla = (e) => {
        if (e.key === 'Enter') { // Esta línea evalúa si la tecla presionada es la tecla 'Enter'. 'e' es el evento del teclado que se dispara, y 'key' es una propiedad del evento que contiene el valor de la tecla presionada. Si la tecla presionada es 'Enter', la condición se evalúa como verdadera.
            añadirTareas(); // llama a la funcion añadirTareas si se presiona 'Enter'
        }
    };


    return (
        <>
            <h1 className="titulo">todos</h1>
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

export default ToodoList;

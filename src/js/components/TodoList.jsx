import React, { useState, useEffect } from "react";

// inicio creando el componente funcional 'Text'
const TodoList = () => {
    // creo las variables de estado necesarias para este componente
    const [tareas, setTareas] = useState([]); // variable de estado para el listado de tareas inicializado ([] vacio)
    const [nuevaTarea, setNuevaTarea] = useState(''); // variable de estado para el campo de entrada inicializado ('') vacia

    // Función para obtener las tareas
    const obtenerTareas = () => {
        fetch('https://playground.4geeks.com/todo/todos/users/NuevoRozpide')// hace una peticion a la url, desde postman la url no lleva 'todos'
            .then(resp => {// si la respuesta es correcta
                if (!resp.ok) {// si la respuesta no es correcta lanza un error
                    throw new Error('Error al obtener las tareas');// lanza un error
                }
                return resp.json();// si la respuesta es correcta, devuelve la respuesta en formato json
            })
            .then(data => setTareas(data))// si la respuesta es correcta, llama a la funcion setTareas y le pasa la respuesta en formato json
            .catch(error => console.log(error));// si hay un error, lo muestra en la consola
    };

    // Función para añadir una nueva tarea
    const añadirTareas = () => {
        if (nuevaTarea !== '') {// si el campo de entrada no esta vacio
            const nueva = { label: nuevaTarea, done: false };// crea un objeto con la tarea y el estado de la tarea
            fetch('https://playground.4geeks.com/todo/todos/NuevoRozpide', {// hace una peticion a la url
                method: "POST",// metodo de la peticion POST para añadir una tarea nueva a la lista de tareas
                body: JSON.stringify(nueva),// convierte el objeto en formato json
                headers: {
                    "Content-Type": "application/json"// tipo de contenido que se envia en la peticion /json
                }
            })
            .then(resp => {// si la respuesta es correcta
                if (!resp.ok) {
                    throw new Error('Error al añadir la tarea');// si la respuesta no es correcta lanza un error
                }
                return resp.json();// si la respuesta es correcta, devuelve la respuesta en formato json
            })
            .then(data => {
                setTareas([...tareas, data]);// si la respuesta es correcta, llama a la funcion setTareas y le pasa el listado de tareas y la nueva tarea
                setNuevaTarea('');// por ultimo limpia el campo del input para que el usuario pueda añadir otra tarea
            })
            .catch(error => console.log(error));// si hay un error, lo muestra en la consola para que el usuario pueda verlo
        }
    };

    // Función para eliminar una tarea
    const eliminarTarea = (index) => {// funcion para eliminar una tarea
        const tareaAEliminar = tareas[index];
        return fetch(`https://playground.4geeks.com/todo/todos/${tareaAEliminar.id}`, {// hace una peticion a la url
            method: "DELETE",// metodo de la peticion DELETE para eliminar una tarea
            headers: { 
                "Content-Type": "application/json"  
            }
        })
        .then((resp) => {// si la respuesta es correcta
            if (!resp.ok) {
                throw new Error('Error al eliminar la tarea');// si la respuesta no es correcta lanza un error
            }
            return resp.text();// si la respuesta es correcta, devuelve la respuesta en formato texto
        })
        .then(() => {// si la respuesta es correcta
            const actualizarTareas = tareas.filter((_, i) => i !== index);// filtra las tareas y elimina la tarea seleccionada
            setTareas(actualizarTareas);// actualiza el listado de tareas con la tarea eliminada
        })
        .catch(error => console.log(error));
    };

    // Función para eliminar todas las tareas con un bucle
    const eliminarTodasTareas = () => {
        const promesas = tareas.map((_, i) => eliminarTarea(i));// crea un array de promesas con las tareas a eliminar 
        Promise.all(promesas)// ejecuta todas las promesas 
            .then(() => setTareas([]))// si todas las promesas se ejecutan correctamente, limpia el listado de tareas
            .catch(error => console.log(error));// si hay un error, lo muestra en la consola
    };

    // Obtener las tareas al cargar el componente
    useEffect(() => {// hook de efecto para obtener las tareas al cargar el componente
        obtenerTareas();// llama a la funcion obtenerTareas
    }, []);

    // Creamos las funciones flecha necesarias para realizar todas las acciones del Text
    const manejarEntrada = (event) => {// funcion para manejar la entrada del campo de texto
        setNuevaTarea(event.target.value);// actualiza el estado de la nueva tarea con el valor del campo de texto
    };

    const manejarTecla = (e) => {// funcion para manejar la tecla 'Enter' del teclado
        if (e.key === 'Enter') {// si la tecla presionada es 'Enter'
            añadirTareas();// llama a la funcion añadirTareas
        }
    };

    const manejarClicDeEliminar = () => {// funcion para manejar el clic del boton de eliminar todas las tareas
        eliminarTodasTareas();// llama a la funcion eliminarTodasTareas
    };

   

    return (
        <>
            <h1 className="titulo">todos</h1>
            
            <button onClick={manejarClicDeEliminar} className="boton-eliminar-todas-tareas">Eliminar Todas las Tareas</button>
           
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

export default TodoList;

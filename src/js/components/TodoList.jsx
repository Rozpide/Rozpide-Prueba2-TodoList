import React, { useState } from "react";
// inicio creando el componente funcional 'TodoList'
const TodoList = () => {
// creo las variables de estado necesarias para este componente
    const [tareas, setTareas]= useState ([]);// variable de estado para el listado de tareas, por eso al hook le paso [] vacio
    const [nuevaTarea , setNuevaTarea] = useState ('');// variable de estado para el campo de entrada inicializado ('') vacia
// Creamos las funciones flecha necesarias para realizar todas las acciones del TodoList
// 1º En esta funcion, estoy llamando a setNuevaTarea, que es una función del hook useState de React. El valor que paso a setNuevaTarea es e.target.value. 'e' es el evento que se desencadena cuando hay una entrada en el campo del input, target es el elemento que dispara el evento (en este caso, el input) y value es el valor actual de ese input.
    const manejarEntrada = (e) => {
        setNuevaTarea(e.target.value);
    }
// Añado la funcion que se usa para añadir una nueva tarea al TodoList
    const añadirTareas = () => {
        if (nuevaTarea !== ''){// verifica que no esta vacio ''.
            setTareas([...tareas, nuevaTarea]);//aqui uso el propagador(...) que añade la nuevaTarea al final del array
            setNuevaTarea('');// por ultimo limpia el campo del input
        }
    }
// Aquí estoy declarando una función de flecha llamada manejarTecla que toma un parámetro e(evento)
    const manejarTecla = (e) => {
        if (e.key === 'Enter'){// Esta línea evalúa si la tecla presionada es la tecla 'Enter'. 'e' es el evento del teclado que se dispara, y 'key' es una propiedad del evento que contiene el valor de la tecla presionada. Si la tecla presionada es 'Enter', la condición se evalúa como verdadera.
            añadirTareas();// llama a la funcion añadirTareas si se presiona 'Enter'
            
        }
    }
// coloco la funcion para eliminar tareas
    const eliminarTarea = (index)=> {// le paso el index, que queremos eliminar
        // la funcion filter crea un nuevo array con los elementos que cumplen la condición. En este caso, estoy pasando una función de flecha a filter que toma dos parámetros: el primer parámetro _ (que representa el elemento actual del array y no lo utilizamos) e 'i' (que es el índice del elemento actual).
        const actualizarTareas = tareas.filter((_, i) => i !== index);
        setTareas(actualizarTareas);//actualizo el estado de tareas con la lista filtrada
    }


    return (
        <>
            <h1 className="titulo">TodoList</h1>
            <div className="entrada-tarea">
                {/*añado el input para que el usuario introduzca las tareas */}
                <input type="text" className="input-tarea" value={nuevaTarea} onChange={manejarEntrada} onKeyDown={manejarTecla} placeholder="añade tu tarea"/>
            </div>
            <ul className="lista-tareas">
                {/*mapeo la lista para mostrar cada tarea en un 'li' */}
                {tareas.map((tarea, index) => (
                    <li key={index} className={`tarea-item ${index > 0 ? 'tarea-apilada' : ''}`}>{tarea}{/*muestra el texto de la tarea dentro de cada '<li/>' */}
                    {/*boton para eliminar la tarea */}
                        <button onClick={() => eliminarTarea(index)} className="boton-eliminar oculto">
                            <span class="material-symbols-outlined">{/*añado la x de closed con google fonts, para que tenga los angulos iguales */}
                            close
                            </span>
                        </button>
                    </li>         
                ))} 
                <p className="items-restantes">{tareas.length} item(s) left</p>   
            </ul>
            <div className="folio"></div>
            <div className="folio-2"></div>
            
        </>
    )
}

export default TodoList
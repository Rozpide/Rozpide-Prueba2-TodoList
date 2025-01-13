import React, { useState } from "react";

const TodoList = () => {

    const [tareas, setTareas]= useState ([]);
    const [nuevaTarea , setNuevaTarea] = useState ('');

    const manejarEntrada = (e) => {
        setNuevaTarea(e.target.value);
    }

    const añadirTareas = () => {
        if (nuevaTarea !== ''){
            setTareas([...tareas, nuevaTarea]);
            setNuevaTarea('');
        }
    }
    const manejarTecla = (e) => {
        if (e.key === 'Enter'){
            añadirTareas();
            
        }
    }
    const eliminarTarea = (index)=> {
        const actualizarTareas = tareas.filter((_, i) => i !== index);
        setTareas(actualizarTareas);
    }


    return (
        <>
            <h1>TodoList</h1>
            <input type="text" className="input-tarea" value={nuevaTarea} onChange={manejarEntrada} onKeyDown={manejarTecla} placeholder="añade tu tarea"/>
            <ul className="lista-tareas">
                {tareas.map((tarea, index) => (
                    <li key={index} className={`tarea-item ${index > 0 ? 'tarea-apilada' : ''}`}>{tarea}
                    <button onClick={() => eliminarTarea(index)} className="boton-eliminar oculto">
						<span class="material-symbols-outlined">{/*añado la x de closed con google fonts, para que tenga los angulos iguales */}
						close
						</span>
					</button>
                    </li>
                ))}
                
            </ul>
        </>
    )
}

export default TodoList
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
            console.log('se ejecuta bien')
        }
    }


    return (
        <>
            <h1>TodoList</h1>
            <input type="text" className="input-tarea" value={nuevaTarea} onChange={manejarEntrada} onKeyDown={manejarTecla} placeholder="añade tu tarea"/>
        </>
    )
}

export default TodoList
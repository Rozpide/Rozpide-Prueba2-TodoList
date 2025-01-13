import React, { useState } from "react";

const TodoList = () => {

    const [tareas, setTareas]= useState ([]);
    const [nuevaTarea , setNuevaTarea] = useState ('');

    const manejarEntrada = (e) => {
        setNuevaTarea(e.target.value);
    }

    const añadirTarea = () => {
        if (nuevaTarea !== ''){
            setTareas([...tareas, nuevaTarea]);
            setTareas('');
        }
    }


    return (
        <>
            <h1>TodoList</h1>
            <input type="text" className="input-tarea" value={nuevaTarea} onChange={manejarEntrada}  placeholder="añade tu tarea"/>
        </>
    )
}

export default TodoList
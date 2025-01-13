import React, { useState } from "react";

const TodoList = () => {

    const [tareas, setTareas]= useState ([]);
    const [nuevaTarea , setNuevaTarea] = useState ('');

    const agregarTarea = () => {
        setTareas(nuevaTarea)
    }

    return (
        <>
            <h1>TodoList</h1>
            <input type="text" value={nuevaTarea} onChange={(e)=>setTareas(nuevaTarea)} placeholder="añade tu tarea"/>
        </>
    )
}

export default TodoList
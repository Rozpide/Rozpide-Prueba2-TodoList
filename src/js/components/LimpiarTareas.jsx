import React from "react";

const LimpiarTareas = ({ tareas, setTareas }) => {
    const limpiarTareas = () => {
        fetch('https://playground.4geeks.com/todo/todos/NuevoRozpide', {
            method: "DELETE"
        })
        .then(resp => {
            if (!resp.ok) {
                throw new Error('Error al limpiar las tareas');
            }
            return resp.json();
        })
        .then(data => {
            setTareas([]);
        })
        .catch(error => console.log(error));
    };

    return (
        <button onClick={limpiarTareas} className="boton-limpiar">Limpiar Todo</button>
    );
};

export default LimpiarTareas;

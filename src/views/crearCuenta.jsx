import React from 'react'

//importamos los css
import crearCuenta from '../css/crearCuenta.module.css'

// importamos los hooks de navegacion
import { useGoPerfilC } from '../hooks/NavigationFunctions'

const CrearCuenta = () => {

    const goToPerfil = useGoPerfilC();

    return (
        <div>
            <div>
                <h1>Tellix</h1>
            </div>

            <form action="">
                <h1>Crear Cuenta</h1>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <br />
                <button onClick={goToPerfil}>Crear Cuenta</button>
            </form>
        </div>
    )
}

export default CrearCuenta;

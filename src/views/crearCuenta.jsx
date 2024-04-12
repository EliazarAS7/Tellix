import React from 'react'

//importamos los css
import crearCuenta from '../css/crearCuenta.module.css'

// importamos los hooks de navegacion
import { useGoPerfilC } from '../hooks/NavigationFunctions'

const CrearCuenta = () => {

    const goToPerfil = useGoPerfilC();

    return (
        <div>
            <div className={crearCuenta.logo}>
                <h1>Tellix</h1>
            </div>

            <div className={crearCuenta.formulario}>
                <form action="">
                    <h1 className={crearCuenta.titulo}>Crear Cuenta</h1>
                    <input className={crearCuenta.input} type="text" value='Email'/>
                    <br />
                    <input className={crearCuenta.input} type="text" value='Numero de teléfono'/>
                    <br />
                    <input className={crearCuenta.input} type="text" value='Constraseña'/>
                    <br />
                    <input className={crearCuenta.input} type="text" value='Confirmar constraseña'/>
                    <br />
                    <button className={crearCuenta.button} onClick={goToPerfil}>Crear Cuenta</button>
                </form>
            </div>
        </div>
    )
}

export default CrearCuenta;

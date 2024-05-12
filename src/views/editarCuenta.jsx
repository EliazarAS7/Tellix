import React from 'react'

import { useGoPreload } from '../hooks/NavigationFunctions'

import editarCuenta from '../css/editarCuenta.module.css'

const EditarCuenta = () => {

    const goToPreload = useGoPreload(); 

    return (
        <div>
            <div className={editarCuenta.logo}>
                <h1>Tellix</h1>
            </div>
            <div className={editarCuenta.formulario}>
                <form action="">
                    <h1 className={editarCuenta.titulo}>Modificar Cuenta</h1>
                    <input className={editarCuenta.input} type="text" value='Nombre' />
                    <br />
                    <input className={editarCuenta.input} type="text" value='Correo' />
                    <br />
                    <input className={editarCuenta.input} type="text" value='Constraseña' />
                    <br />
                    <input className={editarCuenta.input} type="text" value='Confirmar constraseña' />
                    <br />
                    <div>
                        <button className={editarCuenta.button} onClick={goToPreload}>Confirmar Cambios</button>
                        <button className={editarCuenta.button} onClick={goToPreload}>Cancelar Subcripcion</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarCuenta;

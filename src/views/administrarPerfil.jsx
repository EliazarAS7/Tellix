import React from 'react'
import { Link } from 'react-router-dom'

import administrarPerfil from '../css/administrarPerfil.module.css'

import fotoPerfil from '../img/fotoPerfil/foto2.png'

const AdministrarPerfil = () => {
    return (
        <div>
            <div className={administrarPerfil.logo}>
                <h1>Tellix</h1>
            </div>
            <div className={administrarPerfil.formulario}>
                <form action="">
                    <h1 className={administrarPerfil.titulo}>Administar Perfil</h1>
                    <input className={administrarPerfil.input} type="text" value='Nombre' />
                    <button className={administrarPerfil.fotos}></button>
                    <br />
                    <div>
                        <button className={administrarPerfil.button}>Guardar</button>
                        <button className={administrarPerfil.button1}>Cancelar</button>
                        <button className={administrarPerfil.button1}>Eliminar Perfil</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdministrarPerfil

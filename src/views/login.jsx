import React from 'react'
import { Link } from 'react-router-dom'

//importamos los css
import login from '../css/login.module.css'

// importamos los hooks de navegacion
import { useGoPerfilL } from '../hooks/NavigationFunctions'

const Login = () => {

    const goToPerfil = useGoPerfilL();

    return (
        <div>
            <div className={login.logo}>
                <h1>Tellix</h1>
            </div>
            <div className={login.formulario}>
                <form action="">
                    <h1 className={login.iniciarSesion}>Iniciar Sesión</h1>
                    <input className={login.input} type="text" value='Email o Numero de Teléfono'/>
                    <br />
                    <input className={login.input} type="text" value='Constraseña'/>
                    <br />
                    <br />
                    <button className={login.button} onClick={goToPerfil}>Iniciar Sesión</button>
                    <br />
                    <Link to='/crearCuenta'>
                        <p>¿No tienes cuenta? Hazte una ahora</p>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Login

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
            <div>
                <h1>tellix</h1>
            </div>

            <form action="">
                <h1>Iniciar Sesión</h1>
                <input type="text" />
                <input type="text" />
                <br />
                <button onClick={goToPerfil}>Iniciar Sesión</button>
                <br />
                <Link to='/crearCuenta'>
                    <p>¿No tienes cuenta? Hazte una ahora</p>
                </Link>
            </form>
        </div>
    )
}

export default Login

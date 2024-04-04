import React from 'react'

//importamos los css
import Login from '../css/login.module.css'

const login = () => {
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
                <button>Iniciar Sesión</button>
                <br />
                <p>¿No tienes cuenta? Hazte una ahora</p>
            </form>
        </div>
    )
}

export default login

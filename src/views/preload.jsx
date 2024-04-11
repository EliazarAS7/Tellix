import React from 'react';

// importamos las hook de navegacion
import { useGoLogin, useGoCrearCuenta } from '../hooks/NavigationFunctions';

const Preload = () => {

    const goToLogin = useGoLogin();
    const goToCrearCuenta = useGoCrearCuenta();

    return (
        <div>
            <div className='barraNav'>
                <div>
                    <h1>Tellix</h1>
                </div>
                <div>
                    <button onClick={goToLogin}>Iniciar Sesión</button>
                    <button onClick={goToCrearCuenta}>Suscribete Ya</button>
                </div>
            </div>
            <div className='contenido'></div>
        </div>
    )
}

export default Preload;

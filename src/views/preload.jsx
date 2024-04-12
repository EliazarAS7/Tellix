import React from 'react';

import styles from '../css/preload.module.css'

// importamos las hook de navegacion
import { useGoLogin, useGoCrearCuenta } from '../hooks/NavigationFunctions';

const Preload = () => {

    const goToLogin = useGoLogin();
    const goToCrearCuenta = useGoCrearCuenta();

    return (
        <div>
            <div className={styles.barraNav}>
                <div className={styles.logo}>
                    <h1>Tellix</h1>
                </div>
                <div className={styles.botones}>
                    <button className={styles.botonLogin} onClick={goToLogin}>Iniciar Sesión</button>
                    <button className={styles.botonCrearCuenta} onClick={goToCrearCuenta}>Suscribete Ya</button>
                </div>
            </div>
            <div className='contenido'>

            </div>
        </div>
    )
}

export default Preload;

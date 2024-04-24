import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link>Peliculas</Link>
                    <Link>Series</Link>
                    <Link>Preguntas Frecuentes</Link>
                    <Link>Precios</Link>
                </div>
                <div className={styles.botones}>
                    <button className={styles.botonLogin} onClick={goToLogin}>Iniciar Sesión</button>
                    <button className={styles.botonCrearCuenta} onClick={goToCrearCuenta}>Suscribete Ya</button>
                </div>
            </div>
            <div className={styles.todosContenido}>
                <div className='contenido'>
                    <h1>Grandes Peliculas</h1>
                    <p>Descubre los grandes éxitos, desde lo último de DC y Warner Bros. hasta tus comedias, dramas y clásicos favoritos.</p>
                </div>
                <div className='contenido'>
                    <h1>Las series de las que todos hablan</h1>
                    <p>Encuentra tu nueva obsesión en nuestro creciente catálogo lleno de series adictivas, reality shows y clásicos icónicos de la televisión.</p>
                </div>
                <div className='contenido'>
                    <h1>Lo que todo el mundo se pregunta sobre Tellix</h1>
                    /* Aqui van todas las preguntas con sus bloques */
                </div>
                <div className='contenido'>
                    <h1>Ve todo lo que quieras. Cancela en cualquier momento.</h1>
                    <p>3,33€/Mes</p>
                </div>
            </div>
        </div>
    )
}

export default Preload;

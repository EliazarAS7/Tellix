import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/preload.module.css'

// importamos las hook de navegacion
import { useGoLogin, useGoCrearCuenta } from '../hooks/NavigationFunctions';

//imagenes de las peliculas

import avatar from '../img/fotoPeliculas/Avatar.jpg'
import elNino from '../img/fotoPeliculas/elNiño.jpg'
import aladin from '../img/fotoPeliculas/Aladin.jpg'
import laMonja from '../img/fotoPeliculas/laMonja.jpg'
import frozen from '../img/fotoPeliculas/frozen.jpg'
import venom from '../img/fotoPeliculas/venom.jpg'
import mulan from '../img/fotoPeliculas/mulan.jpg'
import fotoOuter from '../img/fotoPeliculas/outerBanks-removebg-preview.png';

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
                <div className={styles.contenidoPeliculas}>
                    <div className={styles.izquierda}>
                        <h1>Grandes Peliculas</h1>
                        <p>Descubre los grandes éxitos, desde lo último de DC y <br />Warner Bros. hasta tus comedias, dramas y clásicos <br /> favoritos.</p>
                    </div>
                    <div className={styles.derecha}>
                        <img src={avatar} alt="" />
                        <img src={aladin} alt="" />
                        <img src={elNino} alt="" />
                        <img src={laMonja} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>
                <div className={styles.contenidoSeries}>
                    <div className={styles.arriba}>
                        <div className= {styles.letras}>
                            <h1>Las series de las que todos hablan</h1>
                            <p>Encuentra tu nueva obsesión en nuestro creciente <br /> catálogo lleno de series adictivas, reality shows y clásicos <br /> icónicos de la televisión.</p>
                        </div>
                        <div className={styles.imagen}>
                            <img src={fotoOuter} alt="" />
                        </div>
                    </div>
                    <div className={styles.abajo}>
                        <img src={avatar} alt="" />
                        <img src={aladin} alt="" />
                        <img src={elNino} alt="" />
                        <img src={laMonja} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>
                <div className={styles.contenidoPreguntas}>
                    <h1>Lo que todo el mundo se pregunta sobre Tellix</h1>
                    /* Aqui van todas las preguntas con sus bloques */
                </div>
                <div className={styles.contenidoPrecio}>
                    <h1>Ve todo lo que quieras. Cancela en cualquier momento.</h1>
                    <p>3,33€/Mes</p>
                    <button>Suscibete Ya</button>
                </div>
            </div>
        </div>
    )
}

export default Preload;

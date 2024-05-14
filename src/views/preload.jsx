import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../css/preload.module.css'

// importamos las hook de navegacion
import { useGoLogin, useGoCrearCuenta } from '../hooks/NavigationFunctions';

// importamos el header
import Header from '../components/header';

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
        <div className={styles.general}>
            <Header/>
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
                        <div className={styles.letras}>
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
                    <h1 className={styles.h1contenidoPreguntas}>Lo que todo el mundo se pregunta sobre Tellix</h1>
                    <details>
                        <summary>
                            <h1>¿Qué es Tellix?</h1>
                        </summary>
                        <p>Tellix es una experiencia de streaming espectacular que te trae las mejores historias de Warner Bros., HBO, Max, DC, Cartoon Network y mucho más, juntos por primera vez.</p>
                    </details>

                    <details>
                        <summary>
                            <h1>¿Tellix es adecuado para toda la familia?</h1>
                        </summary>
                        <p>Con los perfiles de los niños y los controles parentales personalizados, las familias pueden reír y aprender con personajes como Bugs Bunny, Peppa Pig, Harry Potter y más.</p>
                    </details>

                    <details>
                        <summary>
                            <h1>¿Cuánto cuesta Tellix?</h1>
                        </summary>
                        <p>Tellix tiene un precio mensual de 9,99 €. Puedes ahorrar un 41 % si pagas el precio anual de 69,99 € por adelantado.</p>
                    </details>

                    <details>
                        <summary>
                            <h1>¿En qué dispositivos puedo reproducir Tellix?</h1>
                        </summary>
                        <p>Puedes reproducir Tellix en iPhone y iPad, móviles y tablets Android, Apple TV, Android TV, Chromecast, Samsung TV, LG, Chrome OS, MacOS, Windows PC, PS5, PS4, Xbox Series X|S, y Xbox One. Y más dispositivos en el futuro.</p>
                    </details>

                    <details>
                        <summary>
                            <h1>¿En qué dispositivos puedo reproducir Tellix?</h1>
                        </summary>
                        <p>Puedes reproducir Tellix en iPhone y iPad, móviles y tablets Android, Apple TV, Android TV, Chromecast, Samsung TV, LG, Chrome OS, MacOS, Windows PC, PS5, PS4, Xbox Series X|S, y Xbox One. Y más dispositivos en el futuro.</p>
                    </details>

                    <details>
                        <summary>
                            <h1>¿Cómo inicio sesión en Tellix?</h1>
                        </summary>
                        <p>Si te has suscrito a través de Tellix.com, puedes iniciar sesión con tu email y contraseña.</p>
                    </details>

                    <details>
                        <summary>
                            <h1>¿Cuáles son los títulos más populares de Tellix en España?</h1>
                        </summary>
                        <p>Nuestros títulos más vistos son True Detective: Noche polar, Barbie, Succession, Friends y Juego de Tronos.</p>
                    </details>
                </div>
                <div className={styles.contenidoPrecio}>
                    <h1>Ve todo lo que quieras. Cancela en cualquier momento.</h1>
                    <p><span className={styles.span}>3,33€</span>/Mes</p>
                    <button>Suscibete Ya</button>
                </div>
            </div>
        </div>
    )
}

export default Preload;

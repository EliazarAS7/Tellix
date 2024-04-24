import React from 'react'
import { Link } from 'react-router-dom'

//portada de las peliculas
import avatar from '../img/fotoPeliculas/Avatar.jpg'
import elNino from '../img/fotoPeliculas/elNiño.jpg'
import aladin from '../img/fotoPeliculas/Aladin.jpg'
import laMonja from '../img/fotoPeliculas/laMonja.jpg'
import frozen from '../img/fotoPeliculas/frozen.jpg'
import venom from '../img/fotoPeliculas/venom.jpg'
import mulan from '../img/fotoPeliculas/mulan.jpg'

//importamos los css
import principal from '../css/principal.module.css'

const Principal = () => {
    return (
        <div>
            <div className={principal.barraNav}>
                <h1>Tellix</h1>
                <Link>Peliculas</Link>
                <Link>Series</Link>
                <Link>Preguntas Frecuentes</Link>
                <Link>Precios</Link>
            </div>

            <div className={principal.todasPeliculas}>
                <div className={principal.peliculas}>
                    <h2>Solo en Tellix</h2>
                    <div className={principal.soloTellix}>
                        <img src={laMonja} alt="" />
                        <img src={elNino} alt="" />
                        <img src={aladin} alt="" />
                        <img src={avatar} alt="" />
                        <img src={frozen} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>

                <div className={principal.peliculas}>
                    <h2>Top 10 Mejores Series</h2>
                    <div className={principal.soloTellix}>
                        <img src={laMonja} alt="" />
                        <img src={elNino} alt="" />
                        <img src={aladin} alt="" />
                        <img src={avatar} alt="" />
                        <img src={frozen} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Principal

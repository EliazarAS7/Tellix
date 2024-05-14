import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

//portada de las peliculas
import avatar from '../img/fotoPeliculas/Avatar.jpg'
import elNino from '../img/fotoPeliculas/elNiño.jpg'
import aladin from '../img/fotoPeliculas/Aladin.jpg'
import laMonja from '../img/fotoPeliculas/laMonja.jpg'
import frozen from '../img/fotoPeliculas/frozen.jpg'
import venom from '../img/fotoPeliculas/venom.jpg'
import mulan from '../img/fotoPeliculas/mulan.jpg'
import fotoPerfil from '../img/fotoPerfil/foto2.png';

//importamos los css
import principal from '../css/principal.module.css'

import Header from '../components/header'

const Principal = () => {

    return (
        <div className={principal.general}>
            
            <Header/>
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

                <div className={principal.peliculas}>
                    <h2>Top 10 Mejores Peliculas</h2>
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
                    <h2>Novedades</h2>
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

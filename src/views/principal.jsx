import React from 'react'

//importamos los css
import Principal from '../css/principal.module.css'

const principal = () => {
    return (
        <div>
            <div>
                <h1>Tellix</h1>
                <div>
                    <ul>
                        <li>Inicio</li>
                        <li>Series</li>
                        <li>Peliculas</li>
                        <li>Novedades más vistas</li>
                        <li>Mi lista</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2>Solo en Tellix</h2>
                <div className='soloTellix'>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>

            <div>
                <h2>Top 10 Mejores Series</h2>
                <div className='mejoresSeries'>
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                    <img src="" alt="" />
                </div>
            </div>
        </div>
    )
}

export default principal

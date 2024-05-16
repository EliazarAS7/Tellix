import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Modal, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'; // Importa Modal de react-bootstrap
import Button from 'react-bootstrap/Button'; // Importa Button de react-bootstrap

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

// portadas de las series
import portada1 from '../img/fotoSeries/16438035343981.jpg'
import portada2 from '../img/fotoSeries/5fa5368699b32.jpeg'
import portada3 from '../img/fotoSeries/descarga.jpeg'
import portada4 from '../img/fotoSeries/img_5032.webp'
import portada5 from '../img/fotoSeries/maldicion-hill-house-portada.webp'
import portada6 from '../img/fotoSeries/netflix_vs_hbo-stranger_things-netflix.jpg'

//importamos los css
import principal from '../css/principal.module.css'

import Header from '../components/header'

const movies = [
    { title: 'Avatar', image: avatar },
    { title: 'El Niño', image: elNino },
    { title: 'Aladín', image: aladin },
    { title: 'La Monja', image: laMonja },
    { title: 'Frozen', image: frozen },
    { title: 'Venom', image: venom },
    { title: 'Mulan', image: mulan }
];

const series = [
    { title: 'Avatar', image: portada1 },
    { title: 'El Niño', image: portada2 },
    { title: 'Aladín', image: portada3 },
    { title: 'La Monja', image: portada4 },
    { title: 'La Maldicion de Hill House', image: portada5 },
    { title: 'Stranger Things', image: portada6 },
];

const Principal = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleImageClick = (movie) => {
        setSelectedMovie(movie);
        setModalOpen(true);
    };

    const handleClose = () => setModalOpen(false);

    return (
        <div className={principal.general}>

            <Header />
            <div className={principal.todasPeliculas}>
                <div className={principal.peliculas}>
                    <h2>Solo en Tellix</h2>
                    <div className={principal.soloTellix}>
                        <div className={principal.soloTellix}>
                            {movies.map((movie) => (
                                <div key={movie.title} onClick={() => handleImageClick(movie)}>
                                    <img src={movie.image} alt={movie.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Modal show={modalOpen} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedMovie ? selectedMovie.title : ''}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={selectedMovie ? selectedMovie.image : ''} alt={selectedMovie ? selectedMovie.title : ''} />
                        <p>{selectedMovie ? "Descripción de la película..." : ""}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className={principal.peliculas}>
                    <h2>Top 10 Mejores Series</h2>
                    <div className={principal.soloTellix}>
                        {series.map((series) => (
                            <div key={series.title} onClick={() => handleImageClick(series)}>
                                <img src={series.image} alt={series.title} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={principal.peliculas}>
                    <h2>Top 10 Mejores Peliculas</h2>
                    <div className={principal.soloTellix}>
                        {movies.map((movie) => (
                            <div key={movie.title} onClick={() => handleImageClick(movie)}>
                                <img src={movie.image} alt={movie.title} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={principal.peliculas}>
                    <h2>Novedades</h2>
                    <div className={principal.soloTellix}>
                        {movies.map((movie) => (
                            <div key={movie.title} onClick={() => handleImageClick(movie)}>
                                <img src={movie.image} alt={movie.title} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Principal

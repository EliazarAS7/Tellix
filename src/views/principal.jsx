import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import { Modal, Button } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal"; // Importa Modal de react-bootstrap
import Button from "react-bootstrap/Button"; // Importa Button de react-bootstrap
import axios from "axios";
import { Link } from "react-router-dom";

//portada de las peliculas
import avatar from "../img/fotoPeliculas/Avatar.jpg";
import elNino from "../img/fotoPeliculas/elNiño.jpg";
import aladin from "../img/fotoPeliculas/Aladin.jpg";
import laMonja from "../img/fotoPeliculas/laMonja.jpg";
import frozen from "../img/fotoPeliculas/frozen.jpg";
import venom from "../img/fotoPeliculas/venom.jpg";
import mulan from "../img/fotoPeliculas/mulan.jpg";
import fotoPerfil from "../img/fotoPerfil/foto2.png";

// portadas de las series
import portada1 from "../img/fotoSeries/16438035343981.jpg";
import portada2 from "../img/fotoSeries/5fa5368699b32.jpeg";
import portada3 from "../img/fotoSeries/descarga.jpeg";
import portada4 from "../img/fotoSeries/img_5032.webp";
import portada5 from "../img/fotoSeries/maldicion-hill-house-portada.webp";
import portada6 from "../img/fotoSeries/netflix_vs_hbo-stranger_things-netflix.jpg";

//importamos los css
import principal from "../css/principal.module.css";

import Header from "../components/header";

// Para que sea la API quien da peliculas y series
let url = "http://194.164.170.62:5001/api/tellix/peliculas/";
let response = await axios.get(url);
const movies = response.data;

let url2 = "http://194.164.170.62:5001/api/tellix/series/";
let response2 = await axios.get(url2);
const series = response.data;

const Principal = () => {
  const [showFilm, setShowFilm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleImageClick = (content) => {
    setSelectedMovie(content);
    setShowFilm(true);
  };

  const handleClose = () => setShowFilm(false);

  return (
    <div className={principal.general}>
      <Header />
      <div className={principal.todasPeliculas}>
        <div className={principal.peliculas}>
          <h2>Solo en Tellix</h2>
          <div className={principal.soloTellix}>
            {movies.map((movie) => (
              <div key={movie.title} onClick={() => handleImageClick(movie)}>
                {/* <img src={movie.image} alt={movie.nombre} /> */}
                <img src={avatar} alt={movie.nombre} />
              </div>
            ))}
          </div>
        </div>

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

        {showFilm && (
          <div className={principal.fondoCont}>
            <div className={principal.model}>
              <button className={principal.close} onClick={handleClose}>
                <img src="./icons/close.svg" alt="" />
              </button>
              <section className={principal.contenido}>
                <div className={principal.reproductor}>
                  <h1>{selectedMovie.nombre}</h1>
                  <iframe
                    width="960"
                    height="615"
                    src={selectedMovie.link}
                    title={selectedMovie.nombre}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={principal.datos}>
                  <div></div>
                  <h3>{selectedMovie.descripcion}</h3>
                  <p>Actores: {selectedMovie.actores}</p>
                  <p>Duración: {selectedMovie.duracion} min.</p>
                  <p>Año: {selectedMovie.año}</p>
                  <button className={principal.add}>
                    <img src="./icons/add.svg" alt="" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Principal;

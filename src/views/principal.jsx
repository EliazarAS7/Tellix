import React, { useEffect, useState, useRef } from "react";
import { json, Navigate, useNavigate } from "react-router-dom";
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
import portada5 from "../img/fotoSeries/La Maldicion de Hill House.webp";
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
const series = response2.data;

let contenido = [];
for (let i = 0; i < movies.length; i++) {
  contenido.push(movies[i]);
  contenido.push(series[i]);
}
function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
}

const Principal = () => {
  const [showFilm, setShowFilm] = useState(false);
  const [showSerie, setShowSerie] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [currentIndices, setCurrentIndices] = useState(Array(4).fill(0)); // Array de estados para cada carrusel
  const [selectedOption, setSelectedOption] = useState("");
  const [temporadas, setTemporadas] = useState("");
  const [tempID, setTempID] = useState("");
  const [capitulos, setCapitulos] = useState("");
  const carouselRefs = useRef(Array(4).fill(null));

  function Carousel({ items }) {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const handlePrevClick = () => {
      setCurrentIndex(() => currentIndex - 1);
    };

    const handleNextClick = () => {
      setCurrentIndex(() => currentIndex + 1);
    };

    const carouselStyle = {
      transform: `translateX(-${currentIndex * 20}%)`,
    };

    return (
      <div className={principal.contentCarrusel}>
        <button className={principal.carouselPrev} onClick={handlePrevClick}>
          &#10094;
        </button>
        <div className={principal.carrusel}>
          <div
            className={principal.soloTellix}
            style={carouselStyle}
            ref={carouselRef}
          >
            {items.map((item) => (
              <div key={"2"} onClick={() => handleImageClick(item)}>
                <img src={avatar} alt={"2"} />
              </div>
            ))}
          </div>
        </div>
        <button className={principal.carouselNext} onClick={handleNextClick}>
          &#10095;
        </button>
      </div>
    );
  }

  const handleCarouselPrevClick = (index) => {
    setCurrentIndices((prevIndices) =>
      prevIndices.map((idx, i) => (i === index ? idx - 1 : idx))
    );
  };

  const handleCarouselNextClick = (index) => {
    setCurrentIndices((prevIndices) =>
      prevIndices.map((idx, i) => (i === index ? idx + 1 : idx))
    );
  };
  const obtenerCapitulos = async () => {
    let urlCap = "http://194.164.170.62:5000/api/tellix/capitulos/";
    const responseCap = await axios.get(urlCap);
    const cont = [];
    console.log(responseCap.data);
    for (let i = 0; i < responseCap.data.length; i++) {
      if (
        responseCap.data[i].temporada.id === sessionStorage.getItem("idTemp")
      ) {
        cont.push(responseCap.data[i]);
      }
      setCapitulos(cont);
    }
  };
  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
    sessionStorage.setItem("idTemp", event.target.value);
    setTempID(event.target.value);
    obtenerCapitulos();
  };

  const handleImageClick = async (content) => {
    setSelectedContent(content);
    if (content.duracion) {
      setShowFilm(true);
    } else {
      obtenerCapitulos();
      localStorage.setItem("imagen", content.imagen);
      const urlTemp = "http://194.164.170.62:5000/api/tellix/temporadas/";
      const responseTemp = await axios.get(urlTemp);
      const cont = [];
      const id = [];
      for (let i = 0; i < responseTemp.data.length; i++) {
        if (responseTemp.data[i].serie.id === content.id) {
          cont.push({
            id: responseTemp.data[i].id,
            nombre: responseTemp.data[i].nombre,
          });
        }
      }
      setTemporadas(cont);
      setTempID(id);
      setShowSerie(true);
    }
  };

  const handleClose = () => {
    setShowFilm(false);
    setShowSerie(false);
  };
  useEffect(() => {
    // Actualizar el componente cuando `temporadas` cambie
  }, [temporadas]);
  const changeFilm = async () => {
    let idPerfil = getCookie("perfil");
    let url =
      "http://194.164.170.62:5001/api/tellix/perfiles/watchList/change/film?perfilID=" +
      idPerfil +
      "&peliculaID=" +
      selectedContent.id;

    let response = await axios.post(url);
  };

  const changeSerie = async () => {
    let idPerfil = getCookie("perfil");
    let url =
      "http://194.164.170.62:5001/api/tellix/perfiles/watchList/change/serie?perfilID=" +
      idPerfil +
      "&serieID=" +
      selectedContent.id;

    let response = await axios.post(url);
  };

  return (
    <div className={principal.general}>
      <Header />
      <div className={principal.todasPeliculas}>
        <div className={principal.peliculas}>
          <h2>Solo en Tellix</h2>
          <Carousel items={movies} currentIndex={currentIndices[0]} />
        </div>

        <div className={principal.peliculas}>
          <h2>Top 10 Mejores Series</h2>
          <Carousel items={series} currentIndex={currentIndices[1]} />
        </div>

        <div className={principal.peliculas}>
          <h2>Top 10 Mejores Peliculas</h2>
          <Carousel items={movies} currentIndex={currentIndices[2]} />
        </div>

        <div className={principal.peliculas}>
          <h2>Novedades</h2>
          <Carousel items={contenido} currentIndex={currentIndices[1]} />
        </div>

        {showFilm && (
          <div className={principal.fondoCont}>
            <div className={principal.model}>
              <button className={principal.close} onClick={handleClose}>
                <img src="./icons/close.svg" alt="" />
              </button>
              <section className={principal.contenido}>
                <div className={principal.reproductor}>
                  <h1>{selectedContent.nombre}</h1>
                  <iframe
                    width="960"
                    height="615"
                    src={selectedContent.link}
                    title={selectedContent.nombre}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className={principal.datos}>
                  <h3>{selectedContent.descripcion}</h3>
                  <p>Actores: {selectedContent.actores}</p>
                  <p>Duración: {selectedContent.duracion} min.</p>
                  <p>Año: {selectedContent.año}</p>
                  <button className={principal.add} onClick={changeFilm}>
                    <img src="./icons/add.svg" alt="" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
        {showSerie && (
          <div className={principal.fondoCont}>
            <div className={principal.model}>
              <button className={principal.close} onClick={handleClose}>
                <img src="./icons/close.svg" alt="" />
              </button>
              <section className={principal.contenido}>
                <div className={principal.datos}>
                  <h1>{selectedContent.nombre}</h1>
                  <div></div>
                  <h3>{selectedContent.descripcion}</h3>
                  <p>Actores: {selectedContent.actores}</p>
                  <p>Año: {selectedContent.año}</p>
                  <div>
                    <button className={principal.add} onClick={changeSerie}>
                      <img src="./icons/add.svg" alt="" />
                    </button>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      {temporadas.map((temporada) => (
                        <option key={temporada.id} value={temporada.id}>
                          {temporada.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {true && (
                  <div>
                    {capitulos.map((cap) => (
                      <div>
                        <img
                          src={`./img/fotoSerie/${localStorage.getItem(
                            "imagen"
                          )}.png`}
                        ></img>
                        <h2>{cap.nombre}</h2>
                        <p>{cap.duracion}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Principal;

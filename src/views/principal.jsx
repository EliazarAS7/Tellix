import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { json, Navigate, useNavigate } from 'react-router-dom';
// import { Modal, Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'; // Importa Modal de react-bootstrap
import Button from 'react-bootstrap/Button'; // Importa Button de react-bootstrap
import axios from 'axios';
import { Link } from 'react-router-dom';

//importamos los css
import principal from '../css/principal.module.css';

import Header from '../components/header';
// Para que sea la API quien da peliculas y series
let url = 'http://127.0.0.1:5000/api/tellix/peliculas/';
let response = await axios.get(url);
const movies = response.data;
const movies3 = [];
const movies4 = [];
const series3 = [];
console.log(movies[0]);
console.log(movies[0].categorias[0]);
console.log(movies[0].categorias[0].id);
for (let i = 0; i < movies.length; i++) {
  for (let j = 0; j < movies[i].categorias.length; j++) {
    if (movies[i].categorias[j].id == 1) {
      movies3.push(movies[i]);
    } else if (movies[i].categorias[j].id == 2) {
      movies4.push(movies[i]);
    } else if (movies[i].categorias[j].id == 11) {
      series3.push(movies[i]);
    }
  }
}

let url2 = 'http://127.0.0.1:5000/api/tellix/series/';
let response2 = await axios.get(url2);
const series = response2.data;
const series2 = [];
for (let i = 0; i < series.length; i++) {
  for (let j = 0; j < series[i].categorias.length; j++) {
    if (series[i].categorias[j].id == 6) {
      series2.push(series[i]);
    }
  }
}

let contenido = [];
for (let i = 0; i < series.length; i++) {
  contenido.push(movies[i]);
  contenido.push(series[i]);
}
for (let i = contenido.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [contenido[i], contenido[j]] = [contenido[j], contenido[i]];
}

let contenido2 = [];
for (let i = 3; i < 17; i++) {
  contenido2.push(movies[i + 30]);
  contenido2.push(series[i]);
}

for (let i = contenido2.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [contenido2[i], contenido2[j]] = [contenido2[j], contenido2[i]];
}

function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(';').shift();
}

const Principal = () => {
  const [showFilm, setShowFilm] = useState(false);
  const [showSerie, setShowSerie] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedContentView, setSelectedContentView] = useState(null);
  const [currentIndices, setCurrentIndices] = useState(Array(8).fill(0)); // Array de estados para cada carrusel
  const [selectedOption, setSelectedOption] = useState('');
  const [temporadas, setTemporadas] = useState('');
  const [capitulos, setCapitulos] = useState('');
  const [btn, setBtn] = useState('add');
  const [nombre, setNombre] = useState('');
  const [search, setSearch] = useState(false);
  const [searchContent, setSearchContent] = useState(false);
  const [carrousel, setCarrousel] = useState(true);
  const carouselRefs = useRef(Array(8).fill(null));
  const [content, setContent] = useState([]);
  const [showCaps, setShowCaps] = useState(false);

  const changeSearch = () => {
    if (search) {
      setSearch(false);
      setSearchContent(false);
      setCarrousel(true);
      setNombre('');
    } else {
      setSearch(true);
    }
  };

  const handleChangeNombre = async (event) => {
    setCarrousel(false);
    let nom = event.target.value;
    setNombre(nom);
    setSearchContent(true);
    const con = [];

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].nombre.toLowerCase().includes(nom.toLowerCase())) {
        con.push(movies[i]);
      }
    }

    for (let i = 0; i < series.length; i++) {
      if (series[i].nombre.toLowerCase().includes(nom.toLowerCase())) {
        con.push(series[i]);
      }
    }

    for (let i = con.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [con[i], con[j]] = [con[j], con[i]];
    }

    setContent(con);
    asignarContenido(con);
  };

  const asignarContenido = (con) => {
    setContent(con);
  };
  const obtenerCapitulos = async () => {
    let urlCap = 'http://127.0.0.1:5000/api/tellix/capitulos/';
    const responseCap = await axios.get(urlCap);
    const cont = [];
    for (let i = 0; i < responseCap.data.length; i++) {
      if (
        responseCap.data[i].temporada.id == sessionStorage.getItem('idTemp')
      ) {
        cont.push(responseCap.data[i]);
      }
    }
    setCapitulos(cont);
    setShowCaps(true);
  };

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
              <div key={item.id} onClick={() => handleImageClick(item)}>
                <img src={'./img/foto' + item.imagen} alt={item.nombre} />
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

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
    sessionStorage.setItem('idTemp', event.target.value);
    obtenerCapitulos();
    setShowSerie(true);
  };

  const handleImageClick = async (content) => {
    setShowContent(false);
    setSelectedContent(content);
    if (content.duracion) {
      setShowFilm(true);
      const pelis = localStorage.getItem('peliculas');
      if (pelis.includes(content.id)) {
        setBtn('check');
      } else {
        setBtn('add');
      }
    } else {
      obtenerCapitulos();
      localStorage.setItem('imagen', content.imagen);
      const urlTemp = 'http://127.0.0.1:5000/api/tellix/temporadas/';
      const responseTemp = await axios.get(urlTemp);
      const cont = [];
      const serie = localStorage.getItem('series');

      for (let i = 0; i < responseTemp.data.length; i++) {
        if (responseTemp.data[i].serie.id === content.id) {
          cont.push({
            id: responseTemp.data[i].id,
            nombre: responseTemp.data[i].nombre,
          });
        }
      }

      if (serie.includes(content.id)) {
        setBtn('check');
      } else {
        setBtn('add');
      }

      sessionStorage.setItem('idTemp', cont[0].id);
      setTemporadas(cont);
      setShowSerie(true);
      obtenerCapitulos();
    }
  };

  const handleClose = () => {
    setShowFilm(false);
    setShowSerie(false);
    sessionStorage.setItem('idTemp', null);
  };
  const handleCloseCont = () => {
    setShowContent(false);
    if (sessionStorage.getItem('contenido') === 'serie') {
      setShowSerie(true);
    } else {
      setShowFilm(true);
    }
  };

  const viewContent = (content) => {
    if (showSerie) {
      sessionStorage.setItem('contenido', 'serie');
    } else if (showFilm) {
      sessionStorage.setItem('contenido', 'pelicula');
    }
    setShowSerie(false);
    setShowFilm(false);
    setShowContent(true);
    setSelectedContentView(content);
  };

  useEffect(() => {}, [temporadas]);

  const changeFilm = async () => {
    let idPerfil = getCookie('perfil');
    let url =
      'http://127.0.0.1:5000/api/tellix/perfiles/watchList/change/film?perfilID=' +
      idPerfil +
      '&peliculaID=' +
      selectedContent.id;

    let response = await axios.post(url);
    if (btn === 'add') {
      setBtn('check');
    } else {
      setBtn('add');
    }
  };

  const changeSerie = async () => {
    let idPerfil = getCookie('perfil');
    let url =
      'http://127.0.0.1:5000/api/tellix/perfiles/watchList/change/serie?perfilID=' +
      idPerfil +
      '&serieID=' +
      selectedContent.id;

    let response = await axios.post(url);
    if (btn === 'add') {
      setBtn('check');
    } else {
      setBtn('add');
    }
  };

  useEffect(() => {
    const addContent = async () => {
      const baseUrl =
        'http://127.0.0.1:5000/api/tellix/perfiles/watchList/series?perfilID=' +
        getCookie('perfil');
      const baseUrl2 =
        'http://127.0.0.1:5000/api/tellix/perfiles/watchList/films?perfilID=' +
        getCookie('perfil');
      let response = await axios.get(baseUrl);
      let response2 = await axios.get(baseUrl2);
      const idSeries = [];
      for (let i = 0; i < response.data.length; i++) {
        idSeries.push(response.data[i].id);
      }
      const idPeliculas = [];
      for (let i = 0; i < response2.data.length; i++) {
        idPeliculas.push(response2.data[i].id);
      }
      localStorage.setItem('series', idSeries);
      localStorage.setItem('peliculas', idPeliculas);
    };

    addContent();
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const cookieSesion = getCookie('session');
    if (!cookieSesion) {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <div className={principal.general}>
      <Header />
      <div className={principal.search}>
        <div className={principal.searchSVG}>
          <img src="./icons/search.svg" alt="" onClick={changeSearch} />
          {search && (
            <input
              className={principal.inputSearch}
              type="text"
              value={nombre}
              placeholder="Buscar"
              onChange={handleChangeNombre}
            />
          )}
        </div>
        {searchContent && (
          <div className={principal.searchContent}>
            {content.map((cont) => (
              <div key={''} onClick={() => handleImageClick(cont)}>
                <img
                  src={'./img/foto' + cont.imagen}
                  alt={''}
                  className={principal.searchImg}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {carrousel && (
        <div className={principal.todasPeliculas}>
          <div className={principal.peliculas}>
            <h2>Solo en Tellix</h2>
            <Carousel items={contenido2} currentIndex={currentIndices[0]} />
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
            <Carousel items={contenido} currentIndex={currentIndices[3]} />
          </div>

          <div className={principal.peliculas}>
            <h2>Peliculas de acción</h2>
            <Carousel items={movies3} currentIndex={currentIndices[4]} />
          </div>

          <div className={principal.peliculas}>
            <h2>Series de terror</h2>
            <Carousel items={series2} currentIndex={currentIndices[5]} />
          </div>

          <div className={principal.peliculas}>
            <h2>Peliculas de comedia</h2>
            <Carousel items={movies4} currentIndex={currentIndices[6]} />
          </div>

          <div className={principal.peliculas}>
            <h2>Peliculas infantiles</h2>
            <Carousel items={series3} currentIndex={currentIndices[7]} />
          </div>
        </div>
      )}

      {showFilm && (
        <div className={principal.fondoCont}>
          <div className={principal.model}>
            <button className={principal.close} onClick={handleClose}>
              <img src="./icons/close.svg" alt="" />
            </button>
            <section className={principal.contenido}>
              <div className={principal.reproductor}>
                <h1>{selectedContent.nombre}</h1>
                <button
                  className={principal.iframeBtn}
                  onClick={() => {
                    viewContent(selectedContent);
                  }}
                  value={selectedContent.id}
                >
                  <img
                    src="./icons/play.png"
                    className={principal.iframe2}
                  ></img>
                  <img
                    src={'./img/foto' + selectedContent.imagen}
                    className={principal.iframe}
                  ></img>
                </button>
              </div>
              <div className={principal.datos}>
                <h3>{selectedContent.descripcion}</h3>
                <p>Actores: {selectedContent.actores}</p>
                <p>Duración: {selectedContent.duracion} min.</p>
                <p>Año: {selectedContent.año}</p>
                <button className={principal.add} onClick={changeFilm}>
                  <img src={`./icons/${btn}.svg`} alt="" />
                </button>
              </div>
            </section>
          </div>
        </div>
      )}
      {showSerie && (
        <div className={principal.fondoContSerie}>
          <div className={principal.modelSerie}>
            <button className={principal.closeSeries} onClick={handleClose}>
              <img src="./icons/close.svg" alt="" />
            </button>
            <section className={principal.contenidoSeries}>
              <div className={principal.datos}>
                <h1>{selectedContent.nombre}</h1>
                <div></div>
                <h3>{selectedContent.descripcion}</h3>
                <p>Actores: {selectedContent.actores}</p>
                <p>Año: {selectedContent.año}</p>
                <div className={principal.selectBtn}>
                  <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className={principal.select}
                  >
                    {temporadas.map((temporada) => (
                      <option key={temporada.id} value={temporada.id}>
                        {temporada.nombre}
                      </option>
                    ))}
                  </select>
                  <button className={principal.add} onClick={changeSerie}>
                    <img src={`./icons/${btn}.svg`} alt="" />
                  </button>
                </div>
              </div>
              {showCaps && (
                <div className={principal.capitulos}>
                  {capitulos.map((cap) => (
                    <button
                      className={principal.linea}
                      onClick={() => {
                        viewContent(cap);
                      }}
                    >
                      <div className={principal.datosCap}>
                        <img
                          src={`./img/foto${localStorage.getItem('imagen')}`}
                        ></img>
                        <div className={principal.datosCapLetter}>
                          <h2>{cap.nombre}</h2>
                          <div className={principal.datosCapDatos}>
                            <p>{cap.descripcion}</p>
                            <p>Duración: {cap.duracion}min.</p>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      )}
      {showContent && (
        <div className={principal.contenidoPopup}>
          <button className={principal.closeSeries} onClick={handleCloseCont}>
            <img src="./icons/close.svg" alt="" />
          </button>
          <iframe
            src={selectedContentView.link}
            title={selectedContentView.nombre}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Principal;

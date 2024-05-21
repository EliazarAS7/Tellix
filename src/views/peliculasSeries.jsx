import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import style from "../css/peliculasSeries.module.css";

import Header from "../components/header";

const PeliculasSeries = () => {
  const [showFilm, setShowFilm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [showSerie, setShowSerie] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedContentView, setSelectedContentView] = useState(null); // Array de estados para cada carrusel
  const [selectedOption, setSelectedOption] = useState("");
  const [temporadas, setTemporadas] = useState("");
  const [capitulos, setCapitulos] = useState("");
  const [btn, setBtn] = useState("add");

  let baseUrl = "";
  let baseUrl2 = "";

  function getCookie(nombre) {
    const valor = `; ${document.cookie}`;
    const partes = valor.split(`; ${nombre}=`);
    if (partes.length === 2) return partes.pop().split(";").shift();
  }

  if (sessionStorage.getItem("tipo") === "pelicula") {
    baseUrl = "http://194.164.169.54:5000/api/tellix/peliculas/paged?page=";
  } else if (sessionStorage.getItem("tipo") === "serie") {
    baseUrl = "http://194.164.169.54:5000/api/tellix/series/paged?page=";
  } else if (sessionStorage.getItem("tipo") === "lista") {
    baseUrl =
      "http://194.164.169.54:5000/api/tellix/perfiles/watchList/films?perfilID=";
    baseUrl2 =
      "http://194.164.169.54:5000/api/tellix/perfiles/watchList/series?perfilID=";
  } else {
    baseUrl =
      "http://194.164.169.54:5000/api/tellix/peliculas/searchCat/paged?catID=" +
      sessionStorage.getItem("tipo");
    baseUrl2 =
      "http://194.164.169.54:5000/api/tellix/series/searchCat/paged?catID=" +
      sessionStorage.getItem("tipo");
  }

  const perfilID = getCookie("perfil");

  const size = "&size=21&sort=id,asc";

  useEffect(() => {
    const fetchMovies = async () => {
      if (sessionStorage.getItem("tipo") === "lista") {
        setTitulo("Mi lista");
        const url = `${baseUrl}${perfilID}`;
        const url2 = `${baseUrl2}${perfilID}`;
        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        const contenido = [];
        for (let i = 0; i < response2.data.length; i++) {
          contenido.push(response2.data[i]);
        }
        for (let i = 0; i < response.data.length; i++) {
          contenido.push(response.data[i]);
        }
        setMovies(contenido);
        setTotalPages(0);
      } else if (
        sessionStorage.getItem("tipo") !== "pelicula" &&
        sessionStorage.getItem("tipo") !== "serie"
      ) {
        const nombre = sessionStorage.getItem("categoria");
        setTitulo(nombre);

        const url = `${baseUrl}&page=${currentPage}${size}`;
        const url2 = `${baseUrl2}&page=${currentPage}${size}`;
        const response = await axios.get(url);
        const response2 = await axios.get(url2);
        const contenido = [];
        for (let i = 0; i < response2.data.content.length; i++) {
          contenido.push(response2.data.content[i]);
        }
        for (let i = 0; i < response.data.content.length; i++) {
          contenido.push(response.data.content[i]);
        }
        setMovies(contenido);
        setTotalPages(0);
      } else {
        if (sessionStorage.getItem("tipo") === "pelicula") {
          setTitulo("Películas");
        } else {
          setTitulo("Series");
        }
        const url = `${baseUrl}${currentPage}${size}`;
        const response = await axios.get(url);
        setMovies(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const obtenerCapitulos = async () => {
    let urlCap = "http://194.164.170.62:5000/api/tellix/capitulos/";
    const responseCap = await axios.get(urlCap);
    const cont = [];
    for (let i = 0; i < responseCap.data.length; i++) {
      if (
        responseCap.data[i].temporada.id == sessionStorage.getItem("idTemp")
      ) {
        cont.push(responseCap.data[i]);
      }
      setCapitulos(cont);
    }
  };

  const handlePageClick = (page) => {
    // Resta 1 al índice para obtener el número correcto de página
    setCurrentPage(page - 1);
  };

  const handleOptionChange = async (event) => {
    setSelectedOption(event.target.value);
    sessionStorage.setItem("idTemp", event.target.value);
    obtenerCapitulos();
    setShowSerie(true);
  };

  const handleImageClick = async (content) => {
    setShowContent(false);
    setSelectedContent(content);
    if (content.duracion) {
      setShowFilm(true);
      const pelis = localStorage.getItem("peliculas");
      if (pelis.includes(content.id)) {
        setBtn("check");
      } else {
        setBtn("add");
      }
    } else {
      obtenerCapitulos();
      localStorage.setItem("imagen", content.imagen);
      const urlTemp = "http://194.164.170.62:5000/api/tellix/temporadas/";
      const responseTemp = await axios.get(urlTemp);
      const cont = [];
      const serie = localStorage.getItem("series");
      for (let i = 0; i < responseTemp.data.length; i++) {
        if (responseTemp.data[i].serie.id === content.id) {
          cont.push({
            id: responseTemp.data[i].id,
            nombre: responseTemp.data[i].nombre,
          });
        }
        if (serie.includes(content.id)) {
          setBtn("check");
        } else {
          setBtn("add");
        }
      }

      sessionStorage.setItem("idTemp", cont[0].id);
      setTemporadas(cont);
      setShowSerie(true);
      obtenerCapitulos();
    }
  };

  const handleClose = () => {
    setShowFilm(false);
    setShowSerie(false);
    sessionStorage.setItem("idTemp", null);
  };
  const handleCloseCont = () => {
    setShowContent(false);
    if (sessionStorage.getItem("contenido") === "serie") {
      setShowSerie(true);
    } else {
      setShowFilm(true);
    }
  };

  const viewContent = (content) => {
    if (showSerie) {
      sessionStorage.setItem("contenido", "serie");
    } else if (showFilm) {
      sessionStorage.setItem("contenido", "pelicula");
    }
    setShowSerie(false);
    setShowFilm(false);
    setShowContent(true);
    setSelectedContentView(content);
  };

  useEffect(() => {}, [temporadas]);

  const changeFilm = async () => {
    let idPerfil = getCookie("perfil");
    let url =
      "http://194.164.169.54:5000/api/tellix/perfiles/watchList/change/film?perfilID=" +
      idPerfil +
      "&peliculaID=" +
      selectedContent.id;

    let response = await axios.post(url);
    if (btn === "add") {
      setBtn("check");
    } else {
      setBtn("add");
    }
  };

  const changeSerie = async () => {
    let idPerfil = getCookie("perfil");
    let url =
      "http://194.164.169.54:5000/api/tellix/perfiles/watchList/change/serie?perfilID=" +
      idPerfil +
      "&serieID=" +
      selectedContent.id;

    let response = await axios.post(url);
    if (btn === "add") {
      setBtn("check");
    } else {
      setBtn("add");
    }
  };

  useEffect(() => {
    const addContent = async () => {
      const baseUrl =
        "http://194.164.169.54:5000/api/tellix/perfiles/watchList/series?perfilID=" +
        getCookie("perfil");
      const baseUrl2 =
        "http://194.164.169.54:5000/api/tellix/perfiles/watchList/films?perfilID=" +
        getCookie("perfil");
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
      localStorage.setItem("series", idSeries);
      localStorage.setItem("peliculas", idPeliculas);
    };

    addContent();
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const cookieSesion = getCookie("session");
    if (!cookieSesion) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Header />
      <div className={style.peliculas}>
        <h2 className={style.titulo}>{titulo}</h2>
        <div className={style.todasPeliculas}>
          {movies.map((movie) => (
            <div key={movie.title} onClick={() => handleImageClick(movie)}>
              <img src={movie.link} alt={movie.nombre} />
            </div>
          ))}
        </div>
        {showFilm && (
          <div className={style.fondoCont}>
            <div className={style.model}>
              <button className={style.close} onClick={handleClose}>
                <img src="./icons/close.svg" alt="" />
              </button>
              <section className={style.contenido}>
                <div className={style.reproductor}>
                  <h1>{selectedContent.nombre}</h1>
                  <button
                    className={style.iframeBtn}
                    onClick={() => {
                      viewContent(selectedContent);
                    }}
                    value={selectedContent.id}
                  >
                    <img src="./icons/play.png" className={style.iframe2}></img>
                    <img
                      src="./img/fotoPeliculas/Avatar.jpg"
                      className={style.iframe}
                    ></img>
                  </button>
                </div>
                <div className={style.datos}>
                  <h3>{selectedContent.descripcion}</h3>
                  <p>Actores: {selectedContent.actores}</p>
                  <p>Duración: {selectedContent.duracion} min.</p>
                  <p>Año: {selectedContent.año}</p>
                  <button className={style.add} onClick={changeFilm}>
                    <img src={`./icons/${btn}.svg`} alt="" />
                  </button>
                </div>
              </section>
            </div>
          </div>
        )}
        {showSerie && (
          <div className={style.fondoContSerie}>
            <div className={style.modelSerie}>
              <button className={style.closeSeries} onClick={handleClose}>
                <img src="./icons/close.svg" alt="" />
              </button>
              <section className={style.contenidoSeries}>
                <div className={style.datos}>
                  <h1>{selectedContent.nombre}</h1>
                  <div></div>
                  <h3>{selectedContent.descripcion}</h3>
                  <p>Actores: {selectedContent.actores}</p>
                  <p>Año: {selectedContent.año}</p>
                  <div className={style.selectBtn}>
                    <select
                      value={selectedOption}
                      onChange={handleOptionChange}
                      className={style.select}
                    >
                      {temporadas.map((temporada) => (
                        <option key={temporada.id} value={temporada.id}>
                          {temporada.nombre}
                        </option>
                      ))}
                    </select>
                    <button className={style.add} onClick={changeSerie}>
                      <img src={`./icons/${btn}.svg`} alt="" />
                    </button>
                  </div>
                </div>
                {true && (
                  <div className={style.capitulos}>
                    {capitulos.map((cap) => (
                      <button
                        className={style.linea}
                        onClick={() => {
                          viewContent(cap);
                        }}
                      >
                        <div className={style.datosCap}>
                          <img
                            src={`./img/fotoSerie/${localStorage.getItem(
                              "imagen"
                            )}.png`}
                          ></img>
                          <div className={style.datosCapLetter}>
                            <h2>{cap.nombre}</h2>
                            <div className={style.datosCapDatos}>
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
          <div className={style.contenidoPopup}>
            <button className={style.closeSeries} onClick={handleCloseCont}>
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
        <div className={style.pagination}>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageClick(i + 1)}
              disabled={i === currentPage ? true : false}
              className={currentPage === i ? style.paginaActual : ""}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeliculasSeries;

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import avatar from "../img/fotoPeliculas/Avatar.jpg";

import style from '../css/peliculasSeries.module.css'

import Header from '../components/header';

let url = "http://194.164.170.62:5001/api/tellix/peliculas/";
let response = await axios.get(url);
let movies = response.data;

// let urlPeliculasPaginas = "http://194.164.170.62:5001/api/tellix/peliculas/paged?page=0&size=21&sort=id,asc"
// let response1 = await axios.get(urlPeliculasPaginas);
// let movies1 = response1.data;

const PeliculasSeries = () => {

    let baseUrl = '';
    let baseUrl2 = '';

    function getCookie(nombre) {
        const valor = `; ${document.cookie}`;
        const partes = valor.split(`; ${nombre}=`);
        if (partes.length === 2) return partes.pop().split(";").shift();
    }

    const perfilID = getCookie('perfil');

    if (sessionStorage.getItem('tipo') === 'pelicula') {
        baseUrl = "http://194.164.170.62:5001/api/tellix/peliculas/paged?page=";
    } else if (sessionStorage.getItem('tipo') === 'serie') {
        baseUrl = "http://194.164.170.62:5001/api/tellix/series/paged?page=";
    } else if (sessionStorage.getItem('tipo') === 'lista') {
        baseUrl = "http://194.164.170.62:5001/api/tellix/perfiles/watchList/films?perfilID=";
        baseUrl2 = "http://194.164.170.62:5001/api/tellix/perfiles/watchList/series?perfilID=";
    }

    console.log(baseUrl);

    const [showFilm, setShowFilm] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [movies, setMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const size = "&size=21&sort=id,asc";

    useEffect(() => {
        const fetchMovies = async () => {
            if(sessionStorage.getItem('tipo')==='lista'){
                console.log('1');
                const url = `${baseUrl}${perfilID}`;
                const url2 = `${baseUrl2}${perfilID}`;
                const response = await axios.get(url);
                const response2 = await axios.get(url2);
                console.log(response);
                setMovies(response.data.content);
                setMovies(movies + response2.data.content);
                setTotalPages(response.data.totalPages + response2.data.totalPages);
                console.log(url);
                console.log(url2);
            }else if (sessionStorage.getItem('tipo') !== 'pelicula' || sessionStorage.getItem('tipo') !== 'serie') {
                console.log('2');
                const url = `${baseUrl}${currentPage}${size}`;
                const url2 = `${baseUrl2}${currentPage}${size}`;
                const response = await axios.get(url);
                const response2 = await axios.get(url2);
                setMovies(response.data.content);
                setMovies(movies + response2.data.content);
                setTotalPages(response.data.totalPages + response2.data.totalPages);
                console.log(url);
                console.log(url2);
            } else {
                console.log('3');
                const url = `${baseUrl}${currentPage}${size}`;
                const response = await axios.get(url);
                setMovies(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log(url);
            }
        };

        fetchMovies();
    }, [currentPage]);

    const handleImageClick = (content) => {
        setSelectedMovie(content);
        setShowFilm(true);
    };

    const handleClose = () => setShowFilm(false);

    const handlePageClick = (page) => {
        // Resta 1 al índice para obtener el número correcto de página
        setCurrentPage(page - 1);
    };

    return (
        <div>
            <Header />
            <div className={style.peliculas}>
                <div className={style.todasPeliculas}>
                    {movies.map((movie) => (
                        <div key={movie.title} onClick={() => handleImageClick(movie)}>
                            <img src={avatar} alt={movie.nombre} />
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
                                <div className={style.datos}>
                                    <div></div>
                                    <h3>{selectedMovie.descripcion}</h3>
                                    <p>Actores: {selectedMovie.actores}</p>
                                    <p>Duración: {selectedMovie.duracion} min.</p>
                                    <p>Año: {selectedMovie.año}</p>
                                    <button className={style.add}>
                                        <img src="./icons/add.svg" alt="" />
                                    </button>
                                </div>
                            </section>
                        </div>
                    </div>
                )}

                <div className={style.pagination}>
                    {[...Array(totalPages)].map((_, i) => (
                        <button key={i} onClick={() => handlePageClick(i + 1)} disabled={i === currentPage ? true : false} className={currentPage === i ? style.paginaActual : ''}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PeliculasSeries

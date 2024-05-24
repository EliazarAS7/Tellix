import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../css/preload.module.css";

// importamos las hook de navegacion
import { useGoLogin, useGoCrearCuenta } from "../hooks/NavigationFunctions";

// importamos el header
import Header from "../components/header";

const baseURL="localhost:5000/";

//imagenes de las peliculas

import avatar from "../img/fotoPeliculas/Avatar.jpg";
import elNino from "../img/fotoPeliculas/elNiño.jpg";
import aladin from "../img/fotoPeliculas/Aladin.jpg";
import laMonja from "../img/fotoPeliculas/laMonja.jpg";
import frozen from "../img/fotoPeliculas/frozen.jpg";
import venom from "../img/fotoPeliculas/venom.jpg";
import mulan from "../img/fotoPeliculas/mulan.jpg";
import fotoOuter from "../img/fotoPeliculas/outerBanks-removebg-preview.png";

import serie1 from "../img/fotoSeries/Dark.jpeg";
import serie2 from "../img/fotoSeries/La Maldicion de Hill House.png";
import serie3 from "../img/fotoSeries/One Piece.jpeg";
import serie4 from "../img/fotoSeries/Black Mirror.jpeg";
import serie5 from "../img/fotoSeries/La Casa de Papel.jpeg";
import serie6 from "../img/fotoSeries/Peppa Pig.jpeg";

const Preload = () => {
  const goToLogin = useGoLogin();
  const goToCrearCuenta = useGoCrearCuenta();

  const [openQuestions, setOpenQuestions] = useState({});

  const preguntas = [
    {
      pregunta: "¿Que es Tellix?",
      respuesta:
        "Tellix es una experiencia de streaming espectacular que te trae las mejores historias de Warner Bros., tellix, Max, DC, Cartoon Network y mucho más, juntos por primera vez.",
    },
    {
      pregunta: "¿Tellix es adecuado para toda la familia?",
      respuesta:
        "Con los perfiles de los niños y los controles parentales personalizados, las familias pueden reír y aprender con personajes como Bugs Bunny, Peppa Pig, Harry Potter y más.",
    },
    {
      pregunta: "¿Cuánto cuesta Tellix?",
      respuesta:
        "Tellix tiene un precio mensual de 9,99 €. Puedes ahorrar un 41 % si pagas el precio anual de 69,99 € por adelantado.",
    },
    {
      pregunta: "¿Puedo modificar o cancelar mi suscripción?",
      respuesta:
        "¡Sí! Puedes pasar de la suscripción mensual a la anual y viceversa. También puedes cancelar tu suscripción en cualquier momento.",
    },
    {
      pregunta: "¿En qué dispositivos puedo reproducir Tellix?",
      respuesta:
        "Puedes reproducir Tellix en iPhone y iPad, móviles y tablets Android, Apple TV, Android TV, Chromecast, Samsung TV, LG, Chrome OS, MacOS, Windows PC, PS5, PS4, Xbox Series X|S, y Xbox One. Y más dispositivos en el futuro.",
    },
    {
      pregunta: "¿Cómo inicio sesión en Tellix?",
      respuesta:
        "Si te has suscrito a través de la app de Tellix o tellixMax.com, puedes iniciar sesión con tu email y contraseña.",
    },
    // Puedes agregar más preguntas aquí
  ];

  const toggleQuestion = (key) => {
    setOpenQuestions({
      ...openQuestions,
      [key]: !openQuestions[key],
    });
  };

  return (
    <div className={styles.general}>
      <Header />
      <div className={styles.todosContenido}>
        <div className={styles.contenidoPeliculas}>
          <div className={styles.izquierda}>
            <h1>Grandes Peliculas</h1>
            <p>
              Descubre los grandes éxitos, desde lo último de DC y <br />
              Warner Bros. hasta tus comedias, dramas y clásicos <br />{" "}
              favoritos.
            </p>
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
              <p>
                Encuentra tu nueva obsesión en nuestro creciente <br /> catálogo
                lleno de series adictivas, reality shows y clásicos <br />{" "}
                icónicos de la televisión.
              </p>
            </div>
            <div className={styles.imagen}>
              <img src={fotoOuter} alt="" />
            </div>
          </div>
          <div className={styles.abajo}>
            <img src={serie1} alt="" />
            <img src={serie2} alt="" />
            <img src={serie3} alt="" />
            <img src={serie4} alt="" />
            <img src={serie5} alt="" />
            <img src={serie6} alt="" />
          </div>
        </div>
        <div className={styles.contenidoPreguntas}>
          <h1 className={styles.h1contenidoPreguntas}>
            Lo que todo el mundo se pregunta sobre Tellix
          </h1>
          {preguntas.map((pregunta, index) => (
            <div key={index} className={styles.preguntaContainer}>
              <h2
                className={styles.pregunta}
                onClick={() => toggleQuestion(index)}
              >
                {pregunta.pregunta}
              </h2>
              {openQuestions[index] ? (
                <p className={`${styles.respuesta} ${styles.visible}`}>
                  {pregunta.respuesta}
                </p>
              ) : null}
            </div>
          ))}
        </div>
        <div className={styles.contenidoPrecio}>
          <h1>Ve todo lo que quieras. Cancela en cualquier momento.</h1>
          <p>
            <span className={styles.span}>3,33€</span>/Mes
          </p>
          <button onClick={goToCrearCuenta}>Suscibete Ya</button>
        </div>
      </div>
    </div>
  );
};

export default Preload;

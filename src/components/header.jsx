import React, { useState, useEffect } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import axios from "axios";
import { useGoLogin, useGoCrearCuenta } from "../hooks/NavigationFunctions";

// import fotoPerfil from "../img/fotoPerfil/foto2.png";

import principal from "./header.module.css";
const baseURL="http://localhost:5000/";

function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
}

// Para coger los generos de las peliculas
let urlGenero = baseURL + "api/tellix/categorias/";
let responseGenero = await axios.get(urlGenero);
const generos = responseGenero.data;
console.log(generos);

const Header = () => {
  // para las categorias
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(false);
  const [linkT, setLinkT] = useState("/");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuOptions = [
    "Administrar Perfil",
    "Cambiar Perfil",
    "Editar Cuenta",
    "Cerrar Sesión",
  ];
  const navigate = useNavigate();

  // para navegar
  const goToLogin = useGoLogin();
  const goToCrearCuenta = useGoCrearCuenta();

  // leer la cookie
  const [showRightDiv, setShowRightDiv] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState("./img/fotoPerfil/foto0.png");

  const checkProfile = async () => {
    const urlPerfil =
      baseURL + "api/tellix/perfiles/" + getCookie("perfil");
    let response = await axios.get(urlPerfil);
    if (response.data.imagen === "") {
      setFotoPerfil("./img/fotoPerfil/foto0.png");
    } else {
      if (response.data.imagen.includes("./img/fotoPerfil/")) {
        setFotoPerfil(response.data.imagen);
      } else {
        setFotoPerfil("./img/fotoPerfil/" + response.data.imagen + ".png");
      }
    }
  };

  useEffect(() => {
    const checkSession = () => {
      const sessionCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("session="));
      if (sessionCookie) {
        setLinkT("/principal");
        setShowRightDiv(true);
        checkProfile(); // Muestra el div derecho si la cookie existe
      } else {
        setLinkT("/");
      }
    };

    checkSession(); // Llama a la función al montar el componente
  }, []);

  const handleMenuOptionClick = (option) => {
    switch (option) {
      case "Administrar Perfil":
        navigate("/administrarPerfil");
        break;
      case "Cambiar Perfil":
        navigate("/perfil");
        break;
      case "Editar Cuenta":
        navigate("/editarCuenta");
        break;
      case "Cerrar Sesión":
        document.cookie =
          "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "perfil=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
        break;
      default:
        console.log("Opción no reconocida");
    }
  };

  return (
    <div className={principal.todo}>
      <div className={principal.header}>
        <Link to={linkT} className={principal.tellixBtn}>
          <h1>Tellix</h1>
        </Link>
        {showRightDiv ? (
          <div className={principal.barraNav}>
            <Link
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.setItem("tipo", "pelicula");
                navigate("/PeliculasSeries");
                window.location.reload();
              }}
            >
              Peliculas
            </Link>
            <br />
            <Link
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.setItem("tipo", "serie");
                navigate("/PeliculasSeries");
                window.location.reload();
              }}
            >
              Series
            </Link>
            <br />
            <Link
              className={principal.miLista}
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.setItem("tipo", "lista");
                navigate("/PeliculasSeries");
                window.location.reload();
              }}
            >
              Mi Lista
            </Link>
            <br />
            <Link onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}>
              Categorías
            </Link>
            {categoriasAbiertas && (
              <div className={principal.categoriasMenu}>
                {generos.map((categoria, index) => (
                  <div key={index} className={principal.categoriaItem}>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        sessionStorage.setItem("tipo", categoria.id);
                        sessionStorage.setItem("categoria", categoria.nombre);
                        navigate("/PeliculasSeries");
                        window.location.reload();
                      }}
                    >
                      {categoria.nombre}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
      {showRightDiv ? (
        <div className={principal.derecha}>
          <img src={fotoPerfil} alt="" onClick={() => setMenuOpen(!menuOpen)} />
          <>
            {menuOpen && (
              <div className={principal.menu}>
                <div className={principal.barraNav2}>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem("tipo", "pelicula");
                      navigate("/PeliculasSeries");
                      window.location.reload();
                    }}
                  >
                    Peliculas
                  </Link>
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem("tipo", "serie");
                      navigate("/PeliculasSeries");
                      window.location.reload();
                    }}
                  >
                    Series
                  </Link>
                  <Link
                    className={principal.miLista}
                    onClick={(e) => {
                      e.preventDefault();
                      sessionStorage.setItem("tipo", "lista");
                      navigate("/PeliculasSeries");
                      window.location.reload();
                    }}
                  >
                    Mi Lista
                  </Link>
                  <Link
                    onClick={() => setCategoriasAbiertas(!categoriasAbiertas)}
                  >
                    Categorías
                  </Link>
                </div>
                {menuOptions.map((option, index) => (
                  <div
                    key={index}
                    className={principal.menuOption}
                    onClick={() => handleMenuOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </>
        </div>
      ) : (
        <div className={principal.botones}>
          <button className={principal.botonLogin} onClick={goToLogin}>
            Iniciar Sesión
          </button>
          <button
            className={principal.botonCrearCuenta}
            onClick={goToCrearCuenta}
          >
            Suscribete Ya
          </button>
        </div>
      )}
      {/* <div className={principal.derecha}>
                <img src={fotoPerfil} alt="" onClick={() => setMenuOpen(!menuOpen)} />
                <>
                    {menuOpen && (
                        <div className={principal.menu}>
                            {menuOptions.map((option, index) => (
                                <div key={index} className={principal.menuOption} onClick={() => handleMenuOptionClick(option)}>
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            </div> */}
    </div>
  );
};

export default Header;

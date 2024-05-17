import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Modal, Button } from "react-bootstrap"; 
import { redirect, useNavigate } from "react-router";
import axios from "axios";

//importamos los css
import perfil from "../css/perfil.module.css";

function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
}

function createCookiePerfil(id) {
  document.cookie = `perfil=${id}; path=/; max-age=3600`;
}

const Perfil = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [nuevoNombrePerfil, setNuevoNombrePerfil] = useState("");

  const handleAddPerfilClick = () => {
    setShowPopup(true);
  };
  const handleAddPerfilClick2 = () => {
    setShowPopup(false);
  };
  const handleCrearPerfil = () => {
    setShowPopup(false);
  };

  document.cookie = "perfil=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  const rutaBase = "./img/fotoPerfil/";
  const [perfiles, setPerfiles] = useState([]);
  useEffect(() => {
    const showProfiles = async () => {
      let idUsuario = getCookie("session");
      let url =
        "http://194.164.170.62:5001/api/tellix/perfiles/profiles?usuID=" +
        idUsuario;
      let response = await axios.get(url);
      setPerfiles(response.data);
    };

    showProfiles();
  }, []);

  return (
    <div className={perfil.principal}>
      <h1 className={perfil.titulo}>¿Quién eres? Elige tu perfil</h1>
      <div className={perfil.perfiles}>
        {perfiles.map((perfil) => (
          <Link
            key={perfil.id}
            to="/principal"
            onClick={() => createCookiePerfil(perfil.id)}
          >
            <img
              src={`${rutaBase}${
                perfil.imagen !== "" ? perfil.imagen + ".png" : "foto0.png"
              }`}
              alt=""
            />
            <p>{perfil.nombre}</p>
          </Link>
        ))}
        {perfiles.length < 5 && (
          <Link onClick={handleAddPerfilClick}>
            <img src="./img/fotoPerfil/add.png" alt="" />
            <p>Añadir Perfil</p>
          </Link>
        )}
        {showPopup && (
          <div className={perfil.fondo} onClick={handleAddPerfilClick2}>
            <div className={perfil.popup}>
              <input
                type="text"
                value={nuevoNombrePerfil}
                onChange={(e) => setNuevoNombrePerfil(e.target.value)}
                placeholder="Nombre del perfil"
              />
              <button onClick={handleCrearPerfil}>Crear</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;

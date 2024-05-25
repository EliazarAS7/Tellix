import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//importamos los css
import perfil from "../css/perfil.module.css";

const baseURL="localhost:5000/";

function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
}

function createCookiePerfil(id) {
  document.cookie = `perfil=${id}; path=/; max-age=86400`;
}

const Perfil = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [nuevoNombrePerfil, setNuevoNombrePerfil] = useState("");

  const handleAddPerfilClick = () => {
    setShowPopup(true);
  };
  const handleAddPerfilClick2 = () => {
    setShowPopup(false);
  };
  const handleCrearPerfil = async () => {
    let url =  baseURL + "api/tellix/perfiles/";
    let response = await axios.post(url, {
      nombre: nuevoNombrePerfil,
      imagen: "foto0",
    });
    handleAddPerfil(getCookie("session"), response.data.id);
    createCookiePerfil(response.data.id);
    navigate("/principal");
  };
  const handleAddPerfil = async (usuID, perfilID) => {
    let url =
       baseURL + "api/tellix/usuarios/addPerfil?usuID=" +
      usuID +
      "&perfilID=" +
      perfilID;
    let response = await axios.post(url);
  };
  document.cookie = "perfil=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  const rutaBase = "./img/fotoPerfil/";
  const [perfiles, setPerfiles] = useState([]);
  useEffect(() => {
    const showProfiles = async () => {
      let idUsuario = getCookie("session");
      let url =
         baseURL + "api/tellix/perfiles/profiles?usuID=" +
        idUsuario;
      let response = await axios.get(url);
      setPerfiles(response.data);
    };

    showProfiles();
  }, []);

  useEffect(() => {
    const cookieSesion = getCookie("session");
    if (!cookieSesion) {
      navigate("/login");
    }
  }, [navigate]);
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
      </div>
      {showPopup && (
        <div className={perfil.fondo}>
          <div className={perfil.popup}>
            <input
              type="text"
              value={nuevoNombrePerfil}
              className={perfil.inputName}
              onChange={(e) => setNuevoNombrePerfil(e.target.value)}
              placeholder="Nombre del perfil"
            />
            <section className={perfil.divBtn}>
              <button onClick={handleCrearPerfil} className={perfil.button}>
                Crear
              </button>
              <button
                onClick={handleAddPerfilClick2}
                className={perfil.button1}
              >
                Cancelar
              </button>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;

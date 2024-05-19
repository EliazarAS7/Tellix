import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import administrarPerfil from "../css/administrarPerfil.module.css";

function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
}
const AdministrarPerfil = () => {
  const navigate = useNavigate();
  const imageOptions = [
    { value: "foto0", label: "Imagen 1", src: "./img/fotoPerfil/foto0.png" },
    { value: "foto1", label: "Imagen 1", src: "./img/fotoPerfil/foto1.png" },
    { value: "foto2", label: "Imagen 1", src: "./img/fotoPerfil/foto2.png" },
    { value: "foto3", label: "Imagen 1", src: "./img/fotoPerfil/foto3.png" },
    { value: "foto4", label: "Imagen 1", src: "./img/fotoPerfil/foto4.png" },
    { value: "foto5", label: "Imagen 1", src: "./img/fotoPerfil/foto5.png" },
    { value: "foto6", label: "Imagen 1", src: "./img/fotoPerfil/foto6.png" },
    { value: "foto7", label: "Imagen 1", src: "./img/fotoPerfil/foto7.png" },
  ];

  const handleChange = (event) => {
    setNombre(event.target.value); // Actualiza el estado con el nuevo valor
  };

  const handleImageClick = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image.src);
    setImagen(image.value);
    handleClosePopup();
  };

  const redirect = () => {
    navigate("/principal");
  };

  const deleteProfile = async (e) => {
    e.preventDefault();
    const urlDel =
      "http://194.164.170.62:5001/api/tellix/perfiles/" + getCookie("perfil");
    let responseDel = await axios.delete(urlDel);
    alert("¡Perfil eliminado con exito!");
    navigate("/perfil");
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    let url =
      "http://194.164.170.62:5001/api/tellix/perfiles/" + getCookie("perfil");
      let perfil = await axios.get(url);
      console.log(perfil);
    perfil.data.nombre = nombre;
    perfil.data.imagen = imagen;
    let urlPut =
      "http://194.164.170.62:5001/api/tellix/perfiles/" + getCookie("perfil");
    let responsePut = await axios.put(urlPut, perfil.data);
    alert("¡Perfil modificado con exito!");
    navigate("/principal");
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  useEffect(() => {
    const showProfiles = async () => {
      const urlPerfil =
        "http://194.164.170.62:5001/api/tellix/perfiles/" + getCookie("perfil");
      let response = await axios.get(urlPerfil);
      setNombre(response.data.nombre);
      if (response.data.imagen === "") {
        setImagen("./img/fotoPerfil/foto0.png");
        setSelectedImage("./img/fotoPerfil/foto0.png");
      } else {
        setImagen("./img/fotoPerfil/" + response.data.imagen + ".png");
        setSelectedImage("./img/fotoPerfil/" + response.data.imagen + ".png");
      }
    };

    showProfiles();
  }, []);
  return (
    <div>
      <div className={administrarPerfil.logo}>
        <Link to={"/principal"}>
          <h1>Tellix</h1>
        </Link>
      </div>
      <div className={administrarPerfil.formulario}>
        <form action="">
          <h1 className={administrarPerfil.titulo}>Administar Perfil</h1>
          <img
            src={selectedImage || imagen}
            alt=""
            className={administrarPerfil.fotos}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          />
          <input
            className={administrarPerfil.input}
            type="text"
            value={nombre}
            onChange={handleChange}
          />
          <br />
          <div>
            <button className={administrarPerfil.button} onClick={saveProfile}>
              Guardar
            </button>
            <button
              className={administrarPerfil.button1}
              onClick={deleteProfile}
            >
              Eliminar Perfil
            </button>
            <button className={administrarPerfil.button1} onClick={redirect}>
              Cancelar
            </button>
          </div>
          {popupOpen && (
            <div className={administrarPerfil.popup}>
              <h2 className={administrarPerfil.titulo}>
                Selecciona una imagen:
              </h2>
              <div className={administrarPerfil.imageGrid}>
                {imageOptions.map((option) => (
                  <img
                    key={option.value}
                    src={option.src}
                    alt={`Imagen ${option.value}`}
                    onClick={() => handleImageSelect(option)}
                    style={{ cursor: "pointer" }}
                  />
                ))}
              </div>
              <button
                onClick={() => setPopupOpen(false)}
                className={administrarPerfil.button}
                style={{ cursor: "pointer" }}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdministrarPerfil;

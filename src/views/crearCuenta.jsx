import React, { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";

//importamos los css
import crearCuenta from "../css/crearCuenta.module.css";

// importamos los hooks de navegacion
import { useGoPerfilC } from "../hooks/NavigationFunctions";
const baseURL="localhost:5000/";

const CrearCuenta = () => {
  const regMail = /^\w+@[a-zA-Z]+\.(com|es|org)$/;
  const regName = /^[a-zA-Z-' ]+$/;

  const [view, setView] = useState({
    img1: "./icons/bloq.svg",
    img2: "./icons/bloq.svg",
    type1: "password",
    type2: "password",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [usuario, setUsuario] = useState({
    mail: "",
    nombre: "",
    pass: "",
    pass2: "",
  });

  const changePass1 = (event) => {
    event.preventDefault();
    if (view.type1 === "password" && view.type2 === "password") {
      setView({
        type1: "text",
        img1: "./icons/disbloq.svg",
        type2: "password",
        img2: "./icons/bloq.svg",
      });
    } else if (view.type1 === "password" && view.type2 === "text") {
      setView({
        type1: "text",
        img1: "./icons/disbloq.svg",
        type2: "text",
        img2: "./icons/disbloq.svg",
      });
    } else if (view.type1 === "text" && view.type2 === "password") {
      setView({
        type1: "password",
        img1: "./icons/bloq.svg",
        type2: "password",
        img2: "./icons/bloq.svg",
      });
    } else {
      setView({
        type1: "password",
        img1: "./icons/bloq.svg",
        type2: "text",
        img2: "./icons/disbloq.svg",
      });
    }
  };

  const changePass2 = (event) => {
    event.preventDefault();
    if (view.type1 === "password" && view.type2 === "password") {
      setView({
        type1: "password",
        img1: "./icons/bloq.svg",
        type2: "text",
        img2: "./icons/disbloq.svg",
      });
    } else if (view.type1 === "password" && view.type2 === "text") {
      setView({
        type1: "password",
        img1: "./icons/bloq.svg",
        type2: "password",
        img2: "./icons/bloq.svg",
      });
    } else if (view.type1 === "text" && view.type2 === "password") {
      setView({
        type1: "text",
        img1: "./icons/disbloq.svg",
        type2: "text",
        img2: "./icons/disbloq.svg",
      });
    } else {
      setView({
        type1: "text",
        img1: "./icons/disbloq.svg",
        type2: "password",
        img2: "./icons/bloq.svg",
      });
    }
  };
  const validate = (reg, val) => {
    return new Promise((resolve) => {
      if (reg.test(val)) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  };
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (usuario.mail === "") {
      setErrorMsg("Debe introducir el email");
    } else if(!regMail.test(usuario.mail)){
      setErrorMsg("El email no tiene un formato correcto");
    } else if (usuario.nombre === "") {
      setErrorMsg("Debe introducir el nombre");
    } else if(!regName.test(usuario.nombre)) {
      setErrorMsg("El nombre introducido no tiene un formato correcto");
    } else if (usuario.pass === "") {
      setErrorMsg("Debe introducir la contraseña");
    } else if (usuario.pass === usuario.pass2) {
      try {
        let url = "" + baseURL + "api/tellix/usuarios/";
        const datos = {
          nombre: usuario.nombre,
          correo: usuario.mail,
          contraseña: usuario.pass,
        };
        const response = await axios.post(url, datos);
        console.log(response);
        if (response.data) {
          navigate("/login");
        } else {
          setErrorMsg(response.data);
        }
      } catch (error) {
        console.error("Error al crear la cuenta:", error);
        alert("Error al crear la cuenta: " + error);
      }
    } else {
      setErrorMsg("Las contraseñas debe coincidir");
    }
  };

  return (
    <div>
      <Link to={"/"} className={crearCuenta.logo}>
        <h1 className={crearCuenta.logoh1}>Tellix</h1>
      </Link>
      <div className={crearCuenta.formulario}>
        <form>
          {errorMsg && <h3 className={crearCuenta.error}>{errorMsg}</h3>}
          <h1 className={crearCuenta.titulo}>Crear Cuenta</h1>
          <input
            className={crearCuenta.input}
            type="mail"
            name="mail"
            placeholder="Email"
            value={usuario.mail}
            onChange={handlechange}
          />
          <br />
          <input
            className={crearCuenta.input}
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={usuario.nombre}
            onChange={handlechange}
          />
          <br />
          <div className={crearCuenta.pass}>
            <input
              className={crearCuenta.input}
              type={view.type1}
              name="pass"
              placeholder="Contraseña"
              value={usuario.pass}
              onChange={handlechange}
            />
            <button onClick={changePass1}>
              {<img src={view.img1} alt="" />}
            </button>
          </div>
          <br />
          <div className={crearCuenta.pass}>
            <input
              className={crearCuenta.input}
              type={view.type2}
              name="pass2"
              placeholder="Repetir Contraseña"
              value={usuario.pass2}
              onChange={handlechange}
            />
            <button onClick={changePass2}>
              {<img src={view.img2} alt="" />}
            </button>
          </div>
          <br />
          <button className={crearCuenta.button} onClick={handleSubmit}>
            Crear Cuenta
          </button>
          <br />
          <Link to="/login">
            <p className={crearCuenta.loginP}>
              ¿Ya tienes cuenta? <span>Inicia sesión</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;

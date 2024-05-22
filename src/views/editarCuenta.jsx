import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import editarCuenta from "../css/editarCuenta.module.css";

function getCookie(nombre) {
  const valor = `; ${document.cookie}`;
  const partes = valor.split(`; ${nombre}=`);
  if (partes.length === 2) return partes.pop().split(";").shift();
}
const EditarCuenta = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleChangeNombre = (event) => {
    setNombre(event.target.value); // Actualiza el estado con el nuevo valor
  };
  const handleChangeCorreo = (event) => {
    setCorreo(event.target.value); // Actualiza el estado con el nuevo valor
  };
  const handleChangePass1 = (event) => {
    setPass1(event.target.value); // Actualiza el estado con el nuevo valor
  };
  const handleChangePass2 = (event) => {
    setPass2(event.target.value); // Actualiza el estado con el nuevo valor
  };

  const handleChangeSuscription = async (e) => {
    e.preventDefault();
    let idUsuario = getCookie("session");
    let url =
      "http://194.164.169.54:5000/api/tellix/usuarios/suscription/" + idUsuario;
    let response = await axios.post(url);
    document.cookie =
      "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "perfil=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");
  };

  const handleChangeData = async (e) => {
    e.preventDefault();
    let idUsuario = getCookie("session");
    let urlUsu = "http://194.164.169.54:5000/api/tellix/usuarios/" + idUsuario;
    let usuario = await axios.get(urlUsu);
    let correoUsu = usuario.data.correo;

    let urlCorreo =
      "http://194.164.169.54:5000/api/tellix/usuarios/mail/" + correo;
    let correoUsuCheck = await axios.get(urlCorreo);
    if (pass1 !== pass2) {
      setMensaje("Las contraseñas deben coincidir");
    } else {
      if (correo === "") {
        setMensaje("Debe introducir el correo");
      } else {
        if (nombre === "") {
          setMensaje("Debe introducir el nombre");
        } else {
          if (correoUsuCheck.data !== "" && correo !== correoUsu) {
            setMensaje("El correo introducido ya tiene una cuenta en Tellix");
          } else {
            if (pass1 !== "" && pass2 !== "") {
              usuario.data.nombre = nombre;
              usuario.data.correo = correo;
              usuario.data.contraseña = pass1;
              let url =
                "http://194.164.169.54:5000/api/tellix/usuarios/" + idUsuario;

              let response = await axios.put(url, usuario.data);
              setMensaje("¡Datos modificados con exito!");
              navigate("/principal");
            } else {
              setMensaje("Debe repetir la contraseña");
            }
          }
        }
      }
    }
  };
  useEffect(() => {
    const showData = async () => {
      let idUsuario = getCookie("session");
      let url = "http://194.164.169.54:5000/api/tellix/usuarios/" + idUsuario;
      let response = await axios.get(url);
      setNombre(response.data.nombre);
      setCorreo(response.data.correo);
    };

    showData();
  }, []);

  useEffect(() => {
    const cookieSesion = getCookie("session");
    if (!cookieSesion) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <div className={editarCuenta.logo}>
        <Link to={"/principal"}>
          <h1>Tellix</h1>
        </Link>
      </div>
      <div className={editarCuenta.formulario}>
        <form action="">
          <h3>{mensaje}</h3>
          <h1 className={editarCuenta.titulo}>Modificar Cuenta</h1>
          <input
            className={editarCuenta.input}
            type="text"
            value={nombre}
            placeholder="Nombre"
            onChange={handleChangeNombre}
          />
          <br />
          <input
            className={editarCuenta.input}
            type="text"
            value={correo}
            placeholder="Correo"
            onChange={handleChangeCorreo}
          />
          <br />
          <input
            className={editarCuenta.input}
            type="password"
            value={pass1}
            placeholder="Contraseña"
            onChange={handleChangePass1}
          />
          <br />
          <input
            className={editarCuenta.input}
            type="password"
            value={pass2}
            placeholder="Repetir contraseña"
            onChange={handleChangePass2}
          />
          <br />
          <div className={editarCuenta.botones}>
            <button className={editarCuenta.button} onClick={handleChangeData}>
              Confirmar Cambios
            </button>
            <button
              className={editarCuenta.button}
              onClick={handleChangeSuscription}
            >
              Cancelar Subcripcion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarCuenta;

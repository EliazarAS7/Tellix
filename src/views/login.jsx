import React, { Children } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";

//importamos los css
import login from "../css/login.module.css";

// importamos los hooks de navegacion
// import { useGoPerfilL } from "../hooks/NavigationFunctions";

const Login = () => {
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [usuario, setUsuario] = useState({
    mail: "",
    pass: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let url =
        "http://194.164.170.62:5001/api/tellix/usuarios/login?mail=" +
        usuario.mail +
        "&password=" +
        usuario.pass;
      const response = await axios.get(url);
      console.log(response);
      if (response.data.admin) {
        navigate("/admin");
      } else if (response.data.correo) {
        // Hacer coockie del usuario y de login
        document.cookie = `session=${response.data.session}; path=/; max-age=3600`;
        navigate("/perfil");
      } else {
        setErrorMsg(response.data);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión");
    }
  };
  return (
    <div>
      <div className={login.logo}>
        <h1>Tellix</h1>
      </div>
      <div className={login.formulario}>
        <form>
          {errorMsg && <h3>{errorMsg}</h3>}
          <h1 className={login.iniciarSesion}>Iniciar Sesión</h1>
          <input
            className={login.input}
            type="text"
            name="mail"
            placeholder="Email"
            id="mail"
            value={usuario.maill}
            onChange={handlechange}
          />
          <br />
          <input
            className={login.input}
            type="text"
            name="pass"
            placeholder="Password"
            id="pass"
            value={usuario.pass}
            onChange={handlechange}
          />
          <br />
          <br />
          <button className={login.button} onClick={handleSubmit}>
            Iniciar Sesión
          </button>
          <br />
          <Link to="/crearCuenta">
            <p>¿No tienes cuenta? Hazte una ahora</p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

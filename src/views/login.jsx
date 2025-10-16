import React, { Children, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router';
import axios from 'axios';

//importamos los css
import login from '../css/login.module.css';

let botonSus = true;

const Login = () => {
  const botonRef = useRef(null);
  const [view, setView] = useState({
    img: './icons/bloq.svg',
    type: 'password',
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [usuario, setUsuario] = useState({
    mail: '',
    pass: '',
  });

  const changePass = (event) => {
    event.preventDefault();
    if (view.type === 'password') {
      setView({
        type: 'text',
        img: './icons/disbloq.svg',
      });
    } else {
      setView({
        type: 'password',
        img: './icons/bloq.svg',
      });
    }
  };

  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (usuario.mail === '') {
        setErrorMsg('Debe introducir el correo');
      } else if (usuario.contraseña === '') {
        setErrorMsg('Debe introducir la contraseña');
      } else {
        let url =
          'http://127.0.0.1:5000/api/tellix/usuarios/login?mail=' +
          usuario.mail +
          '&password=' +
          usuario.pass;
        const response = await axios.get(url);
        if (response.data.correo) {
          let strObj = JSON.stringify(response.data);
          document.cookie = `session=${response.data.id}; path=/; max-age=86400`;
          navigate('/perfil');
        } else {
          if (
            response.data ===
              'El usuario introducido no tiene una suscripción válida' &&
            botonSus
          ) {
            botonSus = false;
            let urlUsuId =
              'http://127.0.0.1:5000/api/tellix/usuarios/mail/' + usuario.mail;
            const respID = await axios.get(urlUsuId);
            let idUsu = respID.data.id;
            setErrorMsg(response.data);
            const boton = document.createElement('button');
            boton.textContent = 'Click aquí para suscribirse';
            boton.addEventListener('click', async (event) => {
              event.preventDefault();
              try {
                let url =
                  'http://127.0.0.1:5000/api/tellix/usuarios/suscription/' +
                  idUsu;
                const responseSus = await axios.post(url);
                if (responseSus) {
                  document.cookie = `session=${idUsu}; path=/; max-age=86400`;
                  navigate('/perfil');
                }
              } catch (error) {
                console.error('Error al suscribirse:', error);
                alert('Error al suscribirse: ' + error);
              }
            });
            botonRef.current.appendChild(boton);
          } else {
            setErrorMsg(response.data);
          }
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
    botonSus = true;
  };
  return (
    <div>
      <Link to={'/'} className={login.logo}>
        <h1 className={login.logoh1}>Tellix</h1>
      </Link>
      <div className={login.formulario}>
        <form>
          {errorMsg && <h3 className={login.error}>{errorMsg}</h3>}
          <div ref={botonRef} className={login.suscripcion}></div>
          <h1 className={login.iniciarSesion}>Iniciar Sesión</h1>
          <input
            className={login.input}
            type="text"
            name="mail"
            placeholder="Email"
            id="mail"
            value={usuario.mail}
            onChange={handlechange}
          />
          <br />
          <div className={login.pass}>
            <input
              className={login.input}
              type={view.type}
              name="pass"
              placeholder="Contraseña"
              value={usuario.pass}
              onChange={handlechange}
            />
            <button onClick={changePass}>
              {<img src={view.img} alt="" />}
            </button>
          </div>
          <br />
          <br />
          <button className={login.button} onClick={handleSubmit}>
            Iniciar Sesión
          </button>
          <br />
          <Link to="/crearCuenta">
            <p className={login.loginP}>
              ¿No tienes cuenta? <span>Hazte una ahora</span>
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;

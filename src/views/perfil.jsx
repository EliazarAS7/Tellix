import React from 'react'
import { Link } from 'react-router-dom'

//importamos los css
import perfil from '../css/perfil.module.css'

// imagenes de los perfiles
import imagen1 from '../img/fotoPerfil/Captura de pantalla 2024-05-11 124023.png'
import imagen2 from '../img/fotoPerfil/foto2.png';
import imagen3 from '../img/fotoPerfil/foto3.png';
import imagen4 from '../img/fotoPerfil/foto7.png';
import imagen5 from '../img/fotoPerfil/foto6.png';

import { useGoPrincipalL } from '../hooks/NavigationFunctions'

const Perfil = () => {

  const goToPrincipal = useGoPrincipalL();

  return (
    <div className={perfil.principal}>
      <h1 className={perfil.titulo}>¿Quién eres? Elige tu perfil</h1>
      <div className={perfil.perfiles}>
        <Link to='/login/perfil/principal'><img src={imagen1} alt="" /></Link>
        <Link to='/login/perfil/principal'><img src={imagen2} alt="" /></Link>
        <Link to='/login/perfil/principal'><img src={imagen3} alt="" /></Link>
        <Link to='/login/perfil/principal'><img src={imagen4} alt="" /></Link>
        <Link to='/login/perfil/principal'><img src={imagen5} alt="" /></Link>
      </div>
      {/* <button className={perfil.botonFinal}>
        <p>Administrar Cuenta</p>
      </button> */}
    </div>
  )
}

export default Perfil

import React from 'react'

//importamos los css
import perfil from '../css/perfil.module.css'

import { useGoPrincipalL } from '../hooks/NavigationFunctions'

const Perfil = () => {

  const goToPrincipal = useGoPrincipalL();

  return (
    <div className={perfil.principal}>
      <h1 className={perfil.titulo}>¿Quién eres? Elige tu perfil</h1>
      <div className={perfil.perfiles}>
        <button onClick={goToPrincipal}>Paco</button>
        <button onClick={goToPrincipal}>Marisol</button>
        <button onClick={goToPrincipal}>Aaron</button>
        <button onClick={goToPrincipal}>Eliazar</button>
        <button onClick={goToPrincipal}>Luis Alberto</button>
      </div>
      <button className={perfil.botonFinal}>
        <p>Administrar Perfiles</p>
      </button>
    </div>
  )
}

export default Perfil

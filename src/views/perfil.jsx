import React from 'react'

//importamos los css
import perfil from '../css/perfil.module.css'

import { useGoPrincipalL } from '../hooks/NavigationFunctions'

const Perfil = () => {

  const goToPrincipal = useGoPrincipalL();

  return (
    <div>
      <h1>¿Quién eres? Elige tu perfil</h1>
      <div>
        <button onClick={goToPrincipal}>Paco</button>
        <button onClick={goToPrincipal}>Marisol</button>
        <button onClick={goToPrincipal}>Aaron</button>
        <button onClick={goToPrincipal}>Eliazar</button>
        <button onClick={goToPrincipal}>Luis Alberto</button>
      </div>
      <p>Administrar Perfiles</p>
    </div>
  )
}

export default Perfil

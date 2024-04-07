import { Routes, Route, Outlet } from 'react-router-dom';

//importamos las vistas para despues imprementarlas
import Preload from './views/preload'
import CrearCuenta from './views/crearCuenta';
import Login from './views/login';
import Perfil from './views/perfil';
import Principal from './views/principal';

import React from 'react'

const router = () => {
  return (
    <Routes>
        <Route path='/' element={<Preload/>}/>

        <Route path='crearCuenta' element={<CrearCuenta/>}/>
        <Route path='login' element={<Login/>}/>

        <Route path='login/perfil' element={<Perfil/>}/>
        <Route path='crearCuenta/perfil' element={<Perfil/>}/>

        <Route path='login/perfil/principal' element={<Principal/>}/>
        <Route path='crearCuenta/perfil/principal' element={<Principal/>}/>
    </Routes>
  )
}

export default router



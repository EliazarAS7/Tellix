import { Routes, Route, Outlet } from 'react-router-dom';

//importamos las vistas para despues imprementarlas
import Preload from './views/preload';
import CrearCuenta from './views/crearCuenta';
import Login from './views/login';
import Perfil from './views/perfil';
import Principal from './views/principal';
import EditarCuenta from './views/editarCuenta';
import AdministrarPerfil from './views/administrarPerfil';
import PeliculasSeries from './views/peliculasSeries';

import React from 'react';

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Preload />} />

      <Route path="crearCuenta" element={<CrearCuenta />} />
      <Route path="login" element={<Login />} />

      <Route path="perfil" element={<Perfil />} />

      <Route path="principal" element={<Principal />} />

      <Route path="administrarPerfil" element={<AdministrarPerfil />} />
      <Route path="editarCuenta" element={<EditarCuenta />} />

      <Route path="PeliculasSeries" element={<PeliculasSeries />} />
    </Routes>
  );
};

export default router;

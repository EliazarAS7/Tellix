import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import fotoPerfil from '../img/fotoPerfil/foto2.png';

import principal from './header.module.css';

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuOptions = ['Administrar Perfil', 'Cambiar Perfil', 'Editar Cuenta', 'Cerrar Sesión'];
    const navigate = useNavigate();
    const handleMenuOptionClick = (option) => {
        switch (option) {
            case 'Administrar Perfil':
                navigate('/login/perfil/principal/administrarPerfil');
                break;
            case 'Cambiar Perfil':
                navigate('/login/perfil');
                break;
            case 'Editar Cuenta':
                navigate('/login/perfil/principal/editarCuenta');
                break;
            case 'Cerrar Sesión':
                navigate('/');
                break;
            default:
                console.log('Opción no reconocida');
        }
    };

    return (
        <div className={principal.todo}>
            <div className={principal.barraNav}>
                <h1>Tellix</h1>
                <Link>Peliculas</Link>
                <Link>Series</Link>
                <Link className={principal.miLista}>Mi Lista</Link>
                <Link>Categorias</Link>
            </div>
            <div className={principal.derecha}>
                <img src={fotoPerfil} alt="" onClick={() => setMenuOpen(!menuOpen)} />
                <>
                    {menuOpen && (
                        <div className={principal.menu}>
                            {menuOptions.map((option, index) => (
                                <div key={index} className={principal.menuOption} onClick={() => handleMenuOptionClick(option)}>
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </>
            </div>
        </div>
    )
}

export default Header

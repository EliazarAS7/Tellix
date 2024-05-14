import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useGoLogin, useGoCrearCuenta } from '../hooks/NavigationFunctions';


import fotoPerfil from '../img/fotoPerfil/foto2.png';

import principal from './header.module.css';

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuOptions = ['Administrar Perfil', 'Cambiar Perfil', 'Editar Cuenta', 'Cerrar Sesión'];
    const [showBarNav, setShowBarNav] = useState(true);
    const navigate = useNavigate();

    // para navegar
    const goToLogin = useGoLogin();
    const goToCrearCuenta = useGoCrearCuenta();

    // leer la cookie
    const [showRightDiv, setShowRightDiv] = useState(false);

    useEffect(() => {
        const checkSession = () => {
            const sessionCookie = document.cookie.split('; ').find(row => row.startsWith('session='));
            if (sessionCookie) {
                setShowRightDiv(true); // Muestra el div derecho si la cookie existe
            }
        };

        checkSession(); // Llama a la función al montar el componente
    }, []);

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
            {/* <div className={principal.barraNav}>
                <h1>Tellix</h1>
                <Link>Peliculas</Link>
                <Link>Series</Link>
                <Link className={principal.miLista}>Mi Lista</Link>
                <Link>Categorias</Link>
            </div> */}
            {showBarNav ? (
                <div className={principal.barraNav}>
                    <h1>Tellix</h1>
                    <Link>Peliculas</Link>
                    <Link>Series</Link>
                    <Link className={principal.miLista}>Mi Lista</Link>
                    <Link>Categorias</Link>
                </div>
            ) : null}
            {showRightDiv ? (
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
            ) : ( 
                <div className={principal.botones}>
                    <button className={principal.botonLogin} onClick={goToLogin}>Iniciar Sesión</button>
                    <button className={principal.botonCrearCuenta} onClick={goToCrearCuenta}>Suscribete Ya</button>
                </div>
            )}
            {/* <div className={principal.derecha}>
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
            </div> */}
        </div>
    )
}

export default Header

import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

//portada de las peliculas
import avatar from '../img/fotoPeliculas/Avatar.jpg'
import elNino from '../img/fotoPeliculas/elNiño.jpg'
import aladin from '../img/fotoPeliculas/Aladin.jpg'
import laMonja from '../img/fotoPeliculas/laMonja.jpg'
import frozen from '../img/fotoPeliculas/frozen.jpg'
import venom from '../img/fotoPeliculas/venom.jpg'
import mulan from '../img/fotoPeliculas/mulan.jpg'
import fotoPerfil from '../img/fotoPerfil/foto2.png';

//importamos los css
import principal from '../css/principal.module.css'

const Principal = () => {

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
        <div className={principal.general}>
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

            <div className={principal.todasPeliculas}>
                <div className={principal.peliculas}>
                    <h2>Solo en Tellix</h2>
                    <div className={principal.soloTellix}>
                        <img src={laMonja} alt="" />
                        <img src={elNino} alt="" />
                        <img src={aladin} alt="" />
                        <img src={avatar} alt="" />
                        <img src={frozen} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>

                <div className={principal.peliculas}>
                    <h2>Top 10 Mejores Series</h2>
                    <div className={principal.soloTellix}>
                        <img src={laMonja} alt="" />
                        <img src={elNino} alt="" />
                        <img src={aladin} alt="" />
                        <img src={avatar} alt="" />
                        <img src={frozen} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>

                <div className={principal.peliculas}>
                    <h2>Top 10 Mejores Peliculas</h2>
                    <div className={principal.soloTellix}>
                        <img src={laMonja} alt="" />
                        <img src={elNino} alt="" />
                        <img src={aladin} alt="" />
                        <img src={avatar} alt="" />
                        <img src={frozen} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>

                <div className={principal.peliculas}>
                    <h2>Novedades</h2>
                    <div className={principal.soloTellix}>
                        <img src={laMonja} alt="" />
                        <img src={elNino} alt="" />
                        <img src={aladin} alt="" />
                        <img src={avatar} alt="" />
                        <img src={frozen} alt="" />
                        <img src={venom} alt="" />
                        <img src={mulan} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Principal

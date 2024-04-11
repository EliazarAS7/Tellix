import { useNavigate } from 'react-router';

export function useGoLogin(){
    const navigate = useNavigate();
    return () => navigate('/login');
}

export function useGoCrearCuenta(){
    const navigate = useNavigate();
    return () => navigate('/crearCuenta');
}

// ir a perfiles desde crear cuenta y desde el login
export function useGoPerfilL(){
    const navigate = useNavigate();
    return () => navigate('/login/perfil');
}

export function useGoPerfilC(){
    const navigate = useNavigate();
    return () => navigate('/crearCuenta/perfil');
}

// ir a la vista principal desde crear cuenta o desde el login 

export function useGoPrincipalL(){
    const navigate = useNavigate();
    return () => navigate('/login/perfil/principal');
}

export function useGoPrincipalC(){
    const navigate = useNavigate();
    return () => navigate('/crearCuenta/perfil/principal');
}
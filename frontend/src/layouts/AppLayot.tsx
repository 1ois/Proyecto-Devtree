import { Navigate, useLocation } from "react-router-dom";

import { useQuery } from '@tanstack/react-query';

import { getUser } from '../api/DevTreeApi'
import Devtree from "../components/DevTree";

export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        //     //vamos a pasar algunas configuraciones
        queryFn: getUser, //qué funcion va a hacer la consulta hacia nuestra api
        queryKey: ['user'], //reactquery identifica el query del getuser y debe ser único para cada consulta
        retry: 2, //cuantas veces queremos que react intente la conexión
        refetchOnWindowFocus: false //no queremos que se hagan más consultas si cambiamos de pestaña
    })

    const location = useLocation(); // 🔴 LÍNEA AGREGADA

    if (isLoading) return 'Cargando...'
    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    console.log(data)
    //console.log(isLoading) //primero será false
    //console.log(isError)
    //console.log(error?.message)



    if (data) {
        const isDefaultRoute = location.pathname === '/usuarios' || location.pathname === '/usuarios/';
        const tienePermisoLinks = data.permisos.includes('admin'); // Revisa el permiso real para la vista 'Links'
        if (isDefaultRoute && !tienePermisoLinks) {
            // Si el usuario está en la ruta por defecto (/admin), 
            // no tiene el permiso para esa vista, PERO SÍ tiene permiso base,
            // lo redirigimos a 'Mi Perfil'.
            return <Navigate to={'/admin/profile'} replace />;
        }
        return <Devtree data={data} />
    }
    return null;

}
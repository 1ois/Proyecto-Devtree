import { Link, Navigate, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useQuery } from '@tanstack/react-query';
import NavigationTabs from "../components/NavigationTabs";
import { getUser } from '../api/DevTreeApi'
import Devtree from "../components/DevTree";

export default function AppLayout() {

    const { data, isLoading, isError, error } = useQuery({
        //     //vamos a pasar algunas configuraciones
        queryFn: getUser, //qué funcion va a hacer la consulta hacia nuestra api
        queryKey: ['user'], //reactquery identifica el query del getuser y debe ser único para cada consulta
        retry: 2, //cuantas veces queremos que react intente la conexión
        refetchOnWindowFocus: false //no queremos que se hagan más consultas si cambiamos de pestaña
    })
    if (isLoading) return 'Cargando...'
    if (isError) {
        return <Navigate to={'/auth/login'} />
    }

    console.log(data)
    //console.log(isLoading) //primero será false
    //console.log(isError)
    //console.log(error?.message)



    if (data) return <Devtree data={data} />
}
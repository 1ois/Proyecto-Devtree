import { useQuery } from "@tanstack/react-query"
import { getAllUser, getUser } from "../api/DevTreeApi"; // getUser para permisos
import { Navigate } from "react-router-dom";
import UsuarioData from "../components/UsuariosData";

export default function UsuariosView() {

    const { data: currentUser, isLoading: loadingUser } = useQuery({
        queryKey: ['user'],
        queryFn: getUser
    });

    const { data: users, isLoading: loadingUsers, error } = useQuery({
        queryKey: ['users'],
        queryFn: getAllUser
    });

    if (loadingUser || loadingUsers) return <p>Cargando...</p>;
    if (error) return <Navigate to='/404' />;

    // Solo admin puede ver la tabla
    if (!currentUser?.permisos?.includes('admin')) {
        return <Navigate to='/admin/profile' replace />;
    }

    return <UsuarioData data={users} />
}

import { useQueryClient } from "@tanstack/react-query"

export default function AdminNavigation() {
    //   con esto cerramos sesion 
    const querClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        querClient.invalidateQueries({ queryKey: ['user'] })
    }


    return (
        <button
            className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            onClick={logout}
        >
            Cerrar Sesión
        </button>
    )
} 
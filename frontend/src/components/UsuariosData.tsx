import { Link, useNavigate } from "react-router-dom";
import type { Usuarios, SocialNetwork } from "../types";
;
type UsuarioDataProps = {
    data: Usuarios;
};


export default function UsuarioData({ data }: UsuarioDataProps) {
    const navigate = useNavigate(); // 
    return (

        <div className="p-6 bg-gray-900 rounded-lg shadow-lg overflow-x-auto mx-auto max-w-6xl">

            <div className="mb-4">
                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                    onClick={() => navigate(-1)}
                >
                    ← Regresar
                </button>
            </div>
            <h2 className="text-2xl font-bold text-center text-white mb-6">Usuarios Registrados</h2>
            <table className="min-w-full divide-y divide-gray-700 bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <thead className="bg-gray-700 text-white ">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Handle</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Descripción</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Imagen</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Redes</th>
                        <th className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Ir</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                    {data?.map(user => {
                        const links: SocialNetwork[] = typeof user.links === "string" ? JSON.parse(user.links) : user.links;
                        const enabledLinks = links?.filter(link => link.enabled).map(link => link.name) || [];

                        return (
                            <tr key={user.handle} className="hover:bg-gray-700 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-200">{user.handle}</td>
                                <td className="px-6 py-4 text-gray-300">{user.description}</td>
                                <td className="px-6 py-4 text-center">
                                    {user.image ? (
                                        <img src={user.image} alt={user.name} className="w-12 h-12 rounded-full object-cover mx-auto" />
                                    ) : (
                                        <span className="text-gray-500">Sin imagen</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-300">{enabledLinks.join(', ')}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                        onClick={() => navigate(`/${user.handle}`)}
                                    >
                                        Visitar
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

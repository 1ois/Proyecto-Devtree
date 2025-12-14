import { BookmarkSquareIcon, CogIcon, UserIcon } from '@heroicons/react/20/solid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { NavigationTabsProps } from '../types'
import { CakeIcon } from '@heroicons/react/20/solid'
import { EyeIcon } from '@heroicons/react/24/solid'
// Pestaña 'Links' (Inicio/Dashboard de la administración) - Requiere permiso 'base'
const tabs = [
    { name: 'Links', href: '/admin', icon: BookmarkSquareIcon, requiredPermission: 'base' },
    { name: 'Mi Perfil', href: '/admin/profile', icon: UserIcon, requiredPermission: 'base' },
    { name: 'Usuarios Registrados', href: '/usuarios', icon: EyeIcon, requiredPermission: 'admin' },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

// 🔴 LÍNEA MODIFICADA: Ahora recibe los permisos
export default function NavigationTabs({ permisos }: NavigationTabsProps) {
    const location = useLocation()
    const navigate = useNavigate()
    // 🔴 LÍNEA AGREGADA: Filtramos las pestañas basándonos en los permisos
    const tabss = tabs.filter(tab => {
        return permisos.includes(tab.requiredPermission);
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value)
    }

    return (
        <div className='mb-5'>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    onChange={handleChange}
                >{/* 🔴 LÍNEA MODIFICADA: Usamos la variable 'tabs' filtrada */}
                    {tabss.map((tab) => (
                        <option
                            value={tab.href}
                            key={tab.name}
                        >{tab.name}</option>
                    ))}
                </select>
            </div>

            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {/* 🔴 LÍNEA MODIFICADA: Usamos la variable 'tabs' filtrada */}
                        {tabss.map((tab) => (
                            <Link
                                key={tab.name}
                                to={tab.href}
                                className={classNames(
                                    location.pathname === tab.href
                                        ? 'border-blue-500 text-blue-500'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'group inline-flex items-center border-b-2 py-4 px-1 text-xl'
                                )}
                            >
                                <tab.icon
                                    className={classNames(
                                        location.pathname === tab.href ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                                        '-ml-0.5 mr-2 h-5 w-5'
                                    )}
                                    aria-hidden="true"
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
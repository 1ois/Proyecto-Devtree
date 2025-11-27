import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import ErrorMessage from "../components/ErrorMenssage"
import type { LoginFrom } from "../types"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import api from "../config/axios"

export default function LoginView() {

    //toast('hOLA MUNDO DESDE TOAST')
    const initialValues: LoginFrom = {

        email: '',
        password: '',

    }

    //Reglas de validacion y mostrar errores:
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleLogin = async (formData: LoginFrom) => {
        try {
            const { data } = await api.post(`/auth/login`, formData)
            toast.success(data)
            localStorage.setItem('AUTH_TOKEN', data)
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            }
        }

    }


    return (
        <>
            <h1 className="text-center text-4xl text-white font-bold">Inicio Sesion </h1>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10 max-w-md mx-auto"
                noValidate // Evita la validación HTML5 por defecto, dejando el control a react-hook-form
            >
                {/* Campo de Email */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("email", {
                            required: "El E-mail es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/, // Expresión regular para validar formato de email
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {/* Mostrar error de Email */}
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                {/* Campo de Password */}
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 6, // Ejemplo: Mínimo 6 caracteres para la contraseña
                                message: "La contraseña debe tener al menos 6 caracteres"
                            }
                        })}
                    />
                    {/* Mostrar error de Password */}
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                {/* Botón de Submit */}
                <input
                    type="submit"
                    value="Iniciar Sesión"
                    className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                />
            </form>

            <nav className="text-center text-white  text-lg block">
                <Link to="/auth/register">
                    ¿No tienes una cuenta? Registrate Aqui.
                </Link>
            </nav>

        </>
    )
}
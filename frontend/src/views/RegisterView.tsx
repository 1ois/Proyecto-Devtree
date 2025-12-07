import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";

import { toast } from 'sonner';
import type { RegisterForm } from "../types";
import ErrorMessage from '../components/ErrorMenssage';
import api from "../config/axios";

//instalamos  npm i react-hook-form PARA APLICARREGLAS DE VALIDACION

export default function ResgisterView() {
    const location = useLocation()

    const navigate = useNavigate()

    //toast('hOLA MUNDO DESDE TOAST')
    const initialValues: RegisterForm = {
        name: '',
        email: '',
        handle: location?.state.handle || '',
        password: '',
        password_confirmation: '',

    }

    //Reglas de validacion y mostrar errores:
    const { register, watch, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


    //console.log(errors)
    const password = watch('password')
    const handleRegister = async (formData: RegisterForm) => {
        //console.log(formData)
        //aca para que se muestre en consolo F12 'reponse' cambias la vaiable sin corchete
        try {
            const { data } = await api.post(`/auth/register`, formData)
            toast.success(data)
            //console.log(data)

            reset()
            navigate('/auth/login')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response?.data.error)
            }
            // console.log(error)
        }
    }

    return (
        <>
            <h1 className="text-center text-4xl text-white font-bold">Crear cuenta</h1>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="bg-white px-5 py-10 rounded-lg space-y-7 mt-10 shadow-md max-w-md mx-auto"
            >

                {/* Nombre */}
                <div className="space-y-2">
                    <label htmlFor="name" className="text-xl font-semibold text-slate-600">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full bg-slate-100 border border-slate-300 p-3 rounded-lg placeholder-slate-400"

                        {...register('name',
                            { required: "El nombre es obligatorio." }
                        )}

                    />
                    {errors.name && (
                        <ErrorMessage>
                            {errors.name.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-xl font-semibold text-slate-600">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full bg-slate-100 border border-slate-300 p-3 rounded-lg placeholder-slate-400"
                        {...register('email', {
                            required: "El email es obligatorio.",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email no valido."
                            }
                        })}
                        autoComplete="username"

                    />
                    {errors.email && (
                        <ErrorMessage>
                            {errors.email.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Handle */}
                <div className="space-y-2">
                    <label htmlFor="handle" className="text-xl font-semibold text-slate-600">
                        Handle
                    </label>
                    <input
                        id="handle"
                        type="text"
                        placeholder="Nombre de usuario: sin espacios"
                        className="w-full bg-slate-100 border border-slate-300 p-3 rounded-lg placeholder-slate-400"
                        {...register('handle', {
                            required: "El handle es obligatorio"
                        })}

                    />
                    {errors.handle && (
                        <ErrorMessage>
                            {errors.handle.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label htmlFor="password" className="text-xl font-semibold text-slate-600">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"

                        className="w-full bg-slate-100 border border-slate-300 p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: "Constraseña debe tener minimo 8 caracteres"
                            }

                        })}

                        autoComplete="new-password"
                    />
                    {errors.password && (
                        <ErrorMessage>
                            {errors.password.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Repetir Password */}
                <div className="space-y-2">
                    <label htmlFor="password_confirmation" className="text-xl font-semibold text-slate-600">
                        Repetir Password
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="w-full bg-slate-100 border border-slate-300 p-3 rounded-lg placeholder-slate-400"

                        {...register('password_confirmation', {
                            required: "Repetir la constraseña es obligatoria",
                            validate: (value) => value == password || 'Los password no coincide'
                        })}
                        autoComplete="new-password"
                    />
                    {errors.password_confirmation && (
                        <ErrorMessage>
                            {errors.password_confirmation.message}
                        </ErrorMessage>
                    )}
                </div>

                {/* Botón */}
                <button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 transition text-white py-3 rounded-lg font-bold text-lg"
                >
                    CREAR CUENTA
                </button>

            </form>


            <nav className="mt-10">
                <Link className="text-center text-white text-lg block" to="/auth/login">
                    ¿Ya tienes una cuenta? Inicia sesion
                </Link>
            </nav>


        </>
    )
}
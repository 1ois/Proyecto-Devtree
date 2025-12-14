import { Link, Outlet, useLocation } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { useEffect, useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Toaster } from "sonner";
import type { SocialNetwork, User } from "../types";
import DevTreeLink from "./DevtreeLink";

import { useQueryClient } from "@tanstack/react-query";

import api from "../config/axios";

import Header from "./Header";



type DevTreeProp = {
    data: User
}

// export default function Devtree({ data }: DevTreeProp) 
export default function Devtree({ data }: DevTreeProp) {


    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])


    const queryClient = useQueryClient()

    const handleDragEnd = (e: DragEndEvent) => {

        const { active, over } = e

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id)
            const newIndex = enabledLinks.findIndex(link => link.id === over.id)
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            setEnabledLinks(order)

            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)

            const links = order.concat(disabledLinks)
            //setear el cache de usuario
            queryClient.setQueryData(['user'], (prevData: User) => {
                return {
                    ...prevData,
                    links: JSON.stringify(links)
                }
            })
        }
    }
    console.log("Enabled links:", enabledLinks.map(l => l.id));
    // codigo agregado
    useEffect(() => {

        const hasVisited = localStorage.getItem("visitaContada")
        if (!hasVisited) {

            api.post(`${import.meta.env.VITE_API_URL}/sumarVisitas`)
                .then(() => {
                    localStorage.setItem("visitaContada", "true");
                })
                .catch(() => console.log("No se puede sumar visitas"))

        }



    }, [])
    //  fin
    return (
        <>
            <Header />
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">
                    {/* 🔴 LÍNEA MODIFICADA: Pasa el array de permisos */}
                    <NavigationTabs permisos={data.permisos} />

                    <>
                        <div className="flex justify-end">

                            <Link
                                className="font-bold text-right text-slate-800 text-2xl"
                                to={`/${data.handle}`}
                                target="_blank"
                                rel="noreferrer noopener "
                            >Visitar Mi Perfil/   {data.handle}</Link>

                        </div>

                        <div className="flex flex-col md:flex-row gap-10 mt-10">
                            <div className="flex-1 ">
                                <Outlet />
                            </div>
                            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">

                                <p className="text-4xl text-center text-white">{data.handle}</p>
                                {data.image &&
                                    < img src={data.image} alt='Imagen de Perfil' className='mx-auto max-w-[250px]'></img>
                                }
                                <p className='text-center text-lg font-black text-white'>{data.description}</p>
                                <DndContext
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <div className="mt-20 flex flex-col gap-5">
                                        <SortableContext
                                            items={enabledLinks}   // ← CORREGIDO
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {enabledLinks.map(link => (
                                                <DevTreeLink key={link.name} link={link} />   // ← CORREGIDO
                                            ))}
                                        </SortableContext>
                                    </div>
                                </DndContext>





                            </div>
                        </div>
                    </>

                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )


}
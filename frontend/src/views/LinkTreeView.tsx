import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeApi";
import type { SocialNetwork, User } from "../types";


export default function LinktreeView() {

    const [devTreeLink, setDevTreeLinks] = useState(social)

    const queryClient = useQueryClient()
    const user: User = queryClient.getQueryData(['user'])!

    console.log(JSON.parse(user.links))

    //Inicio
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Actualizado Correctamente')
        }
    })
    //   fin
    //inicio

    useEffect(() => {
        // console.log(devTreeLink)
        //console.log(JSON.parse(user.links))
        const updatedData = devTreeLink.map(item => {
            const userlink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
            if (userlink) {
                return { ...item, url: userlink.url, enabled: userlink.enabled }
            }
            return item
        })
        setDevTreeLinks(updatedData)
    }, [])

    //fin


    //inicio
    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const updateLinks = devTreeLink.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
        //console.log(updateLinks)

        setDevTreeLinks(updateLinks)

    }

    //FIN

    // inicio
    const links: SocialNetwork[] = JSON.parse(user.links)

    const handleEnableLink = (socialNetwork: string) => {
        //console.log(socialNetwork)
        // const updateLinks = devTreeLink.map(link => link.name === socialNetwork ? { ...link, enabled: !link.enabled } : link)
        const updateLinks = devTreeLink.map(link => {
            if (link.name === socialNetwork) {
                if (isValidUrl(link.url)) {
                    return { ...link, enabled: !link.enabled }
                } else {
                    toast.error("URL no valida")
                }

            }
            return link
        })

        //console.log(updateLinks)
        setDevTreeLinks(updateLinks)

        let updateItems: SocialNetwork[] = []
        const selectedSocialNetwork = updateLinks.find(link => link.name === socialNetwork)
        if (selectedSocialNetwork?.enabled) {
            const id = links.filter(link => link.id).length + 1
            if (links.some(link => link.name === socialNetwork)) {
                updateItems = links.map(link => {
                    if (link.name === socialNetwork) {
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    } else {
                        return link
                    }
                })

            } else {
                const newItem = {
                    ...selectedSocialNetwork,
                    id
                }
                updateItems = [...links, newItem]
            }

        } else {
            const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
            updateItems = links.map(link => {
                if (link.name === socialNetwork) {
                    return {
                        ...link,
                        id: 0,
                        enabled: false
                    }
                } else if (link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)) {
                    return {
                        ...link,
                        id: link.id - 1
                    }
                } else {
                    return link
                }
            })
        }

        queryClient.setQueryData(['user'], (prevData: User) => {
            return {
                ...prevData,
                links: JSON.stringify(updateItems)
            }
        })
    }
    // fin
    return (
        <div className="space y-5">
            {devTreeLink.map(item => (
                <DevTreeInput
                    key={item.name}

                    item={item}
                    handleUrlChange={handleUrlChange}
                    handleEnableLink={handleEnableLink}
                />
            ))}
            <button
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
                onClick={() => mutate(queryClient.getQueryData(['user'])!)}
            >Guardar cambios</button>
        </div>
    )
}
export type User = {
    handle: string,
    name: string,
    _id: string,
    email: string,
    description: string
    image: string
    links: string

}
export type UserHandle = Pick<User, 'description' | 'handle' | 'image' | 'links' | 'name'>

export type RegisterForm = Pick<User, 'handle' | 'email' | 'name'> & {
    password: string
    password_confirmation: string
}

export type LoginFrom = Pick<User, 'email'> & {
    password: string
}
//validacion en el formulario Editar  Perfil

export type ProfileForm = Pick<User, 'handle' | 'description'>


export type SocialNetwork = {
    id: number
    name: string
    url: string
    enabled: boolean
}
export type DevTreeLink = Pick<SocialNetwork, 'name' | 'url' | 'enabled'>


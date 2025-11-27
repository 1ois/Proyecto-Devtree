import React from 'react'
import ReactDON from 'react-dom/client'
import Router from './router'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryclient = new QueryClient()

ReactDON.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
//antes para crear el react usamos una herramienta vital por el cmd en modo administrador 
// C:\Devtree>npm create vite@latest
//instalamos el tailwindcss  npm install -D tailwindcss@3 postcss autoprefixer
//luego de intalar se tiene que inicializar npx tailwindcss init -p
//luego instalarmos el router de react npm i react-router-dom
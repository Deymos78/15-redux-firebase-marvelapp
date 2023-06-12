import { Navigate, Route, Routes } from "react-router-dom"
import { MarvelRoutes } from "../marvelapp/routes/MarvelRoutes"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks/useCheckAuth"
import { CheckingAuth } from "../ui/components/CheckingAuth"


export const AppRouter = () => {

  // Almacenamos el estado del usuario dentro de una constante
  const status = useCheckAuth();

  // Realizamos la comprobacion de cuando
  if( status == 'checking'){

    return <CheckingAuth/>

  }

  return (

    // Aqui encapsularemos las rutas principales de la aplicacion
    <Routes>

        {/* RUTAS DE MARVE */}

        {
          // Realizamos una comprobacion de si esta autenticado  o no con el status
          (status  === 'authenticated' )
          // Si el usuario esta loggeado entonces le damos acceso a las rutas de Marve
          ? <Route path="/*" element={ <MarvelRoutes /> } />
          // Si no lo  esta entonces se ira para el login
          : <Route path="/auth/*" element={ <AuthRoutes /> } />
        }

        {/* SI NO ESTAMOS AUTENTICADOS E INTENTAMOS ACCEDER A CUALQUIER OTRA RUTA FORZAMOS LA REDIRECCION AL LOGIN
          SINO SE QUEDARIA EN BLANCO LA PANTALLA YA QUE NO HAY FORMA DE QUE VAYA AL LOGIN DE MANERA FORZOSA */}
        <Route path="/*" element={ <Navigate to="/auth/login" /> } />

    </Routes>
    
  )
}

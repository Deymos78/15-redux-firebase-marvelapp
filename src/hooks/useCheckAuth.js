import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";
import { startLoadingHeroes } from "../store/marvel";



export const useCheckAuth = () => {

    // Recuperamos la instancia del estado de la aplicacion
    const { status } = useSelector( state => state.auth);

    // Recuperamos la instancia de el useDispatch para poder depachar las acciones del store
    const dispatch =  useDispatch();

    // Solo necesitaremos cada vez que se renderize la pagina o se vuelva a cargar
    useEffect(() => {

        // Esta funcion realizara una comprobacion cada vez que cambie  el estado del cliente dentro de Firebase
        // Cuando se realize un Inicio de Sesion o cuando se produzca un Logeo usando los metodos de Firebase
        onAuthStateChanged(FirebaseAuth, async( user )=>{


            // REalizamos una comprobacion para ver si hemos recibido un usuario, si no lo recibimos entonces colocaremos el estado
            // de la aplicacion en logout
            if( !user ) return dispatch( logout() );

            // Desestructuraremos el usuario que hemos recibido 
            const { uid, displayName, photoURL, email } = user;

            // Colocaremos el estado del usuario en loggeado 
            dispatch( login( {uid, displayName, photoURL, email} ) );
            dispatch( startLoadingHeroes());
        });
    }, [])

    // Devolveremos el estado despues de realizar la comprobacion
    return status;
    
}
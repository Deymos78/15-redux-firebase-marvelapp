// AQUI ES DONDE SE COLOCARAN LAS FUNCIONES QUE SEAN ASINCRONAS

import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice";



// Usamos la palabra 'start' para indicar que es una accion
// Indicamos que recibiremos dos argumentos 
export const startLoginWithEmailPassword = ({ email, password }) => {
    // Indicamos que es una funcion asincrona que toma como parametro dispatch
    return async( dispatch) => {

        // Como es una funcion asincrona entonces cambiaremos el estado del usuario a 'checking'
        dispatch( checkingCredentials() );


        const {ok, uid, displayName ,photoURL, errorMessage } = await loginWithEmailPassword({ email, password });

        if(!ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login( { uid, displayName, email, photoURL} ) );


    }
} 


// FUNCION PARA INICIO DE  SESION CON GOOGLE
export const startGoogleSignIn = () => {
    // RETORNAREMOS LA FUNCION ASINCRONA
    return async(dispatch) =>{
        // PRIMERO CAMBIAMOS EL ESTADO DEL STATUS
        dispatch( checkingCredentials() );

        const { displayName, email, photoURL, uid, ok, errorMessage } = await signInWithGoogle();
        
        if( !ok ) dispatch( logout( {errorMessage} ) );

        dispatch( login( {displayName, email, photoURL, uid} ) );
        

    }

}

// Crearemos una funcion asincrona para poder registrar nuestro usuario nuevo 
export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async( dispatch ) =>{

        // Cambiamos el status
        dispatch( checkingCredentials());

        // registerUserWithEmailPassword --> Metodo creado para que lo gestiones junto con Firebase 
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName});
        
        // Comprobamos que el llamado haya sido exitoso, dependiendo de la respuesta realizaremos una acciona u otra
        // Si no es exitosa colocamos el estado en desconectado
        if(!ok) return dispatch( logout({ errorMessage }));
    

        // Si la respuesta es exitosa entonces cambiamos el estado de la aplicacion en funcion de la respuesta
        dispatch( login( { uid, displayName, email, photoURL } ) );

    }
}


// INICIAR EL CIERRE  DE SESION EN FIREBASE
export const startLogout = () => {
    return async( dispatch ) => {
        
        // Cambiamos el estatus 
        dispatch( checkingCredentials() );

        await logoutFirebase();

        // Usaremos el dispatch para colocar el estado en logout
        dispatch( logout() );

    }
}
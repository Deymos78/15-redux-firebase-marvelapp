import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';

// AQUI ESTARAN TODAS LAS ACCIONES QUE QUERAMOS HACER CON NUESTRO PROVEEDOR
// TODAS LAS ACCIONES EN ESTE LADO AL SER UNA PETICION A UNA API SERAN ASINCRONAS POR LA PROPIA NATURALEZA DE LA FUNCION
// USAREMOS FUNCION DE LA PROPIA API DE FIREBASE PARA REALIZAR LAS ACCIONES 

// CONSEGUIMOS LA INSTANCIA DE AUTENTICACION DE GOOGLE 
const googleProvider = new GoogleAuthProvider();


// Creamos una funcion para poder registrar nuestro usuario usando nuestro proveedor Firebase
// Indicamos los argumentos que recibiremos
export const registerUserWithEmailPassword = async({ email, password, displayName }) => {
    // AL SER UNA FUNCION ASINCRONA USAREMOS TRY CATCH
    try {

        // Esta funcino nos pide la instancia de Firebase de autenticacion la cual se crea insertandole la configuracion de Firebase, ademas de email y password
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid,  photoURL} = resp.user;

        // Como en la creacion de usuario con email y password no se pide el nombre tenemos que actualiza el usuario para colocarle el nombre a mano
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        // Una vez ha terminado la ejecucion devolveremos la respuesta
        return{
            ok: true,
            uid, photoURL
        }

    } catch (error) {
        // SI FALLA SALTARA A ESTE PUNTO        
        return{
            ok: false,
            errorMessage: error.message
        }
    }

}


// MEDIANTE ESTA FUNCION CONSEGUIREMOS INICIAR SESION CON UN USUARIO DE GOOGLE
export const signInWithGoogle = async() => {
    try {

        // NOS DEVOLVERA EL USUARIO DE NUESTRO PROVEEDOR DE GOOGLE
        const resp = await signInWithPopup(FirebaseAuth, googleProvider );

        // DESESTRUCTURAMOS EL USUARIO DE GOOGLE
        const { displayName, email, photoURL, uid } = resp.user;

        // RETORNAMOS LA RESPUESTA
        return{
            ok: true,
            displayName, email, photoURL, uid
        }
        
    } catch (error) {
        return{
            ok: false,
            errorMessage
        }
        
    }
} 


export const loginWithEmailPassword = async({ email, password }) => {
    try {
        // Esta respuesta siempre envia un usuario en caso de ser exitosa y un error en caso de no serlo
        const resp = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        
        const {uid, displayName ,photoURL } = resp.user;

        return{
            ok: true,
            uid, displayName ,photoURL
        }

    } catch (error) {
        return{
            ok: false,
            error: error.message
        }
    }
}


// METODO ASINCRONO PARA INVALIDAR EL TOKEN DE SESION DE FIREBASE
export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut();

}
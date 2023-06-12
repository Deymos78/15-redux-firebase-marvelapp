import { createSlice } from '@reduxjs/toolkit';

// Los Slices son un parte especifica del estado de la aplicacion y las funciones relacionadas a ese estado
export const authSlice = createSlice({
    // Nombre del Slice
    name: 'auth',
    // Estado Inicial del State
    initialState: {
        status: 'checking', // 'checking' 'not-authenticated' 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
    },
    // Estos son los Reducers
    reducers: {
        // Cuando se haga login entonces cambiamos el status y colocamos los datos de la persona
        login: ( state, { payload }) => { 
            state.status= 'authenticated';
            state.uid= payload.uid;
            state.email= payload.email;
            state.displayName= payload.displayName;
            state.photoURL= payload.photoURL;
            state.errorMessage= null;

        },
        // Cuando hagamos el logout se cambia el status y se limpian las propiedades  y se coloca el mensaje de error si hay mensaje de error
        logout: ( state, { payload }) => {
            state.status='not-authenticated';
            state.uid=null;
            state.email=null;
            state.displayName=null;
            state.photoURL=null;
            state.errorMessage= payload?.errorMessage;
            
        },
        // Esta funcion se ejecutara cuando se este verificando al usuario
        checkingCredentials: ( state ) => {
            state.status = 'checking'
        }
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
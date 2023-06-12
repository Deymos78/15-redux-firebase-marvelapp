import { createSlice } from '@reduxjs/toolkit';

// Creamos una Slice para el estado de Marvel
export const marvelSlice = createSlice({
    // Este es el nombre del Slice
    name: 'marvel',
    // Este es el estado Inicial
    // initialState: {
    //     id: null,
    //     name: null,
    //     heroImg: null,
    //     first_appearance: null,
    //     publisher: null,
    //     alignment: null,
    // },
    // Colocamos el estado inicial del objeto
    initialState: {
        // Tendremos el almacenamiento de objetos para los heroes
        heroesobj: [],
        isLoading: false,
        // Con el active podremos saber cual es el Heroe activo actual para mostrarlo en la tarjeta de Heroe
        active: null
    },
    // Aqui estaran todas las acciones las cuales seran sincronas nunca asincronas  
    reducers: {
        heroesByPublisher: (state, {payload} ) => {
            state.heroesobj = payload;
        },
        setHeroes: ( state, action ) =>{
            state.heroesobj = action.payload;
            state.isLoading = false;

        },
        setActiveNote: (state, action ) =>{

        },
        loadingHeroes: (state ) =>{
            state.isLoading = true;
        }

    }
});


// Action creators are generated for each case reducer function
export const { heroesByPublisher, setHeroes, loadingHeroes } = marvelSlice.actions;
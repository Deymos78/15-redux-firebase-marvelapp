import { collection, doc, setDoc } from "firebase/firestore/lite";
import { getHeroesByPublisher } from "../../marvelApi/providers"
import { heroesByPublisher, loadingHeroes, setHeroes } from "./marvelSlice";
import { FirebaseDB } from "../../firebase/config";
import { loadAllHeroes } from "../../marvelApi/helpers";
import { CompressSharp } from "@mui/icons-material";


export const startHeroesByPublisher = () => {

        return async( dispatch ) => {

            const {ok, resp} = await getHeroesByPublisher();

            console.log(resp);
            console.log(ok);

            dispatch(heroesByPublisher({resp}) );


        }
}

// RECUPERAREMOS UNA CANTIDAD DE HEROES
export const startLoadingHeroes = ( ) =>{
    return async( dispatch, getState ) =>{

        // COLOCAMOS EL ESTADO EN ISLOADING EN TRUE 
        dispatch(loadingHeroes());

        // RECOGEMOS LAS REFERENCIAS DE LOS SLICES
        const { uid } = getState().auth;
        const { heroesobj, isLoading } = getState().marvel;

        // DATOS NECESARIOS
        let apiDirection='https://www.superheroapi.com/api.php/244145151627647/';
        let arrayUrlsPromises =[];

        // Bucle para crear un bloque de urls para hacer las peticiones
        for (let index = 0; index < 50; index++) {
            let aux = (index+1).toString();
            arrayUrlsPromises = [...arrayUrlsPromises, apiDirection+aux ]; 
        }        

        // VAMOS A LA BASE DE DATOS A COMPROBAR QUE LA COLECCION EXISTA 
        const comprobacion = await loadAllHeroes( uid ) ;

        console.log( comprobacion.length === 0  );
        // COMPROBAMOS EL RESULTADO DE LA CONSULTA
        // El resultado deberia de ser un array de objetos y la compracion de resultados daria true
        if( comprobacion.length !== 0){

            dispatch( setHeroes(comprobacion) );

        }else{

            // TIPOS DE EDITORAS DE LOS COMICS
            // 'DC Comics' 'Marvel Comics' 'NBC - Heroes' 'Sharon Carter' 'Goliath'

            // Creamos las promesas para pasarselas al PromiseAll
            const fetchPromises = arrayUrlsPromises.map( url => fetch(url));
            const resp = await Promise.all( fetchPromises ).
                then(responses => {

                    const dataPromises = responses.map(response => response.json())

                    return Promise.all( dataPromises );
                }).
                then( results =>{

                    let arrayobj = [];

                    results.forEach( data =>{
                        
                        let objAux = {
                            id: parseInt(data.id),
                            name: data.name,
                            heroImg: data.image.url,
                            first_appearance: data.biography['first-appearance'],
                            publisher: data.biography.publisher,
                            alignment: data.biography.alignment
                        }
                        arrayobj = [ ...arrayobj, objAux ];
                    })

                    return arrayobj;
                }).
                catch(error => {
                    console.log( 'Error '+ error );
                });
                resp.forEach(hero => {
                    const newDoc = doc( collection( FirebaseDB, `${uid}/marvel/listHeroes` ));
        
                    setDoc( newDoc, hero);
                });

                dispatch( setHeroes( resp ) )
        }

    }
}






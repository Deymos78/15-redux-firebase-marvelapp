import { collection, getDocs } from "firebase/firestore/lite";
import { url } from "./config";
import { FirebaseDB } from "../firebase/config";


export const getArrayURLs = () =>{    

    let arrayUrls = [];

    for (let index = 0; index < 20; index++) {
        let aux = (index+1).toString();
        arrayUrls=[...arrayUrls,url+aux]; 
    }
    return arrayUrls;
}



export const generateHeroesListByPublisher = async() =>{

    let arrayobj =[];
    const respArrUrls = getArrayURLs();
    const fetchPromised = respArrUrls.map(url => fetch(url));
    console.log('ESTAS SON LAS URLS');
    console.log(respArrUrls);


    await Promise.all(fetchPromised).
                        then(responses =>{
                            const dataPromises = responses.map( respose => respose.json());

                            return Promise.all(dataPromises);
                            
                        }).
                        then(results =>{
                            results.forEach(data =>{
                                if (data.biography.publisher == 'Marvel Comics'){
                                    let obj ={id: data.id,
                                        name: data.name,
                                        img: data.image.url,
                                        first_appearance: data.biography.first_appearance,
                                        publisher: data.biography.publisher,
                                        alignment: data.biography.alignment
                                    }
                                    arrayobj = [...arrayobj, obj]
                                } 
                                
                                
                            })
                            
                    
                        }).
                        catch(error => {
                            console.log(error);
                        });

        return arrayobj;
}


// CON ESTA FUNCIONA RECUPERAREMOS TODOS LOS HEROES EN FUNCION DE NUESTRO USUARIO
export const loadAllHeroes = async( uid ='') => {

    if( !uid ) throw new Error( 'El UID del usuario no existe' );

    const collectionRef = collection( FirebaseDB, `${uid}/marvel/listHeroes` );

    const docs = await getDocs(collectionRef);

    const heroes = [];

    docs.forEach(doc => {

        heroes.push( {...doc.data()} )
    })
    
    return heroes;
}
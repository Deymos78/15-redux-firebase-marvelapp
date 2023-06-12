import { generateHeroesListByPublisher, getArrayURLs } from "./helpers";


export const getHeroesByPublisher = async() => {
    
    try {        

        const resp =  await generateHeroesListByPublisher();
        console.log(resp);

        return{
            ok: true,
            resp
        }

        
    } catch (error) {

        return{
            ok: false,
            errorMessage: error.message
        }
        
    }
}
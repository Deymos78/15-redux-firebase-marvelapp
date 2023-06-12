import { Button, Grid, Typography } from "@mui/material"
import { startHeroesByPublisher } from "../../store/marvel"
import { useDispatch, useSelector } from "react-redux"
import { HeroItem } from "./HeroItem";

// Esta es una vista que mostrara toda la lista de elementos de heroes
export const HeroList = ({publisher = ''}) => {

  const { heroesobj, isLoading } = useSelector(state => state.marvel); 

  const heroesByPublisher = heroesobj.filter( hero => hero.publisher === publisher);
  return (
    <Grid container
      spacing={ 5 }
      // justifyContent="center"
      // wrap="wrap"
    >
      {
        ( !isLoading)
        ? 
        (heroesByPublisher.map( hero =>(
          <HeroItem 
            key={ hero.id} 
            { ...hero }
          />
        )))
        : 
        (<Typography> Loading...</Typography>)
        
      }
      
    
    </Grid>
    
  )
}

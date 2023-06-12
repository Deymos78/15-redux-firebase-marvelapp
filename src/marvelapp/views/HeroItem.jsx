import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, Grow, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

export const HeroItem = ({ id, name, heroImg, first_appearance, publisher, alignment }) => {

  return (
    <Grid item
      // justifyContent="column"
    >
        <Card 
          style={{
            borderRadius: 20,
            backgroundColor:   alignment.toUpperCase() === 'GOOD' ? '#c5cef4' : '#d9989c' 
          }}
          sx={{ display: "flex"}}
          // elevation={ 20 }
        > 
        <CardMedia>
            <img src={heroImg} alt={name} width={250} height={350} style={{ borderRadius: 10}} />
        </CardMedia>
        <Box
          sx={{ display: 'flex', flexDirection: 'column'  }}
        >
          <CardContent
            sx={{
              width: 350,
              height: "100%",
              overflow: 'hidden'
            }}
            style={{
              textAlign: 'center',
              
            }}
          > 
            
            <Typography variant="h5" align="center"  sx={{fontSize: 25}} >{ name } </Typography>
            <Typography
              style={{
                fontWeight: 'bold',
                fontSize: 20
              }}
              sx={{
                color: alignment.toUpperCase() === 'GOOD' ? '#1b32a2' : '#a43335'
              }}
            >  
              { alignment.toUpperCase() } 
            </Typography>
            <Typography sx={{ fontSize: 20}} > { publisher }</Typography>

            <Typography sx={{ fontSize: 20}} > { first_appearance }</Typography>

          </CardContent>
        
        {/* AQUI SE REALIZARA LA REDIRECCION A OTRO LUGAR */}
          <CardActions
            sx={{
              width: '100%',
              justifyContent: 'center'
            }}
          > 
            <Link component={ RouterLink }  sx={{ mb: 2}} underline="none"  >
              Leer Mas ...
            </Link>
          </CardActions>

        </Box>
          
        </Card>

    
    </Grid>
  )
}

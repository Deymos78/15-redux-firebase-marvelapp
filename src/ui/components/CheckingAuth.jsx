
// ESTE SERA UN COMPONENTE QUE SE MOSTRARA CADA VEZ SE ESTE COMPROBANDO EL ESTADO DEL COMPONENTE

import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
  return (
    <Grid container
        spacing={ 0 }
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
        minHeight: '100vh', 
        backgroundColor: 'primary.main', 
        padding: 4}} 
    >
        <Grid container
            direction='row'
            justifyContent="center"
              
        >
            {/* Esta es una animacion de material Ui que nos permitira mostrar un circulo a modo de carga */}
            <CircularProgress   color="warning" />
        </Grid>


    </Grid>
  )
}

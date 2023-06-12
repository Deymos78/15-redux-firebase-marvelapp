import { Grid, Typography } from "@mui/material"


export const AuthLayout = ({ children, title }) => {
  
  return (

    <Grid
      // indicamos que este componente sera un contenedor
      container
      spacing={ 0 }
      // La direccion  sera en columnas
      direction="column"
      // Centra el contenido columna centrada
      alignItems="center"
      // Envia todo el conteido al centro de la ventana
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
        
      }}
    >

      <Grid
        // Indicamos que este componente sera un item 
        item
        xs={ 3 }
        sx={{
          width: { sm: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}
      > 
        <Typography variant="h5" sx={{ mb: 1}} >{ title }</Typography>

        {children}
      </Grid>
      
    </Grid>
  )
}

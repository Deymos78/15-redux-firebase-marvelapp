import { Box, Toolbar } from "@mui/material"
import { NavBar } from "../components/NavBar"

const drawerWidth = 240;

// Este sera un componente de orden superior por lo que recibira los children de los componentes a los que encapsule
// Esta sera una plantilla que podremos colocar en cualquier pagina que queramos
export const MarvelLayout = ({ children }) => {
  return (
    <Box 
      sx={{ display: "flex"}}
    >
      {/* BARRA DE NAVEGACION */}

      <NavBar />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3}}
      >
        <Toolbar/>

        {children}
      </Box>


    </Box>
  )
}

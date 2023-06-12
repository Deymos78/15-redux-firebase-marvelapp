import { LogoutOutlined } from "@mui/icons-material"
import { AppBar, Box, Button, Grid, IconButton, Link, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { NavLink as RouterLink } from "react-router-dom"
import { startLogout } from "../../store/auth"
export const NavBar = () => {

  const { displayName } = useSelector( state => state.auth );


  const dispatch =  useDispatch();

  // Esta funcion lo que realizara es el cierre de sesion de Firebase
  const onLogout = () => {

    dispatch( startLogout() );

  }

  return (
    <AppBar
      position="fixed"
    >
      <Toolbar>
        
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png" 
            width="150"
            height="30"
            style={{ marginRight: '50px' }}
        /> 
         <Grid container
          direction="row"
          alignItems="center"
          spacing={3}
          
         > 
          <Grid item
            
          >
            
            <Button
              color="inherit"
              component={ RouterLink }
              to="/marvel"
              
              
            >
              <Typography color="inherit" >
                Marvel Page
              </Typography>

            </Button>

          </Grid>

          <Grid item

          >
              <Button
              color="inherit"
              component={ RouterLink }
              to="/dc"
            >
              <Typography color="inherit" >
                DC Page
              </Typography>

            </Button>

          </Grid>

          <Grid item

          >
             <Button
              color="inherit"
              component={ RouterLink }
              to=""
            >
              <Typography color="inherit" >
                Search Page
              </Typography>

            </Button>

          </Grid>

        </Grid>
        
        <Grid container
          justifyContent="flex-end"
          direction="row"
          alignItems="center"
          spacing={ 2 }
        >
          <Grid item>
            { displayName }
          </Grid>

          <Grid item>
            <IconButton
              color='error' 
              onClick={ onLogout }
            >
              <LogoutOutlined/>
            </IconButton>
          </Grid>
        </Grid>

      </Toolbar>
    </AppBar>
  )
}

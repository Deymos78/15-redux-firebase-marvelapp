import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Google, Router } from "@mui/icons-material"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { useDispatch } from "react-redux"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"

export const LoginPage = () => {


  const dispatch = useDispatch();

  // Inicializamos el Custom Hook para el formulario
  const {formState, email, password, onInputChange} =  useForm({
    email:'',
    password: '',
  });

  const onGoogleSignIn = () => {

    dispatch(startGoogleSignIn());
  }

  const onSubmit = (event) =>{
    // Evitamos la recarga de la pagina
    event.preventDefault();

    dispatch(startLoginWithEmailPassword(formState));

  }
  return (
    <AuthLayout title= "Login" >
      <form onSubmit={ onSubmit } >
        <Grid container>
          <Grid item 
            xs={ 12 }
            sx={{ mt: 2}}
          >
            <TextField
              label= "Correo"
              type="email"
              placeholder="corre@google.com"
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }

            />
          </Grid>

          <Grid item 
            xs={ 12 }
            sx={{ mt: 2}}
          >
            <TextField
              label= "Contraseña"
              type="password"
              placeholder="Introducir Contraseña"
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container
            // Espaciado entre componentes
            spacing={ 2 }
            sx={{ mb: 2, mt: 1 }}

          >
            <Grid item
              xs={ 12 }
              sm={ 6 }
            >
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                type="submit"
              >
              Login

              </Button>

            </Grid>
            
            <Grid item
              xs={ 12 }
              sm={ 6 }
            >
              <Button
                color="secondary"
                variant="contained"
                fullWidth
                onClick={ onGoogleSignIn }

              >
                <Google/>
                <Typography sx={{ ml:1}}>Google</Typography>

              </Button>

            </Grid>

          </Grid>

          <Grid container
            direction="row"
            justifyContent="end"
          >
            <Link component={ RouterLink } color="secondary" to="/auth/register" >
              Crear una cuenta
            </Link>
            
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}

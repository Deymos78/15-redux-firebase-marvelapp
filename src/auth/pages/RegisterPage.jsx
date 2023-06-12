import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmailPassword } from "../../store/auth"
import { useMemo, useState } from "react"

const formData = {
  email: 'andres@gmail.com',
  password: '123456',
  displayName: 'Andres Hernandez',
}

// Estas seran las validaciones de cada campo 
const formValidations = {
  // La primera validacion es para saber si el valor del campo contien un arroba
  email: [ ( value ) => value.includes('@') ,'El correo debe de tener un @'],
  // La segunda comprobacion es para que la contraseña tenga al menos 5 caracteres
  password: [ ( value ) => value.length >= 5 , 'La Contraseña tiene que tener al menos 5 caracteres'],
  // La tercera comprobacion es para que el campo de nombre no este vacio
  displayName: [( value ) => value.length >= 1 , 'El nombre es obligatorio'],
}

export const RegisterPage = () => {

  // Como al inicio de cargar la pagina no se habra escrito nada entonces no podemos hacer que se vea rojo el formulario sin antes escribit algo
  const [formSubmitted, setformSubmitted] = useState(false);

  // Recuperaremos los datos del estado de la aplicacion
  const { status, errorMessage } =  useSelector( state => state.auth );

  // Aqui usaremos nuestro Custom Hook para gestionar los input
  const { formState, email, password, displayName, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations);

  // Ahora haremos una comprobacion para saber si se esta realizando algun peticion asincrona en el estado de la aplicacion
  const isCheckingAuthentication = useMemo( () => status == 'checking', [status] )

  // Usaremos una instancia de useDispatch para acceder a ciertos metodos
  const dispatch = useDispatch();

  // Funcion que se  ejecuta cuando se envia el formulario
  const onSubmit = (event) => {

    event.preventDefault();
    setformSubmitted(true);
    // No se podra realizar el envio del formulario si no se comprueba que todos los campos esten correctamente
    if( !isFormValid ) return ;

    dispatch(startCreatingUserWithEmailPassword( formState ));

  }

  return (
    <AuthLayout title="Registro" >
      <h1>FormValid: {isFormValid ? 'Valido' : 'No Valido'}</h1>

      <form  onSubmit={ onSubmit } >
        <Grid container>
          {/* NOMBRE COMPLETO */}
          <Grid item 
            xs={ 12 }
            sx={{ mt: 2}}
          >
            <TextField
              label= "Nombre Completo"
              type="text"
              placeholder="Alberto Hernandez"
              fullWidth
              name="displayName"
              value={ displayName }
              onChange={ onInputChange }
              error= { !!displayNameValid && formSubmitted } 
              helperText= { formSubmitted ? displayNameValid : '' }
            />
          </Grid>
          
          {/* EMAIL */}
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
              error= { !!emailValid && formSubmitted } 
              helperText= { formSubmitted ? emailValid : '' }
            />
          </Grid>

          {/* CONTRASEÑA */}
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
              error= { !!passwordValid && formSubmitted } 
              helperText= { formSubmitted ? passwordValid : '' }
            />
          </Grid>

          {/* CONTIENE EL BOTON DE REGISTRO */}
          <Grid container
            // Espaciado entre componentes
            sx={{ mb: 2, mt: 2 }}

          >
            <Grid item
              xs={ 12 } 
              display={ !!errorMessage ? '' : 'none'}
            >
              <Alert severity="error" > { errorMessage } </Alert>
            </Grid>
            <Grid item
              xs={ 12 }
              sm={ 12 }
            >
              <Button
                disabled={ isCheckingAuthentication }
                color="secondary"
                variant="contained"
                fullWidth
                type="submit"
              >
              Crear Cuenta
              </Button>

            </Grid>
          </Grid>

          {/* REDIRECCION A LOGIN */}
          <Grid container
            direction="row"
            justifyContent="end"
          >
            <Typography sx={{ mr: 1 }} >¿Ya tienes una cuenta?</Typography>

            <Link component={ RouterLink } color="secondary" to="/auth/login" >
              Iniciar Sesion
            </Link>
            
          </Grid>
        </Grid>
      </form>

    </AuthLayout>
    
  )
}

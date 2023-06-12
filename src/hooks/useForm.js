import { useEffect, useMemo, useState } from 'react';

// Ajustamos el CustomHook para que admita dos objetos como parametros
export const useForm = ( initialForm = {}, formValidations = {}  ) => {
  
    // Este useState Almacenara los datos del formulario
    const [ formState, setFormState ] = useState( initialForm );
    // Este useState almacenara un objeto el cual sera el pbjeto de las validaciones
    const [formValidation, setformValidation] = useState({})

    // Usaremos un useEffect para que cada vez que cambien los valores del formState se ejecuten las valiciones de cada campo
    useEffect(() => {
      
        createValidators();

    }, [formState]);

    // Guardaremos en una constante si el formulario cumple con todas las condiciones y se ejecutara cada vez que se modifiquen el objeto de las validaciones
    const isFormValid = useMemo( () =>  {

        // Recorreremos cada valor dentro de formValidation 
        for (const formValue of Object.keys( formValidation ) ) {
            // Realizamos una comprobacion, si nos encontramos con un valor que sea null entonces retornamos false
            if ( formValidation[formValue] !== null ) return false;
            
        }

        return true;
    }, [ formValidation ]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }
    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        // El for of recorre las claves de un objeto
        for(const formField of Object.keys( formValidations )){

            // Ahora desestructuramos la clave del objeto en funcion del formFiel para obtener la funcion y el mensaje de error de cada clave
            // dentro del objeto
            // Colocamos un mensaje por defecto en caso de que el errorMessage no venga con ninguno definido
            const [ fn, errorMessage = 'Este campo es requerido'] = formValidations[formField];

            // En cada iteracion del objeto formValidations creamos otro objeto literal, que se creara con las propiedades mas el nombreValid
            // y con el resultado de la funcion pasandole como argumento el valor del formState y accediento a el a con la iteracion del
            // objeto formField
            // En cada propiedad se guardara o bien un valor null o un bien un mensaje de error dependiendo del resultado de la funcion
            formCheckedValues[`${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage ; 
        }
        // Por ultimo lo que haremos es guardar el objeto con la funcion setformValidation
        setformValidation( formCheckedValues );

    }


    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation, 
        isFormValid
    }
}
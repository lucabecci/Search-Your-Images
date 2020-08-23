import React, { useState } from 'react'
import Error from './Error';
const Formulario = ({guardarBusqueda}) => {

    //Usestate para guardar lo que el usuario escriba
    const [termino, guardarTermino]  = useState('');

    //State para el error
    const [error, guardarError] = useState(false);
    //func para la busqueda de imagenes
    const buscarImagenes = e =>{
        e.preventDefault();
        //validar
        if(termino.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //enviar el texto de busqueda hacia el componente principal
        guardarBusqueda(termino);
    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Search your image, example: Soccer'
                    onChange={e => guardarTermino(e.target.value)}
                    />
                </div>

                <div className='form-group col-md-4'>
                    <input
                    type='submit'
                    className='btn btn-lg btn-primary btn-block'
                    value='Search'
                    />
                </div>
            </div>
            {error ? <Error mensaje='Agrega un termino de busqueda'/> : null }
        </form>
    )
}

export default Formulario

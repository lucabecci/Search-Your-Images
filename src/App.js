import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  //State de la app
  //state de la busqueda
  const [busqueda, guardarBusqueda] = useState('');
  //State para las imagenes
  const [imagenes, guardarImagenes] = useState([]);
  //State para el paginado actual
  const [paginaActual, guardarPaginaActual] = useState(1);
  //State para el total de paginas
  const [totalPaginas, guardartotalPaginas] = useState(1);
  //UseEffect para cada vez que busqueda cambia
  useEffect(() => {
    //Funcion para la consulta y llamada de la api
    const consultarApi = async() =>{
      //if para que al principio de la carga de la pagina no haga la busqueda.
      if(busqueda === '') return;

      //constante para la limitacion de imagenes en la pagina(usar paginacion)
      const imagenesPorPagina = 30;
      //key y apiURL de pixabay
      const key = '18017373-2ab9edb09d6f71b2a6e705ac6';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const respuesta = await fetch(url);
      const data = await respuesta.json();
      guardarImagenes(data.hits);

      //Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(data.totalHits / imagenesPorPagina);
      guardartotalPaginas(calcularTotalPaginas)

      //Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})
    }
    consultarApi()
  }, [busqueda, paginaActual])

  //Definimos la pagina anterior
  const paginaAnterior = ()=> {
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
  //Definimos la pagina siguiente
  const paginaSiguiente = ()=> {
    const nuevaPaginaActual = paginaActual + 1;

    if(nuevaPaginaActual > totalPaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }
  return (
    <>
      <div className='container'>
        <div className='jumbotron'>
        <h3 className='text-center'>Luca Becci On GitHub</h3>
          <p className='lead text-center'>Search your images</p>
          <Formulario
          guardarBusqueda={guardarBusqueda}
          />
        </div>

        <div className='row justify-content-center'>
          <ListadoImagenes 
            imagenes ={imagenes}
          />
          
          {(paginaActual === 1) ? null : (
            <button
            type='button'
            className='btn btn-danger mr-1'
            onClick={paginaAnterior}
            >&laquo; Last</button>
          )}

          {(paginaActual === totalPaginas ? null: (
            <button
            type='button'
            className='btn btn-danger'
            onClick={paginaSiguiente}
            >Next &raquo;</button>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

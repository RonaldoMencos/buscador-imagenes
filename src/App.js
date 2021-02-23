import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return;
      const imagenesPorPagina = 12;
      const key = "20368670-c3b8cbe928409a71fd33b39ef";
      const url = `http://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);

      //Mover pagina arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth'})
    };
    consultarAPI();
  }, [busqueda,paginactual]);

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginactual -1;
    if (paginactual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginactual +1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="text-center">Buscador de Imagenes</h1>
        <br />
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
        
        {(paginactual === 1 )? null : (
          <button 
          type="button" 
          className="bbtn btn-info mr-1"
          onClick={paginaAnterior}   
        >
          &laquo; Anterior 
        </button>)
        }
        
        {(paginactual === totalpaginas) ? null : (
          <button 
          type="button" 
          className="bbtn btn-info"
          onClick={paginaSiguiente}   
        >
          Siguiene &raquo;
        </button>
        )}
      </div>
    </div>
  );
}

export default App;

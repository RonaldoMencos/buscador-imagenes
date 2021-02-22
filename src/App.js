import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";

function App() {
  const [busqueda, guardarBusqueda] = useState("");

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return;
      const imagenesPorPagina = 30;
      const key = "20368670-c3b8cbe928409a71fd33b39ef";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarBusqueda(resultado.hits);
    }
    consultarAPI();
  }, [busqueda]);
  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="text-center">Buscador de Imagenes</h1>
        <br />
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
    </div>
  );
}

export default App;

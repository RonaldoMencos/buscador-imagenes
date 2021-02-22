import React, { useState } from "react";
import Error from './Error'
const Formulario = ({guardarBusqueda}) => {
  const [texto, actualizarTexto] = useState("");
  const [error, guardarError] = useState(false);

  const textoEnviado = e => {
      e.preventDefault();
      if (texto.trim() === '') {
          guardarError(true);
          return;
      }
      guardarError(false);
      guardarBusqueda(texto);
  }

  return (
    <form
        onSubmit={textoEnviado}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            onChange={(e) => actualizarTexto(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>
      {error ? <Error mensaje="Agregar un texto válido." /> : null}
    </form>
  );
};

export default Formulario;

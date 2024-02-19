// import React, { useState } from "react";

// function FiltrosBuscar({ onFilterChange }) {
//   const [peso, setPeso] = useState("");
//   const [orderAlfabet, setOrderAlfabet] = useState("");
//   const [temperamentSelected, setTemperamentSelected] = useState("");
//   const [razaSelected, setRazaSelected] = useState("");

//   const handlePesoChange = (e) => {
//     const selectedPeso = e.target.value;
//     setPeso(selectedPeso);
//     onFilterChange({ peso: selectedPeso });
//   };

//   const handleOrderAlfabetChange = (e) => {
//     const selectedOrder = e.target.value;
//     setOrderAlfabet(selectedOrder);
//     onFilterChange({ orderAlfabet: selectedOrder });
//   };

//   const handleTemperamentChange = (e) => {
//     const selectedTemperament = e.target.value;
//     setTemperamentSelected(selectedTemperament);
//     onFilterChange({ temperament: selectedTemperament });
//   };

//   const handleRazaChange = (e) => {
//     const selectedRaza = e.target.value;
//     setRazaSelected(selectedRaza);
//     onFilterChange({ raza: selectedRaza });
//   };

//   return (
//     <div className="container-todos-select">
//       <div className="select-container">
//         <p className="p-select">Ordenar por peso:</p>
//         <select value={peso} onChange={handlePesoChange}>
//           <option value="liviano-pesado">Más liviano a más pesado</option>
//           <option value="pesado-liviano">Más pesado a más liviano</option>
//         </select>
//       </div>
//       <div className="select-container">
//         <p className="p-select">Ordenar alfabeticamente:</p>
//         <select value={orderAlfabet} onChange={handleOrderAlfabetChange}>
//           <option value="asc-desc">Ascendente a descendente</option>
//           <option value="desc-asc">Descendente a ascendente</option>
//         </select>
//       </div>
//       <div className="select-container">
//         <p>Filtrar por temperamento:</p>
//         <select onChange={handleTemperamentChange}>
//           <option value={""}>Seleccionar filtro</option>
//           {/* Aquí deberías mapear los temperamentos disponibles */}
//         </select>
//       </div>
//       <div className="select-container">
//         <p>Filtrar por raza:</p>
//         <select onChange={handleRazaChange}>
//           <option value={""}>Seleccionar filtro</option>
//           {/* Aquí deberías mapear las razas disponibles */}
//         </select>
//       </div>
//     </div>
//   );
// }

// export default FiltrosBuscar;
import React, { useState } from "react";

function FiltrosBuscar({ onFilterChange, onSortChange }) {
  const [filtroTemperamento, setFiltroTemperamento] = useState("");
  const [filtroOrigen, setFiltroOrigen] = useState("");
  const [ordenRazaAlfabetico, setOrdenRazaAlfabetico] = useState("asc");
  const [ordenPeso, setOrdenPeso] = useState("asc");

  const handleTemperamentoChange = (temperamento) => {
    setFiltroTemperamento(temperamento);
    onFilterChange({ temperamento });
  };

  const handleOrigenChange = (origen) => {
    setFiltroOrigen(origen);
    onFilterChange({ origen });
  };

  const handleOrdenRazaAlfabeticoChange = () => {
    const nuevoOrden =
      ordenRazaAlfabetico === "asc" ? "desc" : "asc";
    setOrdenRazaAlfabetico(nuevoOrden);
    onSortChange({ tipo: "alfabetico", orden: nuevoOrden });
  };

  const handleOrdenPesoChange = () => {
    const nuevoOrden = ordenPeso === "asc" ? "desc" : "asc";
    setOrdenPeso(nuevoOrden);
    onSortChange({ tipo: "peso", orden: nuevoOrden });
  };

  return (
    <div className="container-todos-select">
      <div className="select-container">
      <div className="select-container">
        <p>Filtrar por origen:</p>
        <select onChange={(e) => handleOrigenChange(e.target.value)}>
          <option value="">Todos los orígenes</option>
          <option value="api">API</option>
          <option value="baseDatos">Base de datos</option>
        </select>
      </div>
        <p>Filtrar por temperamento:</p>
        <select onChange={(e) => handleTemperamentoChange(e.target.value)}>
          <option value="">Todos los temperamentos</option>
          {/* Aquí debes mapear los temperamentos disponibles */}
        </select>
      </div>
      <div>
        <p>Ordenar razas:</p>
        <button onClick={handleOrdenRazaAlfabeticoChange}>
           Razas por Orden alfabético {ordenRazaAlfabetico === "asc" ? "A-Z" : "Z-A"}
        </button>
      </div>
      <div>
        <p>Ordenar por peso:</p>
        <button onClick={handleOrdenPesoChange}>
          {ordenPeso === "asc" ? "Ascendente" : "Descendente"}
        </button>
      </div>
    </div>
  );
}

export default FiltrosBuscar;

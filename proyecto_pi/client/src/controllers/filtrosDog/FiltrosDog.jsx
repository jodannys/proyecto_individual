// import React, { useState } from 'react';

// function FilterSortOptions({ onFilterByTemperament, onFilterByOrigin, onSortByName, onSortByWeight }) {
//   const [sortBy, setSortBy] = useState('name');

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     if (e.target.value === 'nameAsc' || e.target.value === 'nameDesc') {
//       onSortByName(e.target.value);
//     } else {
//       onSortByWeight(e.target.value);
//     }
//   };

//   return (
//     <div>
//       <label>Filtrar por temperamento:</label>
//       <button onClick={() => onFilterByTemperament('Temperamento1')}>Temperamento1</button>
//       <button onClick={() => onFilterByTemperament('Temperamento2')}>Temperamento2</button>
//       {/* Agrega más botones de temperamento según tus necesidades */}

//       <label>Filtrar por origen:</label>
//       <select onChange={(e) => onFilterByOrigin(e.target.value)}>
//         <option value="api">API</option>
//         <option value="baseDatos">Base de Datos</option>
//       </select>

//       <label>Ordenar por:</label>
//       <select value={sortBy} onChange={handleSortChange}>
//         <option value="nameAsc">Nombre (A-Z)</option>
//         <option value="nameDesc">Nombre (Z-A)</option>
//         <option value="weightAsc">Peso (Ascendente)</option>
//         <option value="weightDesc">Peso (Descendente)</option>
//       </select>
//     </div>
//   );
// }

// export default FilterSortOptions;
import React, { useState } from 'react';

function FilterSortOptions({ onFilterByTemperament, onFilterByOrigin, onSortByName, onSortByWeight }) {
  const [selectedTemperament, setSelectedTemperament] = useState('');
  const [selectedOrigin, setSelectedOrigin] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleTemperamentChange = (e) => {
    const temperament = e.target.value;
    setSelectedTemperament(temperament);
    onFilterByTemperament(temperament);
  };

  const handleOriginChange = (e) => {
    const origin = e.target.value;
    setSelectedOrigin(origin);
    onFilterByOrigin(origin);
  };

  const handleSortChange = (e) => {
    const sortType = e.target.value;
    setSortBy(sortType);
    if (sortType === 'name') {
      onSortByName(sortType);
    } else if (sortType === 'weight') {
      onSortByWeight(sortType);
    }
  };

  return (
    <div>
      <select value={selectedTemperament} onChange={handleTemperamentChange}>
        <option value="">Filtrar por temperamento</option>
        {/* Aquí se pueden generar las opciones dinámicamente */}
        <option value="temperamento1">Temperamento 1</option>
        <option value="temperamento2">Temperamento 2</option>
      </select>

      <select value={selectedOrigin} onChange={handleOriginChange}>
        <option value="">Filtrar por origen</option>
        {/* Aquí se pueden generar las opciones dinámicamente */}
        <option value="api">API</option>
        <option value="database">Base de datos</option>
      </select>

      <select value={sortBy} onChange={handleSortChange}>
        <option value="">Ordenar</option>
        <option value="name">Nombre</option>
        <option value="weight">Peso</option>
      </select>
    </div>
  );
}

export default FilterSortOptions;

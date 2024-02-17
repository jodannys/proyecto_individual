// import React from 'react'
// import  "./DogPaginacion.css"

// const dogPaginacion = ({ itemsPorPag, totalPosts, paginate }) => {
//   const pageNumbers = [];
//   const division = Math.ceil(totalPosts / itemsPorPag)  //8 dogs / 4 = 2paginas
//   for (let i = 1; i <= division; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div>
//       <div className= "div-paginador">
//         {pageNumbers.map(number => (
//           <div>
//             <button className= "boton-paginador" onClick={() => paginate(number)}>
//               {number}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default dogPaginacion;
import React from 'react';
import './DogPaginacion.css';

const DogPaginacion = ({ itemsPorPag, totalPosts, paginate }) => {
  console.log("itemsPorPag:", itemsPorPag);
  const pageNumbers = [];
  const division = Math.ceil(totalPosts / itemsPorPag); 
  console.log("division:", division);

  for (let i = 1; i <= division; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="div-paginador">
        {pageNumbers.map(number => (
          <div key={number}>
            <button className="boton-paginador" onClick={() => paginate(number)}>
              {number}
           
            </button>
          </div>
        ))}
        {/* Botón de "Siguiente" */}
      
      </div>
    </div>
  );
};

export default DogPaginacion;

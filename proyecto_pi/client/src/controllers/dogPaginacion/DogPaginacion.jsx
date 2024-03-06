// import React from "react";
// import styles from "./DogPaginacion.module.css";

// const DogPaginacion = ({ itemsPorPag,currentPage,  totalPosts, paginate }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / itemsPorPag); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className={styles.container}>
//       <ul className={styles.pagination}>
//         {pageNumbers.map((number) => (
//           <li key={number} className={styles.page}>
//             <button className={styles.link} onClick={() => paginate(number)}>
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DogPaginacion;

// //?
// import React from "react";
// import styles from "./DogPaginacion.module.css";

// const DogPaginacion = ({ itemsPorPag, currentPage, totalPosts, paginate }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalPosts / itemsPorPag); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className={styles.container}>
//       <ul className={styles.pagination}>
//         {pageNumbers.map((number) => (
//           <li key={number} className={`${styles.page} ${currentPage === number ? styles.active : ''}`}>
//             <button className={styles.link} onClick={() => paginate(number)}>
//               {number}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DogPaginacion;
import React from "react";
import styles from "./DogPaginacion.module.css";

const DogPaginacion = ({ itemsPorPag, currentPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / itemsPorPag); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? styles.currentPage : styles.page}>
            <button className={styles.link} onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DogPaginacion;

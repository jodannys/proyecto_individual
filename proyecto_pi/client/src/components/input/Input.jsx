// import SearchBar from "../searhBar/SearhBar";
// import Card from "../card/Card";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// function Input() {
//   const dispatch = useDispatch();
//   const dogs = useSelector((state) => state.dogs);
//   const temperaments = useSelector((state) => state.temperaments);
//   const ochodogs = useSelector((state) => state.ochodogs);
//   const [peso, setPeso] = useState("");
//   const [orderAlfabet, setOrderAlfabet] = useState("");
//   const [temperamentSelected, setTemperamentSelected] = useState("");
//   const [razaSelected, setRazaSelected] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPorPag, setItemsPorPag] = useState(4);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/temperamentos`)
//       .then((res) => {
//         dispatch({
//           type: "TEMPERAMENTOS",
//           payload: res.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     axios.get(`http://localhost:3001/dogs`)
//       .then((res) => {
//         dispatch({
//           type: "RAZAS_DOGS",
//           payload: res.data,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const pesoSelectedChange = (e) => {
//     if (e.target.value === "liviano-pesado") {
//       dispatch({
//         type: "ordenar-liviano-pesado",
//       });
//     }
//     else if (e.target.value === "pesado-liviano") {
//       dispatch({
//         type: "ordenar-pesado-liviano",
//       });
//     }
//     setPeso(e.target.value);
//   };

//   const alfabetSelectedChange = (e) => {
//     if (e.target.value === "asc-desc") {
//       dispatch({
//         type: "ordenar-asc-desc",
//       });
//     }
//     else if (e.target.value === "desc-asc") {
//       dispatch({
//         type: "ordenar-desc-asc",
//       });
//     }
//     setOrderAlfabet(e.target.value);
//   };

//   const temperamentChange = (e) => {
//     let temperament = e.target.value;
//     setTemperamentSelected(temperament);
//   };

//   const razaChange = (e) => {
//     let raza = e.target.value;
//     setRazaSelected(raza);
//   };

//   const indexDelUltimoItem = currentPage * itemsPorPag;  // 1 * 4 
//   const indexDelPrimerItem = indexDelUltimoItem - itemsPorPag;
//   return (
//     <div className="fondo-buscar">
//       <div>
//         <div>
//           <SearchBar />
//           <div>
//             <Link to="/agregarperro"><button className="boton-agregar-perro">Agregar perro</button></Link>
//           </div>
//         </div>
//         <div className="container-todos-select">
//           <div className="select-container">
//             <p className="p-select">Ordenar por peso:</p>
//             <select value={peso} onChange={pesoSelectedChange}>
//               <option value="liviano-pesado">Más liviano a más pesado</option>
//               <option value="pesado-liviano">Más pesado a más liviano</option>
//             </select>
//           </div>
//           <div className="select-container">
//             <p className="p-select">Ordenar alfabeticamente:</p>
//             <select value={orderAlfabet} onChange={alfabetSelectedChange}>
//               <option value="asc-desc">Ascendente a descendente</option>
//               <option value="desc-asc">Descendente a ascendente</option>
//             </select>
//           </div>
//           <div className="select-container">
//             <p>Filtrar por temperamento:</p>
//             <select onChange={temperamentChange} >
//               <option value={''}>Seleccionar filtro</option>
//               {temperaments.map((el, index) => (
//                 <option key={index} value={el.name}>{el.name}</option>
//               ))}
//             </select>
//           </div>
//           <div className="select-container">
//             <p>Filtrar por raza:</p>
//             <select onChange={razaChange} >
//               <option value={''}>Seleccionar filtro</option>
//               {ochodogs.map((el, index) => (
//                 <option key={index} value={el.breed_group}>{el.breed_group}</option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="dogs-container">
//         {temperamentSelected &&
//           dogs
//             .filter((dog) => dog.temperament?.includes(temperamentSelected))
//             .slice(indexDelPrimerItem, indexDelUltimoItem)
//             .map((dog, index) => (
//               <Card
//                 key={index}
//                 img={dog.image?.url}
//                 name={dog.name}
//                 temperament={dog.temperament}
//                 id={dog.id} />
//             ))}
//         {razaSelected &&
//           dogs
//             .filter((dog) => dog.breed_group?.includes(razaSelected))
//             .slice(indexDelPrimerItem, indexDelUltimoItem)
//             .map((dog, index) => (
//               <Card
//                 key={index}
//                 img={dog.image?.url}
//                 name={dog.name}
//                 temperament={dog.temperament}
//                 id={dog.id} />
//             ))}
//         {!temperamentSelected && !razaSelected &&
//           dogs
//             .slice(indexDelPrimerItem, indexDelUltimoItem)
//             .map((dog, index) => (
//               <Card
//                 key={index}
//                 img={dog.image?.url}
//                 name={dog.name}
//                 temperament={dog.temperament}
//                 id={dog.id} />
//             ))}
//       </div>
//       {/* <div>
//         <Paginacion itemsPorPag={itemsPorPag} totalPosts={dogs.length} paginate={setCurrentPage} />
//       </div>   */}
//     </div>
//   );
// }

// export default Input;

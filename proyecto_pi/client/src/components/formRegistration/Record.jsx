// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import FormRegistration from "./FormRegistration";
// import {
//   Formulario,
//   Label,
//   InputCheckbox,
//   ContenedorTerminos,
//   ContenedorBotonCentrado,
//   Boton,
//   MensajeExito,
//   MensajeError,
//   Icono,
//   Texto,
// } from "./Formularios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faExclamationTriangle,
//   faArrowUpLong,
// } from "@fortawesome/free-solid-svg-icons";

// const Record = () => {
//   const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
//   const [password, cambiarPassword] = useState({ campo: "", valido: null });
//   const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
//   const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
//   const [terminos, cambiarTerminos] = useState(false);
//   const [formularioValido, cambiarFormularioValido] = useState(null);
//   const [apiUrl, setApiUrl] = useState(null); // Estado para almacenar la URL API
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Función para obtener la URL API del backend
//     const fetchApiUrl = async () => {
//       try {
//         const response = await axios.get("http://localhost:3001/api-url"); // Reemplaza 'puerto' por el puerto de tu servidor Express
//         setApiUrl(response.data.API_URL);
//       } catch (error) {
//         console.error("Error fetching API URL:", error);
//       }
//     };

//     fetchApiUrl(); // Llama a la función al montar el componente
//   }, []);

//   const expresiones = {
//     nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
//     password: /^.{4,12}$/,
//     correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
//   };

//   const validarPassword2 = () => {
//     if (password.campo.length > 0) {
//       if (password.campo !== password2.campo) {
//         cambiarPassword2((prevState) => {
//           return { ...prevState, valido: "false" };
//         });
//       } else {
//         cambiarPassword2((prevState) => {
//           return { ...prevState, valido: "true" };
//         });
//       }
//     }
//   };

//   const onChangeTerminos = (e) => {
//     cambiarTerminos(e.target.checked);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         apiUrl, // Utiliza la URL API obtenida del backend
//         {
//           name: nombre.campo,
//           email: correo.campo,
//           password: password.campo,
//         }
//       );

//       if (response.status === 201) {
//         cambiarFormularioValido(true);
//         cambiarNombre({ campo: "", valido: null });
//         cambiarPassword({ campo: "", valido: null });
//         cambiarPassword2({ campo: "", valido: null });
//         cambiarCorreo({ campo: "", valido: null });

//         setTimeout(() => {
//           cambiarFormularioValido(null);
//           navigate("/login");
//         }, 2000);
//       } else {
//         cambiarFormularioValido(false);
//       }
//     } catch (error) {
//       console.error("Error en la solicitud de registro:", error);
//       cambiarFormularioValido(false);
//     }
//   };

//   return (
//     <main>
//       <Formulario action="" onSubmit={onSubmit}>
//         <FormRegistration
//           estado={nombre}
//           cambiarEstado={cambiarNombre}
//           tipo="text"
//           label="Name"
//           placeholder=""
//           name="nombre"
//           leyendaError="The name can only contain letters and spaces."
//           expresionRegular={expresiones.nombre}
//         />
//         <FormRegistration
//           estado={correo}
//           cambiarEstado={cambiarCorreo}
//           tipo="email"
//           label="Email"
//           placeholder=""
//           name="correo"
//           leyendaError="Email can only contain letters, numbers, periods, hyphens and underscores."
//           expresionRegular={expresiones.correo}
//         />
//         <FormRegistration
//           estado={password}
//           cambiarEstado={cambiarPassword}
//           tipo="password"
//           label="Password"
//           name="password1"
//           leyendaError="The password must be 4 to 12 digits."
//           expresionRegular={expresiones.password}
//         />
//         <FormRegistration
//           estado={password2}
//           cambiarEstado={cambiarPassword2}
//           tipo="password"
//           label="Repeat password"
//           name="password2"
//           leyendaError="Both passwords must be the same."
//           funcion={validarPassword2}
//         />

//         <ContenedorTerminos>
//           <Label>
//             <InputCheckbox
//               type="checkbox"
//               name="terminos"
//               id="terminos"
//               checked={terminos}
//               onChange={onChangeTerminos}
//             />
//             I accept the terms and conditions
//           </Label>
//           <br />
//         </ContenedorTerminos>
//         {formularioValido === false && (
//           <MensajeError>
//             <p>
//               <FontAwesomeIcon icon={faExclamationTriangle} />
//               <b>Error:</b> Please fill out the form correctly.
//             </p>
//           </MensajeError>
//         )}
    
//         <ContenedorBotonCentrado>
//           <Boton type="submit">
//             <Texto>Submit </Texto>
//             <Icono>
//               <FontAwesomeIcon icon={faArrowUpLong} />
//             </Icono>
//           </Boton>
//           {formularioValido === true && (
//             <MensajeExito>¡Form submitted successfully!</MensajeExito>
//           )}
//         </ContenedorBotonCentrado>
//       </Formulario>
//     </main>
//   );
// };

// export default Record;

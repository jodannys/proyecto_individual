// import React from 'react';
// import { Input, Label, LeyendaError, IconoValidacion } from './Formularios';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// const FormRegistration = ({ estado, cambiarEstado, tipo, label, placeholder, name, leyendaError, expresionRegular, funcion }) => {
//   const onChange = (e) => {
//     // Asegúrate de que cambiarEstado sea una función válida antes de llamarla
//     if (typeof cambiarEstado === 'function') {
//       cambiarEstado({ ...estado, campo: e.target.value });
//     }
//   }

//   const validacion = () => {
//     if (expresionRegular) {
//       if (estado && expresionRegular.test(estado.campo)) {
//         cambiarEstado({ ...estado, valido: 'true' });
//       } else {
//         cambiarEstado({ ...estado, valido: 'false' });
//       }
//     }

//     if (funcion) {
//       funcion();
//     }
//   };

//   return (
//     <div>
//       <Label htmlFor={name} valido={estado.valido}>{label}</Label>
//       <Input 
//         type={tipo}
//         placeholder={placeholder} 
//         id={name}
//         value={estado.campo}
//         onChange={onChange}
//         onKeyUp={validacion}
//         onBlur={validacion}
//         valido={estado.valido}
//       />
//       <IconoValidacion 
//         icon={estado.valido === 'true' ? faCheckCircle : faTimesCircle}
//         valido={estado.valido}
//       />
//       <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
//     </div>
//   );
// }
 
// export default FormRegistration;

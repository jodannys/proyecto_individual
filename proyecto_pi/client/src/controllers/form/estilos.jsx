import styled, { css, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const colores = {
  borde: "#0075FF",
  error: "#bb2929",
  exito: "#1ed12d",
};

const Formulario = styled.form`
  box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
  background-color: #c4c1a7a9;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  max-width: 830px;
  margin: 9%;
  border-radius: 20px;
  background-position: center;
  margin-top: 2vw;
  padding: 70px;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    margin-top: 5vw;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  padding: 5px;
  min-height: 40px;
  cursor: pointer;
  font-size: 1rem;
  color: rgb(30, 248, 10);
  font-family: "Share Tech Mono", monospace;


  ${(props) =>
    props.valido === "false" &&
    css`
      color: ${colores.error};
    `}
`;

const GrupoInput = styled.div`
  position: relative;
  z-index: 80;
  left: 0%;
`;

const Input = styled.input`
  width: 80%;
  background: #ccbaba;
  border-radius: 3px;
  height: 45px;
  line-height: 45px;
  padding: 0 30px;
  padding: 0 40px; 
  transition: 0.3s ease all;
  border: 3px solid transparent;

  &:focus {
    border: 3px solid ${colores.borde};
    outline: none;
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 0.4);
  }

  ${(props) =>
    props.valido === "true" &&
    css`
      border: 3px solid transparent;
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      border: 3px solid ${colores.error} !important;
    `}
`;

const LeyendaError = styled.p`
  font-size: 15px;
  margin-bottom: 0;
  color: ${colores.error};
  display: none;

  ${(props) =>
    props.valido === "true" &&
    css`
      display: none;
    `}

  ${(props) =>
    props.valido === "false" &&
    css`
      display: block;
    `}
`;

const IconoValidacion = styled(FontAwesomeIcon)`
  position: absolute;
  right: 40px;
  bottom: 14px;
  z-index: 100;
  font-size: 18px;
  opacity: 0;

  ${(props) =>
    props.valido === "false" &&
    css`
      opacity: 1;
      color: ${colores.error};
    `}

  ${(props) =>
    props.valido === "true" &&
    css`
      opacity: 1;
      color: ${colores.exito};
    `}

@media (max-width: 800px) {
    right: 0px;
    font-size: 18px;
  }
`;

const InputCheckbox = styled.input`
  grid-column: span 2;

  input {
    margin-right: 10px;
  }

  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;

const ContenedorTerminos = styled.div`
  grid-column: span 2;

  input {
    margin-right: 10px;
  }

  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;

const ContenedorBotonCentrado = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: span 2;
  @media (max-width: 800px) {
    grid-column: span 1;
  }
`;

const Boton = styled.button`
  border: none;
  height: 45px;
  font-size: 1.5rem;
  line-height: 45px;
  width: 30%;
  background-color: #4ff800;
  border-radius: 10px;
  color: #1b1b19;
  font-weight: bold;
  cursor: pointer;
  transition: 0.1s ease all;
  align-items: center;
  padding: 0 10px;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    height: 50px;
    line-height: 40px;
    width: 80%;
  }

  &:hover {
    box-shadow: 3px 0px 30px rgba(163, 163, 163, 1);
    background-color: #00e8f8;
  }
`;

const Icono = styled.span`
  color: #00e7e7;
  margin-right: 20px;
  border-radius: 50%;
  background-color: rgba(102, 95, 95, 0.39);
  display: inline-block;
  width: 40px;
  height: 40px;

  @media screen and (max-width: 768px) {
    margin-right: 5px;
    width: 30px;
    height: 30px;
  }
`;

const Texto = styled.span`
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    margin-left: 5px;
  }
`;

const MensajeExito = styled.p`
  font-size: 20px;
  color: ${colores.exito};
`;

const MensajeError = styled.div`
  height: 45px;
  line-height: 45px;
  border: 3px solid #ac1919;
  background-color: #f66060;
  padding: 0px 15px;
  border-radius: 3px;
  grid-column: span 2;

  p {
    margin: 0;
    font-size: 14px;
  }
  b {
    margin-left: 10px;
  }
  @media (max-width: 800px) {
    p {
      font-size: 10px; /* Ajusta el tamaño de la fuente para pantallas más pequeñas */
    }
  }
`;

export {
  Formulario,
  Label,
  GrupoInput,
  Input,
  LeyendaError,
  IconoValidacion,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
  InputCheckbox,
  Icono,
  Texto,
};

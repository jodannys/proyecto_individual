import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ComponenteInput from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Validaciones from "./Validaciones";
import {
  Formulario,
  Label,
  InputCheckbox,
  ContenedorTerminos,
  ContenedorBotonCentrado,
  Boton,
  MensajeExito,
  MensajeError,
  Icono,
  Texto,
} from "./estilos";
import {
  faExclamationTriangle,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";

const Registro = () => {
  const [nombre, cambiarNombre] = useState({ campo: "", valido: null });
  const [password, cambiarPassword] = useState({ campo: "", valido: null });
  const [password2, cambiarPassword2] = useState({ campo: "", valido: null });
  const [correo, cambiarCorreo] = useState({ campo: "", valido: null });
  const [terminos, cambiarTerminos] = useState(false);
  const [formularioValido, cambiarFormularioValido] = useState(null);
  const navigate = useNavigate();

  const { validarNombre, validarCorreo, validarPassword, validarPassword2 } =
    Validaciones();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validarNombre(nombre.campo) ||
      !validarCorreo(correo.campo) ||
      !validarPassword(password.campo) ||
      !validarPassword2(password.campo, password2.campo)
    ) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/user", {
        name: nombre.campo,
        email: correo.campo,
        password: password.campo,
      });

      if (response.status === 200) {
        cambiarFormularioValido(true);
        cambiarNombre({ campo: "", valido: null });
        cambiarCorreo({ campo: "", valido: null });
        cambiarPassword({ campo: "", valido: null });
        cambiarPassword2({ campo: "", valido: null });
        cambiarTerminos(false);
        navigate("/login");
      } else {
        console.log("Error desconocido:", response); 
        cambiarFormularioValido(false);
      }
    } catch (error) {
      // console.error("Error al registrar usuario:", error);
      if (error.response && error.response.status === 400) {
        console.log("usuario ya registrado");
        // Error de solicitud incorrecta (por ejemplo, usuario ya registrado)
        cambiarFormularioValido(false);
        // Mostrar un mensaje al usuario
      } else {
        // Otro tipo de error
        console.log("Error general:", error);
        cambiarFormularioValido(false);
        // Mostrar un mensaje de error general al usuario
      }
    }
  }
  return (
    <main>
      <Formulario action="" onSubmit={handleSubmit}>
        <ComponenteInput
          estado={nombre}
          cambiarEstado={cambiarNombre}
          tipo="text"
          label="Name"
          placeholder=""
          name="nombre"
          leyendaError="The name can only contain letters and spaces."
        />
        <ComponenteInput
          estado={correo}
          cambiarEstado={cambiarCorreo}
          tipo="email"
          label="Email"
          placeholder=""
          name="correo"
          leyendaError="Email can only contain letters, numbers, periods, hyphens and underscores."
        />
        <ComponenteInput
          estado={password}
          cambiarEstado={cambiarPassword}
          tipo="password"
          label="Password"
          name="password1"
          leyendaError="The password must be 4 to 12 digits."
        />
        <ComponenteInput
          estado={password2}
          cambiarEstado={cambiarPassword2}
          tipo="password"
          label="Repeat password"
          name="password2"
          leyendaError="Both passwords must be the same."
        />

        <ContenedorTerminos>
          <Label>
            <InputCheckbox
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={terminos}
              onChange={(e) => cambiarTerminos(e.target.checked)}
            />
            I accept the terms and conditions
          </Label>
          <br />
        </ContenedorTerminos>
        {formularioValido === false && (
          <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              <b>Error:</b> Please fill out the form correctly.
            </p>
          </MensajeError>
        )}

        <ContenedorBotonCentrado>
          <Boton type="submit">
            <Texto>Submit </Texto>
            <Icono>
              <FontAwesomeIcon icon={faArrowUpLong} />
            </Icono>
          </Boton>
          {formularioValido === true && (
            <MensajeExito>¡Form submitted successfully!</MensajeExito>
          )}
        </ContenedorBotonCentrado>
      </Formulario>
    </main>
  );
};

export default Registro;

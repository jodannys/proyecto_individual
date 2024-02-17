import React from "react";

const Validaciones = () => {
  const validarNombre = (nombre) => {
    const expresionNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    return expresionNombre.test(nombre);
  };

  const validarCorreo = (correo) => {
    const expresionCorreo =
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return expresionCorreo.test(correo);
  };

  const validarPassword = (password) => {
    const expresionPassword = /^.{4,12}$/;
    return expresionPassword.test(password);
  };

  const validarPassword2 = (password, password2) => {
    return password === password2;
  };

  return {
    validarNombre,
    validarCorreo,
    validarPassword,
    validarPassword2,
  };
};

export default Validaciones;

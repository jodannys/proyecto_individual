import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import styles from "./CrearTemperamento.module.css";
const URL = process.env.SERVER_URL;


function TemperamentForm() {
  const [temperamentonuevo, setTemperamentonuevo] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [temperaments, setTemperaments] = useState([]);

  const onSuccess = (newTemperament) => {
    console.log("Temperamento creado con éxito:", newTemperament);
    setTemperaments([...temperaments, newTemperament]);
    setTemperamentonuevo("");
    setError("");
    setSuccessMessage("¡Temperamento creado exitosamente!");
  };

  const crearTemperamento = async () => {
    try {
      console.log("Enviando solicitud para crear un nuevo temperamento...");

      if (!temperamentonuevo.trim()) {
        console.log("Error: El nombre del temperamento está vacío");
        setError("El nombre del temperamento no puede estar vacío");
        return;
      }

      if (!/^[a-zA-Z\s]+$/.test(temperamentonuevo.trim())) {
        console.log(
          "Error: El nombre del temperamento solo puede contener letras"
        );
        setError("El nombre del temperamento solo puede contener letras");
        return;
      }

      console.log(
        "Enviando solicitud con el siguiente nombre de temperamento:",
        temperamentonuevo.trim()
      );

      const response = await axios.post(
        `${URL}/createtemperament`,
        {
          temperamentonuevo: temperamentonuevo.trim(),
        }
      );

      console.log("Response from server:", response);

      if (response.status === 200 && response.data && response.data.name) {
        console.log("Solicitud completada con éxito:", response.data);
        onSuccess(response.data);
        setTemperamentonuevo("");
        setError("");
        setSuccessMessage("¡Temperamento creado exitosamente!");
      } else {
        console.log(
          "Error: La respuesta del servidor no contiene datos válidos"
        );
        setError("Error: ocurrió un problema al realizar la solicitud");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);

      setError("Error: ocurrió un problema al realizar la solicitud");
    }
  };

  return (
    <div>
      <label className={styles.nombre}> ¡Agrega un nuevo temperamento!</label>
      <div className={styles.container}>
        <div className={styles.agregar}>
          <input
            className={styles.input}
            type="text"
            value={temperamentonuevo}
            placeholder="Nombre del nuevo temperamento"
            onChange={(e) => setTemperamentonuevo(e.target.value)}
          />
          <button className={styles.boton} onClick={crearTemperamento}>
            <FontAwesomeIcon icon={faPaw} /> Crear temperamento
          </button>
          {error && <p className={styles.error}>{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default TemperamentForm;

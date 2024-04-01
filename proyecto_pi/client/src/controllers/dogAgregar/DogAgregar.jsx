

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import styles from "./DogAgregar.module.css";

function DogAgregar() {
  const [temperaments, setTemperaments] = useState([]);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [perroNuevo, setPerroNuevo] = useState({
    name: "",
    altura_minima: "",
    altura_maxima: "",
    peso_minimo: "",
    peso_maximo: "",
    años_vida: "",
    imagenURL: "",
    temperaments: [],
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleTemperamentChange = (e) => {
    const value = e.target.value;
    setSelectedTemperaments([...selectedTemperaments, value]);
  };
  const handleRemoveTemperament = (temperamentId) => {
    const updatedTemperaments = selectedTemperaments.filter(
      (temp) => temp !== temperamentId
    );
    setSelectedTemperaments(updatedTemperaments);
  };

  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        // Obtener temperamentos de la API
        const response = await axios.get(`http://localhost:3001/temperamentos`);
        const apiTemperaments = response.data;
        setTemperaments(apiTemperaments);
      } catch (error) {
        console.log("Error al obtener los temperamentos:", error);
      }
    };
    fetchTemperaments();
  }, []);
  const selectedChange = (e) => {
    const { name, value } = e.target;
    setPerroNuevo({ ...perroNuevo, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(perroNuevo);
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const formattedData = {
      name: perroNuevo.name,
      altura: `${perroNuevo.altura_minima} - ${perroNuevo.altura_maxima}`,
      peso: `${perroNuevo.peso_minimo} - ${perroNuevo.peso_maximo}`,
      años_vida: perroNuevo.años_vida,
      imagenURL: perroNuevo.imagenURL,
      temperaments: selectedTemperaments,
    };

    console.log("Datos del formulario:", formattedData);

    try {
      const response = await axios.post(
        `http://localhost:3001/createdog`,
        formattedData
      );
      console.log("Respuesta del servidor:", response.data);
      setSuccessMessage("¡Perro creado correctamente!");
    } catch (error) {
      console.error("Error al agregar nuevo perro:", error);
      alert(
        "No se pudo crear el perro. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = "El nombre solo puede contener letras y espacios";
    }

    if (!formData.altura_minima.trim()) {
      errors.altura_minima = "La altura mínima es requerida";
    } else if (isNaN(formData.altura_minima)) {
      errors.altura_minima = "La altura mínima debe ser un número";
    }

    if (!formData.altura_maxima.trim()) {
      errors.altura_maxima = "La altura máxima es requerida";
    } else if (isNaN(formData.altura_maxima)) {
      errors.altura_maxima = "La altura máxima debe ser un número";
    }

    if (!formData.peso_minimo.trim()) {
      errors.peso_minimo = "El peso mínimo es requerido";
    } else if (isNaN(formData.peso_minimo)) {
      errors.peso_minimo = "El peso mínimo debe ser un número";
    }

    if (!formData.peso_maximo.trim()) {
      errors.peso_maximo = "El peso máximo es requerido";
    } else if (isNaN(formData.peso_maximo)) {
      errors.peso_maximo = "El peso máximo debe ser un número";
    }

    if (!formData.años_vida.trim()) {
      errors.años_vida = "Los años de vida son requeridos";
    } else if (isNaN(formData.años_vida)) {
      errors.años_vida = "Los años de vida deben ser un número";
    }

    if (!formData.imagenURL.trim()) {
      errors.imagenURL = "La URL de la imagen es requerida";
    } else if (!isValidURL(formData.imagenURL)) {
      errors.imagenURL = "La URL de la imagen no es válida";
    }

    return errors;
  };

  const isValidURL = (url) => {
    // Expresión regular para validar la URL
    const urlPattern =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(url);
  };

  return (
    <div className={styles.container}>
      <p className={styles.titulo}>
        <br />
         ¡Crea nuevos perros! 
      </p>
      <form className={styles.formulario} onSubmit={handleSubmit}>
        <div className={styles.descripcion}></div>
        <div className={styles.refe}>
          <p className={styles.caracteristicas}>Nombre de la raza:</p>
        
          <input
            className={styles.busqueda}
            name="name"
            value={perroNuevo.name}
            onChange={selectedChange}
            placeholder="Nombre"
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
       
        <div>
          <p className={styles.caracteristicas}>Escoge los Temperamentos:</p>
         
          <select
            className={styles.selecttemperamentos}
            multiple
            value={selectedTemperaments}
            onChange={handleTemperamentChange}
            >
            {temperaments.map((temperament) => (
              <option key={temperament.id} value={temperament.id}>
                {temperament.name}
              </option>
            ))}
          </select>
          <div className={styles.selectedTemperamentsContainer}>
            <p className={styles.caracteristicas}>
              Temperamentos seleccionados:
            </p>
            <ul className={styles.temperamentList}>
              {selectedTemperaments.map((temp) => (
                <li key={temp}>
                  {temperaments.find((t) => t.id === temp)?.name}
                  <button
                    className={styles.butonx}
                    type="button"
                    onClick={() => handleRemoveTemperament(temp)}
                    

                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className={styles.caracteristicas}>Altura mínima:</p>
          <input
            className={styles.busqueda}
            name="altura_minima"
            value={perroNuevo.altura_minima}
            onChange={selectedChange}
            placeholder="Altura Mínima"
          />
          {errors.altura_minima && (
            <p className={styles.error}>{errors.altura_minima}</p>
          )}
        </div>
        <div>
          <p className={styles.caracteristicas}>Altura máxima:</p>
          <input
            className={styles.busqueda}
            name="altura_maxima"
            value={perroNuevo.altura_maxima}
            onChange={selectedChange}
            placeholder="Altura Máxima"
          />
          {errors.altura_maxima && (
            <p className={styles.error}>{errors.altura_maxima}</p>
            )}
        </div>
        <div>
          <p className={styles.caracteristicas}>Peso mínimo:</p>
          <input
            className={styles.busqueda}
            name="peso_minimo"
            value={perroNuevo.peso_minimo}
            onChange={selectedChange}
            placeholder="Kg"
          />
          {errors.peso_minimo && (
            <p className={styles.error}>{errors.peso_minimo}</p>
          )}
        </div>
        <div>
          <p className={styles.caracteristicas}>Peso máximo:</p>
          <input
            className={styles.busqueda}
            name="peso_maximo"
            value={perroNuevo.peso_maximo}
            onChange={selectedChange}
            placeholder="Kg"
          />
          {errors.peso_maximo && (
            <p className={styles.error}>{errors.peso_maximo}</p>
          )}
        </div>

        <div>
          <p className={styles.caracteristicas}>Años de vida:</p>
          <input
            className={styles.busqueda}
            name="años_vida"
            value={perroNuevo.años_vida}
            onChange={selectedChange}
            placeholder="Años de Vida"
          />
          {errors.años_vida && (
            <p className={styles.error}>{errors.años_vida}</p>
          )}
        </div>
        <div>
          <p className={styles.caracteristicas}>URL de la imagen:</p>
          <input
            className={styles.busqueda}
            name="imagenURL"
            value={perroNuevo.imagenURL}
            onChange={selectedChange}
            placeholder="URL de la Imagen"
          />
          {errors.imagenURL && (
            <p className={styles.error}>{errors.imagenURL}</p>
          )}
        </div>
        <div className={styles.botones.container}>
          <button className={styles.boton} type="submit">
            <FontAwesomeIcon icon={faPaw} /> Agregar perro
          </button>
        </div>
      </form>
      {successMessage && <p className={styles.message}>{successMessage}</p>}
    </div>
  );
}
export default DogAgregar;

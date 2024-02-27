import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "./DogAgregar.css";

function DogAgregar() {
  const [temperaments, setTemperaments] = useState([]);
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [perroNuevo, setPerroNuevo] = useState({
    name: "",
    altura: "",
    peso: "",
    años_vida: "",
    imagenURL: "",
    temperaments: [],
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleTemperamentChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTemperaments([...selectedTemperaments, value]);
    } else {
      setSelectedTemperaments(selectedTemperaments.filter((temp) => temp !== value));
    }
  };

  useEffect(() => {
    const fetchTemperaments = async () => {
      try {
        const response = await axios.get("http://localhost:3001/temperamentos");
        setTemperaments(response.data);
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
    const validationErrors = validateForm(perroNuevo);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/createdog', {
          ...perroNuevo,
          temperaments: selectedTemperaments,
        });
        console.log('Respuesta del servidor:', response.data);
        setSuccessMessage('¡Perro creado correctamente!');
      } catch (error) {
        console.error('Error al agregar nuevo perro:', error);
        alert('No se pudo crear el perro. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };

  const validateForm = (formData) => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "El nombre es requerido";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      errors.name = "El nombre solo puede contener letras y espacios";
    }

    if (!formData.altura.trim()) {
      errors.altura = "La altura es requerida";
    } else if (isNaN(formData.altura)) {
      errors.altura = "La altura debe ser un número";
    }

    if (!formData.peso.trim()) {
      errors.peso = "El peso es requerido";
    } else if (isNaN(formData.peso)) {
      errors.peso = "El peso debe ser un número";
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
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  return (
    <div className="container-temperamento">
      <form className="formulario-registro" onSubmit={handleSubmit}>
        <p className="titulo">¡Crea nuevos perros!</p>
      {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="descripcion-perro">
          <div>
            <p className="caracteristicas">Nombre:</p>
            <input
              className="input-de-busqueda"
              name="name"
              value={perroNuevo.name}
              onChange={selectedChange}
              placeholder=""
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <div>
            <p className="caracteristicas">Temperamentos:</p>
            <div>
              {temperaments.map((temperament) => (
                <div key={temperament.id}>
                  <input
                    type="checkbox"
                    name="temperaments"
                    id={temperament.id}
                    value={temperament.id}
                    onChange={handleTemperamentChange}
                  />
                  <label htmlFor={temperament.id}>{temperament.name}</label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="caracteristicas">Altura:</p>
            <input
              className="input-de-busqueda"
              name="altura"
              value={perroNuevo.altura}
              onChange={selectedChange}
              placeholder="Cm"
            />{" "}
            Cm.
            {errors.altura && <p className="error">{errors.altura}</p>}
          </div>
          <div>
            <p className="caracteristicas">Peso:</p>
            <input
              className="input-de-busqueda"
              name="peso"
              value={perroNuevo.peso}
              onChange={selectedChange}
              placeholder="Kg"
            />{" "}
            Kg.
            {errors.peso && <p className="error">{errors.peso}</p>}
          </div>
          <div>
            <p className="caracteristicas">Años de vida:</p>
            <input
              className="input-de-busqueda"
              name="años_vida"
              value={perroNuevo.años_vida}
              onChange={selectedChange}
              placeholder=""
            />
            {errors.años_vida && <p className="error">{errors.años_vida}</p>}
          </div>
          <div>
            <p className="caracteristicas">URL de la imagen:</p>
            <input
              className="input-de-busqueda"
              name="imagenURL"
              value={perroNuevo.imagenURL}
              onChange={selectedChange}
              placeholder="Url valida"
            />
            {errors.imagenURL && <p className="error">{errors.imagenURL}</p>}
          </div>
          <div className="botones-container ">
            <button className="boton-perro" type="submit">
              <FontAwesomeIcon icon={faPaw} /> Agregar perro
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DogAgregar;

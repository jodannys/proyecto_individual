import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DogAgregar.css";
import Validate from "./Validate.js"; 
import axios from "axios";

function DogAgregar() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const [perroNuevo, setPerroNuevo] = useState({
    name: "",
    altura: "",
    peso: "",
    años: "",
    imagen: null // Estado para almacenar la imagen seleccionada
  });
  const [temperamentoUltimo, setTemperamentoUltimo] = useState({});
  const [creatingTemperament, setCreatingTemperament] = useState(false);
  const [temperamentonuevo, setTemperamentonuevo] = useState("");
  const [errors, setErrors] = useState({}); // Estado para almacenar los errores de validación
  const [imagePreview, setImagePreview] = useState(null); // Estado para almacenar la vista previa de la imagen

  // Función para mostrar la vista previa de la imagen seleccionada
  const showImagePreview = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const selectedChange = (e) => {
    const { name, value } = e.target;
    setPerroNuevo({ ...perroNuevo, [name]: value });
  };

  const selectedChangeTemperament = (e) => {
    const { id, checked } = e.target;
    setTemperamentoUltimo((prevTemperamentos) => ({
      ...prevTemperamentos,
      [id]: checked, // Almacena true si está seleccionado, false si no
    }));
  };
  
  const AgregarNuevoPerro = () => {
    const formData = new FormData();
    formData.append("name", perroNuevo.name);
    formData.append("altura", perroNuevo.altura);
    formData.append("peso", perroNuevo.peso);
    formData.append("años", perroNuevo.años);
    formData.append("imagen", perroNuevo.imagen);
  
    // Obtener IDs de temperamentos seleccionados
    const temperamentosId = Object.keys(temperamentoUltimo).filter(
      (key) => temperamentoUltimo[key]
    );
  
    // Agregar IDs de temperamentos al FormData
    temperamentosId.forEach((temperamentoId) => {
      formData.append("temperamentsId", temperamentoId);
    });
  
    axios
      .post(`http://localhost:3001/createdog`,formData)
      .then((res) => {
        console.log(res);
        alert("Perro creado");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo crear el perro");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const temperamentosId = Object.keys(temperamentoUltimo).filter(key => temperamentoUltimo[key]);


    // Validar los datos incluyendo los IDs de temperamentos seleccionados
    const validationErrors = Validate({
      ...perroNuevo,
      temperamentosId: temperamentosId, // Pasar los IDs de temperamentos
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      AgregarNuevoPerro();
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/temperamentos`)
      .then((res) => {
        dispatch({
          type: "TEMPERAMENTOS",
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const crearTemperamento = () => {
    axios
      .post(`http://localhost:3001/createtemperament`, { temperamentonuevo })
      .then((res) => {
        alert("Temperamento creado");
        dispatch({
          type: "TEMPERAMENTOS",
          payload: [...temperaments, res.data],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Manejar el cambio de archivo de entrada para la imagen seleccionada
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log("Imagen seleccionada:", file);
    setPerroNuevo({ ...perroNuevo, imagen: file });
    showImagePreview(file); // Mostrar la vista previa de la imagen
  };

  return (
    <div className="fondo-dog-detail">
      <div className="container-amarilloo">
        <div className="tabs">
          <button
            className="boton-agregar-temp"
            onClick={() => setCreatingTemperament(!creatingTemperament)}
          >
            {creatingTemperament ? "Volver" : "Crear temperamento"}
          </button>
        </div>
        {creatingTemperament ? (
          <div className="agregar-temperamento">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="agregarTemperament">
                  Nombre del temperamento nuevo
                </label>
                <br></br>
                <input
                  type="text"
                  value={temperamentonuevo}
                  onChange={(e) => setTemperamentonuevo(e.target.value)}
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <button className="boton-agregar" onClick={crearTemperamento}>
                Agregar
              </button>
            </form>
          </div>
        ) : (
          <form className="agregarPerro" onSubmit={handleSubmit}>
            <div className="container-desc-img">
              <div className="image-preview ">
                <input
                  className="img-subir"
                  type="file"
                  name="file"
                  onChange={handleFileInputChange} // Agregar evento de cambio de archivo
                />
                {imagePreview && (
                  <div>
                    <p>Vista previa de la imagen:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                  </div>
                )}
              </div>
              <div className="descripcion-perro">
                <p>
                  Nombre:
                  <input
                    name="name"
                    value={perroNuevo.name}
                    onChange={selectedChange}
                    placeholder="nombre"
                  />
                  {errors.name && (
                    <span className="error">{errors.name}</span>
                  )}
               </p>
                <div>
                 <p>Temperamentos:</p>
                   <div>
                    {temperaments.map((el) => (
                      <div key={el.id}>
                        <input
                          type="checkbox"
                          name="temperament"
                          value={el.name}
                          id={el.id}
                          onChange={selectedChangeTemperament}
                        />
                        <label htmlFor="temperament">{el.name}</label>
                      </div>
                    ))}
                  </div>
                  {errors.temperamentosId && (
                    <span className="error">{errors.temperamentosId}</span>
                  )}
                  <p>
                    Altura:
                    <input
                      name="altura"
                      value={perroNuevo.altura}
                      onChange={selectedChange}
                      placeholder="altura"
                    /> cm.
                  </p>
                  <p>
                    Peso:
                    <input
                      name="peso"
                      value={perroNuevo.peso}
                      onChange={selectedChange}
                      placeholder="peso"
                    /> kg.
                  </p>
                  <p>
                    Años de vida:
                    <input
                      name="años"
                      value={perroNuevo.años}
                      onChange={selectedChange}
                      placeholder="años de vida"
                    />
                  </p>
                </div>
                <div>
                  <button
                    className="boton-agregar-perroo"
                    type="submit"
                  >
                    Agregar perro
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default DogAgregar;

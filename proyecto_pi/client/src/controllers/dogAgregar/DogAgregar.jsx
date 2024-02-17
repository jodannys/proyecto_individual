import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../dogDetail/DogDetail";
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
  });
  const [temperamentoUltimo, setTemperamentoUltimo] = useState({});
  const [creatingTemperament, setCreatingTemperament] = useState(false);
  const [temperamentonuevo, setTemperamentonuevo] = useState("");
  const [errors, setErrors] = useState({}); // Estado para almacenar los errores de validación

  const selectedChange = (e) => {
    const { name, value } = e.target;
    setPerroNuevo({ ...perroNuevo, [name]: value });
  };

  const selectedChangeTemperament = (e) => {
    let { id, value } = e.target;
    setTemperamentoUltimo({ ...temperamentoUltimo, [id]: value });
  };

  const AgregarNuevoPerro = () => {
    let temperamentsId = Object.keys(temperamentoUltimo);
    axios
      .post(`http://localhost:3001/createdog`, { perroNuevo, temperamentsId })
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
    const validationErrors = Validate(perroNuevo); // Utiliza la función de validación
    setErrors(validationErrors); // Actualiza los errores
    if (Object.keys(validationErrors).length === 0) {
      AgregarNuevoPerro(); // Si no hay errores, enviar el formulario
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
      .post(`http://localhost:3001/postCreatetemperament`, { temperamentonuevo })
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

  return (
    <div className="fondo-dog-detail">
      <div className="container-amarilloo">
        <div className="tabs">
          <button
            className="boton-agregar-temp"
            onClick={() => setCreatingTemperament(!creatingTemperament)}
          >
            {/* negación del estado actual */}
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
              <div className="container-img">
                {/* <input className="img-subir" type="file" name="file"/> */}
              </div>
              <div className="descripcion-perro">
                <p>
                  {" "}
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
                      <div>
                        <input
                          type="checkbox"
                          name="temperament"
                          value={el.name}
                          id={el.id}
                          onChange={selectedChangeTemperament}
                        />
                        <label for="temperament">{el.name}</label>
                      </div>
                    ))}
                  </div>
                  <p>
                    {" "}
                    Altura:
                    <input
                      name="altura"
                      value={perroNuevo.altura}
                      onChange={selectedChange}
                      placeholder="altura"
                    />{" "}
                    cm.
                  </p>
                  <p>
                    {" "}
                    Peso:
                    <input
                      name="peso"
                      value={perroNuevo.peso}
                      onChange={selectedChange}
                      placeholder="peso"
                    />{" "}
                    kg.
                  </p>
                  <p>
                    {" "}
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
                    onClick={AgregarNuevoPerro}
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

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Configuracion.css"

const Configuracion = () => {
  const navigate = useNavigate();

  const handleInicioClick = () => {
    navigate("/");
  };

  return (
    <div className="configuracion">
      <h1>Guía de Uso</h1>

      <ul>
        <li>
          <strong>Iniciar Sesión:</strong> Ingresa con tu cuenta o regístrate si
          eres nuevo.
        </li>
        <li>
          <strong>Explorar:</strong> Utiliza la búsqueda para encontrar razas de
          perros por nombre.
        </li>
        <li>
          <strong>Filtrar y Ordenar:</strong> Refina los resultados según tus
          preferencias.
        </li>
        <li>
          <strong>Visualizar Detalles:</strong> Haz clic en una raza para ver
          más información.
        </li>
        <li>
          <strong>Crear Nuevos Perros:</strong> Agrega información sobre nuevas
          razas.
        </li>
        <li>
          <strong>Configuración de Cuenta:</strong> Personaliza tu cuenta desde
          la opción de configuración.
        </li>
        <li>
          <strong>Agregar Temperamentos:</strong> Añade nuevos temperamentos
          desde la configuración.
        </li>
      </ul>

      <p>¡Disfruta explorando el mundo de los perros!</p>
      <button onClick={handleInicioClick}>Ir a la Página de Inicio</button>
    </div>
  );
};

export default Configuracion;

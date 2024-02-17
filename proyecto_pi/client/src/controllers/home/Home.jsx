import "./Home.css"
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className= "fondo-home">
            <div className= "div-container-home">
                <div className= "foto-perrito-container">
                </div>
                <div className= "contenedor-titulo-home">
                    <div className= "titulo-home-container">
                        <p className= "titulo-home">Descubre todo lo que necesitas saber sobre los perros en un solo lugar: ¡All about dogs!</p>
                    </div> 
                    <div className= "subtitulo-home-container">
                        <p className= "subtitulo-home">¡Aquí encontrarás una amplia variedad de información confiable y útil para todos los amantes de los perros.!</p>
                        <Link to="/buscar" className="boton-home">Ver más</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

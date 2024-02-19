function validate({ name, imagen, altura, peso, años, temperamentosId }) {
    console.log("name:", name);
    console.log("imagen:", imagen);
    console.log("altura:", altura);
    console.log("peso:", peso);
    console.log("años:", años);
    console.log("temperamentosId:", temperamentosId);

    let errors = {};

    if (!name) errors.name = 'Se necesita un nombre para el perro';
    if (!imagen) errors.imagen = 'Se necesita una imagen para el perro';
    if (!altura) errors.altura = 'Se necesita la altura del perro';
    if (!peso) errors.peso = 'Se necesita el peso del perro';
    if (!años) errors.años = 'Se necesita la esperanza de vida del perro';
    if (!temperamentosId || temperamentosId.length === 0) errors.temperamentosId = 'Selecciona al menos 1 temperamento para el perro';

    console.log("errors:", errors);

    return errors;
}

export default validate;

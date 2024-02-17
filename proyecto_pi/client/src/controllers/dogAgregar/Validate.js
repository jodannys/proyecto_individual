function validate({name, altura, peso, años, temperamentosId}) {
    let errors = {};

    if (!name) errors.name = 'Se necesita un nombre para la raza';
    if (!altura) errors.altura = 'Se necesita la altura de la raza';
    if (!peso) errors.peso = 'Se necesita el peso de la raza';
    if (!años) errors.años = 'Se necesita la esperanza de vida de la raza';
    if (temperamentosId.length === 0) errors.temperamentosId = 'Selecciona al menos 1 temperamento';

    return errors;
}
export default validate
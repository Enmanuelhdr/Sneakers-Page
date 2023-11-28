// generar token

const token = (parametros) => {
    return {
        id: parametros.id,
        nombre: parametros.firstName
    }
};

module.exports = token;
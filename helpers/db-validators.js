const Role = require('../models/role');
const Usuario = require('../models/usuario');

// Verificvar que sea un ROL existente
const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ---${rol}--- no existe en la BD`);
    }
}

// Verificar que no se repitan usuarios con el mismo correo
const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo ---${correo}--- ya se encuentra registrado`);
    } 
}

// Verificar si existe el usuario por el id
const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id ---${id}--- no existe en BD`);
    } 
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}
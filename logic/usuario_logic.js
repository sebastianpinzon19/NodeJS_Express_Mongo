const Usuario = require('../models/usuario_model');
const Curso = require('../models/curso_model');
// const { cursoSchemaValidation } = require('../validations/curso_validation'); // Importa el esquema de validación
// Función asíncrona para crear un objeto de tipo usuario
async function crearUsuario(body) {
    // Verificar si el email ya está registrado
    const usuarioExistente = await Usuario.findOne({ email: body.email });
    if (usuarioExistente) {
        throw new Error('El correo electrónico ya está registrado');
    }
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: body.password,
        imagen: body.imagen,
    });
    return await usuario.save();
}

// Función asíncrona para actualizar un usuario y agregar cursos al array de cursos
async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOne({ "email": email });
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si hay cursos para agregar
    if (body.cursos && body.cursos.length > 0) {
        // Filtrar los cursos que ya están en el array para evitar duplicados
        const nuevosCursos = body.cursos.filter(cursoId => !usuario.cursos.includes(cursoId));
        // Agregar los nuevos cursos al array de cursos del usuario
        usuario.cursos.push(...nuevosCursos);
    }
    usuario.nombre = body.nombre || usuario.nombre;
    usuario.password = body.password || usuario.password;
    usuario.estado = body.estado !== undefined ? body.estado : usuario.estado;
    usuario.imagen = body.imagen || usuario.imagen;
    // Guardar los cambios en la base de datos
    await usuario.save();
    return usuario;
}

// Función asíncrona para inactivar un usuario
async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate({ "email": email }, {
        $set: {
            estado: false
        }
    }, { new: true });
    return usuario;
}

// Función asíncrona para listar todos los usuarios activos
async function listarUsuarioActivos() {
    let usuarios = await Usuario.find({ "estado": true }).populate({
        path: 'cursos',
        select: 'titulo' // Selecciona solo el campo 'titulo' del curso
    });
    // Mapea los usuarios para devolver solo los títulos de los cursos
    usuarios = usuarios.map(usuario => {
        const cursosSoloTitulos = usuario.cursos.map(curso => curso.titulo);
        return {
            _id: usuario._id,
            email: usuario.email,
            nombre: usuario.nombre,
            password: usuario.password,
            estado: usuario.estado,
            imagen: usuario.imagen,
            cursos: cursosSoloTitulos, // Reemplaza los cursos con solo los títulos
            __v: usuario.__v
        };
    });
    return usuarios;
}

// Agregar uno o varios cursos a un usuario
async function agregarCursosAUsuario(email, cursosIds) {
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        // Filtrar los cursos ya existentes para no duplicarlos
        const nuevosCursos = cursosIds.filter(cursoId => !usuario.cursos.includes(cursoId));
        // Agregar los nuevos cursos al array de cursos del usuario
        usuario.cursos = [...usuario.cursos, ...nuevosCursos];
        await usuario.save();
        return usuario;
    } catch (error) {
        throw new Error(`Error al agregar cursos: ${error.message}`);
    }
}

// Función asíncrona para guardar una colección de usuarios
async function guardarColeccionUsuarios(usuarios) {
    try {
        const resultados = [];
        for (let usuarioData of usuarios) {
            // Verificar si el email ya está registrado
            const usuarioExistente = await Usuario.findOne({ email: usuarioData.email });
            if (!usuarioExistente) {
                let nuevoUsuario = new Usuario({
                    email: usuarioData.email,
                    nombre: usuarioData.nombre,
                    password: usuarioData.password,
                    estado: usuarioData.estado !== undefined ? usuarioData.estado : true,
                    imagen: usuarioData.imagen || null,
                    cursos: usuarioData.cursos || []
                });
                let usuarioGuardado = await nuevoUsuario.save();
                resultados.push(usuarioGuardado);
            } else {
                console.log(`El correo electrónico "${usuarioData.email}" ya está registrado.`);
            }
        }
        return resultados;
    } catch (err) {
        console.error('Error al guardar la colección de usuarios:', err);
        throw err; // Re-lanza el error para manejarlo en la capa superior si es necesario
    }
}

// Función para listar los cursos de un usuario en la capa de lógica
async function listarCursosDeUsuario(usuarioId) {
    try {
        // Buscar al usuario por su ID y popular el campo 'cursos' con los detalles de los cursos
        const usuario = await Usuario.findById(usuarioId).populate('cursos');
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        // Retornar la lista de cursos
        return usuario.cursos;
    } catch (error) {
        throw new Error(`Error al listar los cursos del usuario: ${error.message}`);
    }
}

module.exports = {
    agregarCursosAUsuario,
    listarCursosDeUsuario,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuarioActivos,
    guardarColeccionUsuarios
};
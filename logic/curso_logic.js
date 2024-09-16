const Curso = require('../models/curso_model');
const Usuario = require('../models/usuario_model');
//const { cursoSchemaValidation } = require('../validations/curso_validation'); // Importa el esquema de validación

// Función asíncrona para crear cursos
async function crearCurso(body) {
    // Verificar si ya existe un curso con el mismo título
    const cursoExistente = await Curso.findOne({ titulo: body.titulo });
    if (cursoExistente) {
        throw new Error('El curso con este título ya existe');
    }
    let curso = new Curso({
        titulo: body.titulo,
        descripcion: body.descripcion,
        estado: body.estado,
        imagen: body.imagen,
        alumnos: body.alumnos,
        calificacion: body.calificacion
    });
    return await curso.save();
}

// Función asíncrona para actualizar cursos
async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion,
            estado: body.estado,
            imagen: body.imagen,
            alumnos: body.alumnos,
            calificacion: body.calificacion
        }
    }, { new: true });
    return curso;
}

// Función asíncrona para inactivar cursos
async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}

// Función asíncrona para listar los cursos activos
async function listarCursosActivos() {
    let cursos = await Curso.find({ "estado": true });
    return cursos;
}

// Función asíncrona para guardar una colección de cursos
async function guardarCursos(cursos) {
    try {
        const resultados = [];
        for (let cursoData of cursos) {
            // Verificar si ya existe un curso con el mismo título
            const cursoExistente = await Curso.findOne({ titulo: cursoData.titulo });
            if (!cursoExistente) {
                let nuevoCurso = new Curso(cursoData);
                let cursoGuardado = await nuevoCurso.save();
                resultados.push(cursoGuardado);
            } else {
                console.log(`El curso con título "${cursoData.titulo}" ya existe.`);
            }
        }
        return resultados;
    } catch (err) {
        console.error('Error al guardar la colección de cursos:', err);
        throw err; // Re-lanza el error para manejarlo en la capa superior si es necesario
    }
}

// Función asíncrona para buscar un curso por su ID
async function buscarCursoPorId(id) {
    try {
        const curso = await Curso.findById(id);
        if (!curso) {
            throw new Error(`Curso con ID ${id} no encontrado`);
        }
        return curso;
    } catch (err) {
        console.error(`Error al buscar el curso por ID: ${err.message}`);
        throw err;
    }
}

// Función asíncrona para buscar usuarios asociados a un curso
async function buscarUsuariosPorCurso(id) {
    try {
        // Buscar usuarios que tengan el curso en su lista de cursos y hacer populate del campo
        const usuarios = await Usuario.find({ cursos: id }).populate('cursos', 'titulo');
        if (!usuarios || usuarios.length === 0) {
            throw new Error(`No se encontraron usuarios asociados al curso con ID ${id}`);
        }
        // Procesar los resultados para devolver solo los títulos de los cursos
        const usuariosConCursos = usuarios.map(usuario => {
            return {
                _id: usuario._id,
                email: usuario.email,
                nombre: usuario.nombre,
                password: usuario.password,
                estado: usuario.estado,
                // cursos: usuario.cursos.map(curso => curso.titulo), // Solo incluye el título de cada
                __v: usuario.__v
            };
        });
        return usuariosConCursos;
    } catch (err) {
        console.error(`Error al buscar usuarios por curso: ${err.message}`);
        throw err;
    }
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos,
    guardarCursos,
    buscarCursoPorId,
    buscarUsuariosPorCurso
};
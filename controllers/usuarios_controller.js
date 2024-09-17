const logic = require('../logic/usuario_logic');
const { usuarioSchemaValidation } = require('../validations/usuario_validation');
const Usuario = require('../models/usuario_model'); // Ajusta la ruta según tu estructura de carpetas

// Controlador para listar los usuarios activos
const listarUsuarioActivos = async (_, res) => {
    try {
        const usuarios = await logic.listarUsuarioActivos();
        if (usuarios.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
    const { error, value } = usuarioSchemaValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const nuevoUsuario = await logic.crearUsuario(value);
        res.status(201).json({ usuario: nuevoUsuario }); // 201 Created
    } catch (err) {
        if (err.message === 'El correo electrónico ya está registrado') {
            return res.status(409).json({ error: err.message }); // 409 Conflict
        }
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para actualizar un usuario
const actualizarUsuario = async (req, res) => {
    const { email } = req.params;
    const { error, value } = usuarioSchemaValidation.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const usuarioActualizado = await logic.actualizarUsuario(email, value);
        if (!usuarioActualizado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ usuario: usuarioActualizado });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para desactivar un usuario
const desactivarUsuario = async (req, res) => {
    const { email } = req.params;
    try {
        const usuarioDesactivado = await logic.desactivarUsuario(email);
        if (!usuarioDesactivado) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ usuario: usuarioDesactivado });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para agregar cursos a un usuario
const agregarCursosAUsuario = async (req, res) => {
    const { email } = req.params;
    const { cursos } = req.body;
    if (!Array.isArray(cursos) || cursos.length === 0) {
        return res.status(400).json({ error: 'Se requiere un array de IDs de cursos' });
    }
    try {
        const usuarioActualizado = await logic.agregarCursosAUsuario(email, cursos);
        res.json({ usuario: usuarioActualizado });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para listar los cursos de un usuario
const listarCursosDeUsuario = async (req, res) => {
    const { usuarioId } = req.params;
    try {
        const cursos = await logic.listarCursosDeUsuario(usuarioId);
        if (cursos.length === 0) {
            return res.status(204).send(); // No Content
        }
        res.json(cursos);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Controlador para guardar una colección de usuarios
const guardarColeccionUsuarios = async (req, res) => {
    const usuarios = req.body; // Se espera que el cuerpo de la solicitud contenga un array de usuarios
    const emailsUnicos = new Set();
    const usuariosValidos = [];

    for (let usuario of usuarios) {
        const { error } = usuarioSchemaValidation.validate(usuario);
        if (error) {
            return res.status(400).json({ error: `Error en usuario "${usuario.email}": ${error.details[0].message}` });
        }
        if (emailsUnicos.has(usuario.email)) {
            continue; // Omitir duplicados
        }
        emailsUnicos.add(usuario.email);
        usuariosValidos.push(usuario);
    }

    try {
        const resultados = await logic.guardarColeccionUsuarios(usuariosValidos);
        res.status(201).json({ message: 'Usuarios guardados exitosamente', usuarios: resultados });
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor al guardar la colección de usuarios', details: err.message });
    }
};

// Controlador para actualizar los cursos de un usuario
const actualizarCursosDelUsuario = async (req, res) => {
    const { email } = req.params;
    const { cursos } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        usuario.cursos = cursos; // Actualiza los cursos del usuario
        await usuario.save();
        res.json({ usuario }); // Devuelve el usuario actualizado
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
};

// Exportar los controladores
module.exports = {
    listarUsuarioActivos,
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    agregarCursosAUsuario,
    listarCursosDeUsuario,
    guardarColeccionUsuarios,
    actualizarCursosDelUsuario
};

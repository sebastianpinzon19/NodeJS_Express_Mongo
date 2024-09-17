const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios_controller');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: Correo electrónico único del usuario
 *           example: usuario@example.com
 *         nombre:
 *           type: string
 *           description: Nombre completo del usuario
 *           example: Juan Pérez
 *         password:
 *           type: string
 *           description: Contraseña encriptada del usuario
 *           example: hashed_password
 *         estado:
 *           type: boolean
 *           description: Estado del usuario (activo o desactivado)
 *           example: true
 *         imagen:
 *           type: string
 *           description: URL de la imagen de perfil del usuario
 *           nullable: true
 *           example: "https://example.com/imagen.jpg"
 *         cursos:
 *           type: array
 *           description: Lista de IDs de los cursos asociados al usuario
 *           items:
 *             type: string
 *             example: "64b0c4395f1c4f1a9b0f1234"
 *       required:
 *         - email
 *         - nombre
 *         - password
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios activos
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Una lista de usuarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       204:
 *         description: No se encontraron usuarios activos
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', usuarioController.listarUsuarioActivos);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El correo electrónico ya está registrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   put:
 *     summary: Actualizar un usuario por email
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/:email', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{email}:
 *   delete:
 *     summary: Desactivar un usuario por email
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     responses:
 *       200:
 *         description: Usuario desactivado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:email', usuarioController.desactivarUsuario);

/**
 * @swagger
 * /api/usuarios/{email}/cursos:
 *   post:
 *     summary: Agregar cursos a un usuario por email
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "64b0c4395f1c4f1a9b0f1234"
 *     responses:
 *       200:
 *         description: Cursos agregados al usuario
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Se requiere un array de IDs de cursos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post('/:email/cursos', usuarioController.agregarCursosAUsuario);

/**
 * @swagger
 * /api/usuarios/{usuarioId}/cursos:
 *   get:
 *     summary: Listar cursos de un usuario por ID
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de cursos asociados al usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "64b0c4395f1c4f1a9b0f1234"
 *       404:
 *         description: Usuario o cursos no encontrados
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:usuarioId/cursos', usuarioController.listarCursosDeUsuario);

/**
 * @swagger
 * /api/usuarios/coleccion:
 *   post:
 *     summary: Guardar una colección de usuarios
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Colección de usuarios creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

/**
 * @swagger
 * /api/usuarios/{email}/cursos:
 *   put:
 *     summary: Actualizar los cursos de un usuario por email
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cursos:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: ["curso1", "curso2", "curso3"]
 *             required:
 *               - cursos
 *             description: "Array de cursos que se asignarán al usuario."
 *     responses:
 *       200:
 *         description: "Cursos actualizados correctamente."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: "usuario@ejemplo.com"
 *                 cursos:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["curso1", "curso2", "curso3"]
 *       404:
 *         description: "Usuario no encontrado."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario no encontrado"
 *       500:
 *         description: "Error al actualizar los cursos del usuario."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error al actualizar los cursos del usuario"
 */
router.put('/:email/cursos', usuarioController.actualizarCursosDelUsuario);





module.exports = router;
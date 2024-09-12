const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios_controller');

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Listar todos los usuarios activos
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Una lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   password:
 *                     type: string
 *             examples:
 *               example1:
 *                 summary: Una lista de usuarios
 *                 value:
 *                   [
 *                     { "email": "usuario1@example.com", "nombre": "Usuario Uno", "password": "hashed_password" },
 *                     { "email": "usuario2@example.com", "nombre": "Usuario Dos", "password": "hashed_password" }
 *                   ]
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
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               nombre:
 *                 type: string
 *                 example: Usuario Ejemplo
 *               password:
 *                 type: string
 *                 example: hashed_password
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Datos inválidos
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
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
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
 *     responses:
 *       200:
 *         description: Cursos agregados al usuario
 *       404:
 *         description: Usuario no encontrado
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
 *             examples:
 *               example1:
 *                 summary: Lista de cursos
 *                 value: ["curso1_id", "curso2_id"]
 *       404:
 *         description: Usuario o cursos no encontrados
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
 */
router.post('/coleccion', usuarioController.guardarColeccionUsuarios);

module.exports = router;
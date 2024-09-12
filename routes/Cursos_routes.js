const express = require('express');
const cursoController = require('../controllers/Cursos_controller'); // Importa el controlador
const router = express.Router(); // Define el enrutador

/**
 * @swagger
 * components:
 *   schemas:
 *     Curso:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *         - activo
 *       properties:
 *         id:
 *           type: string
 *           description: ID del curso
 *         nombre:
 *           type: string
 *           description: Nombre del curso
 *         descripcion:
 *           type: string
 *           description: Descripción del curso
 *         activo:
 *           type: boolean
 *           description: Estado del curso (activo o inactivo)
 *         usuarios:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de los usuarios asociados al curso
 *       example:
 *         nombre: "Curso de Node.js"
 *         descripcion: "Aprende a desarrollar aplicaciones backend con Node.js"
 *         activo: true
 *         usuarios:
 *           - "60c72b1f4f1a062b7c4e97a2"
 */

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Listar todos los cursos activos
 *     tags: [Curso]
 *     responses:
 *       200:
 *         description: Lista de cursos activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Curso'
 */
router.get('/', cursoController.listarCursosActivos);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtener curso por Id
 *     tags: [Curso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Detalles del curso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Curso'
 *       404:
 *         description: Curso no encontrado
 */
router.get('/:id', cursoController.obtenerCursoPorId);

/**
 * @swagger
 * /api/cursos/{id}/usuarios:
 *   get:
 *     summary: Obtener los usuarios para un curso
 *     tags: [Curso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Lista de usuarios asociados al curso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 description: ID del usuario
 *       404:
 *         description: Curso o usuarios no encontrados
 */
router.get('/:id/usuarios', cursoController.obtenerUsuariosPorCurso);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Curso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', cursoController.crearCurso);

/**
 * @swagger
 * /api/cursos/coleccion:
 *   post:
 *     summary: Guardar una colección de cursos
 *     tags: [Curso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Curso'
 *     responses:
 *       201:
 *         description: Colección de cursos creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/coleccion', cursoController.guardarColeccionCursos);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Actualizar un curso por Id
 *     tags: [Curso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Curso'
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Curso no encontrado
 */
router.put('/:id', cursoController.actualizarCurso);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Desactivar un curso por Id
 *     tags: [Curso]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso desactivado correctamente
 *       404:
 *         description: Curso no encontrado
 */
router.delete('/:id', cursoController.desactivarCurso);

module.exports = router;
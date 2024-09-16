const Joi = require('@hapi/joi');
// Validaciones para el objeto curso
const cursoSchemaValidation = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .#-]{3,100}$/)
        .messages({
            'string.base': 'El título debe ser un texto',
            'string.empty': 'El título no puede estar vacío',
            'string.min': 'El título debe tener al menos 3 caracteres',
            'string.max': 'El título no debe exceder los 100 caracteres',
            'string.pattern.base': 'El título contiene caracteres inválidos',
            'any.required': 'El título es un campo requerido'
        }),
    descripcion: Joi.string()
        .max(500)
        .optional()
        .allow('')
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9 .#-]{0,500}$/)
        .messages({
            'string.base': 'La descripción debe ser un texto',
            'string.max': 'La descripción no debe exceder los 500 caracteres',
            'string.pattern.base': 'La descripción contiene caracteres inválidos'
        }),
    estado: Joi.boolean()
        .default(true)
        .messages({
            'boolean.base': 'El estado debe ser un valor booleano, verdadero o falso'
        }),
    imagen: Joi.string()
        .uri()
        .optional()
        .allow('')
        .pattern(/^https?:\/\/[a-zA-Z0-9\-_]+\.[a-z]{2,}([\/\w \.-]*)*\/?$/)
        .messages({
            'string.base': 'La imagen debe ser una URL válida',
            'string.uri': 'La imagen debe tener un formato de URL válido',
            'string.pattern.base': 'La URL de la imagen no es válida'
        }),
    alumnos: Joi.number()
        .integer()
        .min(0)
        .default(0)
        .messages({
            'number.base': 'El número de alumnos debe ser un número',
            'number.integer': 'El número de alumnos debe ser un número entero',
            'number.min': 'El número de alumnos no puede ser negativo'
        }),
    calificacion: Joi.number()
        .min(0)
        .max(5)
        .default(0)
        .messages({
            'number.base': 'La calificación debe ser un número',
            'number.min': 'La calificación no puede ser menor que 0',
            'number.max': 'La calificación no puede ser mayor que 5'
        })
});

module.exports = { cursoSchemaValidation };

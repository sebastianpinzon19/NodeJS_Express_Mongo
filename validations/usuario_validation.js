const Joi = require("@hapi/joi");

// Validaciones para el objeto usuario
const usuarioSchemaValidation = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } })
        .required()
        .messages({
            'string.base': 'El correo electrónico debe ser un texto',
            'string.empty': 'El correo electrónico no puede estar vacío',
            'string.email': 'El correo electrónico debe tener un formato válido',
            'any.required': 'El correo electrónico es un campo requerido'
        }),
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/)
        .messages({
            'string.base': 'El nombre debe ser un texto',
            'string.empty': 'El nombre no puede estar vacío',
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre no debe exceder los 30 caracteres',
            'string.pattern.base': 'El nombre solo puede contener letras y espacios',
            'any.required': 'El nombre es un campo requerido'
        }),
    password: Joi.string()
        .min(6)
        .max(30)
        .required()
        .pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/)
        .messages({
            'string.base': 'La contraseña debe ser un texto',
            'string.empty': 'La contraseña no puede estar vacía',
            'string.min': 'La contraseña debe tener al menos 6 caracteres',
            'string.max': 'La contraseña no debe exceder los 30 caracteres',
            'string.pattern.base': 'La contraseña solo puede contener letras, números y caracteres especiales',
            'any.required': 'La contraseña es un campo requerido'
        }),
    estado: Joi.boolean()
        .default(true)
        .messages({
            'boolean.base': 'El estado debe ser un valor booleano'
        }),
    imagen: Joi.string()
        .uri()
        .optional()
        .allow('')
        .pattern(/^https?:\/\/[a-zA-Z0-9\-\.]+\.[a-z]{2,}([\/\w \.-]*)*\/?$/)
        .messages({
            'string.base': 'La imagen debe ser una URL válida',
            'string.uri': 'La imagen debe tener un formato de URL válido'
        }),
    cursos: Joi.array()
        .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)) // Validación de un array de ObjectId (24 caracteres hexadecimales)
        .optional()
        .messages({
            'array.base': 'Cursos debe ser un array',
            'string.pattern.base': 'Cada curso debe ser un ID de MongoDB válido (24 caracteres hexadecimales)'
        }),
});

module.exports = { usuarioSchemaValidation };
const { z } = require('zod');

const taskSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string',
        })
        .trim()
        .min(1, 'Title cannot be empty')
        .max(100, 'Title cannot exceed 100 characters'),
    description: z
        .string()
        .trim()
        .max(500, 'Description cannot exceed 500 characters')
        .optional()
        .default(''),
    completed: z.boolean().optional().default(false),
});

const taskUpdateSchema = taskSchema.partial();

const validateTask = (req, res, next) => {
    try {
        req.body = taskSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
        }
        next(error);
    }
};

const validateTaskUpdate = (req, res, next) => {
    try {
        req.body = taskUpdateSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors.map((e) => ({
                    field: e.path.join('.'),
                    message: e.message,
                })),
            });
        }
        next(error);
    }
};

module.exports = { validateTask, validateTaskUpdate };

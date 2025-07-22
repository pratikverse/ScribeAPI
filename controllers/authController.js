const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config/config');
const ApiResponse = require('../utils/response');

exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const newUser = await User.create({
            username: username.trim(),
            email: email.toLowerCase().trim(),
            password_hash: password 
        });

        const userData = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt
        };

        return ApiResponse.success(res, userData, 'User registered successfully', 201);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return ApiResponse.error(res, 'Username or email already exists', 409);
        }
        if (error.name === 'SequelizeValidationError') {
            const validationErrors = error.errors.map(err => err.message);
            return ApiResponse.error(res, 'Validation failed', 400, validationErrors);
        }
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email: email.toLowerCase().trim() },
            attributes: ['id', 'username', 'email', 'password_hash']
        });

        if (!user || !(await user.validPassword(password))) {
            return ApiResponse.error(res, 'Invalid credentials', 401);
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            config.jwtSecret,
            { expiresIn: config.jwtExpiresIn }
        );

        const userData = {
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token
        };

        return ApiResponse.success(res, userData, 'Login successful');
    } catch (error) {
        next(error);
    }
};

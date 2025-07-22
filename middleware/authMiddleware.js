const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication invalid: No token provided or malformed header.' });
    }

 
    const token = authHeader.split(' ')[1];

    try {
        
        const decoded = jwt.verify(token, config.jwtSecret);
     
        req.user = { id: decoded.userId }; 

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication invalid: Token is not valid.' });
    }
};

module.exports = authMiddleware;

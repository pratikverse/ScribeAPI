

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// User registration validation
exports.validateRegister = (req, res, next) => {
    const { username, email, password } = req.body;
    
    if (!username || username.trim().length < 3) {
        return res.status(400).json({ 
            message: 'Username is required and must be at least 3 characters long.' 
        });
    }
    
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ 
            message: 'Valid email is required.' 
        });
    }
    
    if (!password || !passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.' 
        });
    }
    
    next();
};

// User login validation
exports.validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ 
            message: 'Valid email is required.' 
        });
    }
    
    if (!password) {
        return res.status(400).json({ 
            message: 'Password is required.' 
        });
    }
    
    next();
};

// Post creation/update validation
exports.validatePost = (req, res, next) => {
    const { title, content } = req.body;
    
    if (!title || title.trim().length < 1) {
        return res.status(400).json({ 
            message: 'Title is required.' 
        });
    }
    
    if (!content || content.trim().length < 1) {
        return res.status(400).json({ 
            message: 'Content is required.' 
        });
    }
    
    next();
};

// Comment validation
exports.validateComment = (req, res, next) => {
    const { text } = req.body;
    
    if (!text || text.trim().length < 1) {
        return res.status(400).json({ 
            message: 'Comment text is required.' 
        });
    }
    
    next();
};

// Tag validation
exports.validateTag = (req, res, next) => {
    const { name } = req.body;
    
    if (!name || name.trim().length < 1) {
        return res.status(400).json({ 
            message: 'Tag name is required.' 
        });
    }
    
    next();
};

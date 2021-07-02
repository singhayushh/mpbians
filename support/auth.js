const jwt = require('jsonwebtoken');

const auth = (passer) => {
    return async (req, res, next) => {
        try {
            const decoded = jwt.verify(req.cookies['auth_token'], process.env.JWT_SECRET);
            req.body.user = decoded;
            if (decoded && passer == 'block')
                res.redirect('/');            
            else if (passer == 'admin') {
                if (decoded.role != 'Admin')
                    res.status(401).send({ "message": "You are not authorized to use this service" }); 
                else 
                    next();
            } else
                next();                 
        } catch (error) {
            console.log(error);
            res.redirect('/login?status=unauthorized');
        }
    };
}

module.exports = auth;
const jwt = require('jsonwebtoken');

const authenticateJWT = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(token){
        jwt.verify(token , process.env.JWT_SECRET, (err, user) => {
            if(err){
                return res.status(403).json({message : 'Invalid or expired toen'});
            }
            req.user = user;
            next();
        });
    }else{
        res.status(401).json({message : 'Token missing or unauthorized'});
    }
};

const verifyRole = (role) => {
    return (req,res,next) => {
        if(req.user && req.user.role === role){
            next();
        }else{
            res.status(403).json({message : 'Access denied : Admins only'});
        }
    };
};

module.exports = { authenticateJWT , verifyRole};
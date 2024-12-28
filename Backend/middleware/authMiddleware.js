const jwt = require('jsonwebtoken');

const authenticateJWT = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if(token){
        jwt.verify(token , process.env.JWT_SECRET, (err, user) => {
            if(err){
                console.error(err);
                return res.status(403).json({message : 'Invalid or expired toen'});
            }
            req.user = user;
            next();
        });
    }else{
        res.status(401).json({message : 'Token missing or unauthorized'});
    }
};

const verifyRoles = (...roles) => {
    return (req,res,next) => {
        if(req.user && roles.includes(req.user.role)){
            next();
        }else{
            res.status(403).json({message : 'Access denied'});
        }
    };
};

module.exports = { authenticateJWT , verifyRoles};
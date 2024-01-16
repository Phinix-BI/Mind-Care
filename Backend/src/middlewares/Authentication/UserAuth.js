import jwt from 'jsonwebtoken';

export const UserAuth = async (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}

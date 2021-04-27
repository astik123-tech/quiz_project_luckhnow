import jwt from "jsonwebtoken";
import createError from "http-errors";

const ACCESS_SECRET_KEY =
  "21ac597683751d25e6f093d43d48d372e609ba56611fae581aaf26252a8b2554";

export const signAccessToken = (userId) =>{
    return new Promise((resolve, reject)=>{
        const payload = {}
        const secret = ACCESS_SECRET_KEY
        const option={
            expiresIn:'86400s',
            issuer:'API.com',
            audience:toString(userId)
        }
        jwt.sign(payload,secret,option,(err, token)=>{
            if(err) reject(createError.InternalServerError())
            resolve(token)
        })
    })
}

export const verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return next(createError.InternalServerError());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];

  jwt.verify(token, ACCESS_SECRET_KEY, (err, payload) => {
    if (err)
      return next(
        err.message == "JsonWebTokenError"
          ? creteError.Unauthorized("Unauthorized")
          : creteError.Unauthorized(err)
      );
    res.payload = payload;
    next();
  });
};

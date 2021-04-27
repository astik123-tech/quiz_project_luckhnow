const NotFound = async  (req, res, next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
 };

const errorHandler = async  (err, req, res, next)=>{
    const statusCode = err?.status === 200 ? 500 :err?.status;
    res.status(statusCode);
    res.json({
        message:err.message
    })
}

export  { NotFound , errorHandler} 
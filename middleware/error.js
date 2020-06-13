const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    //log some exception
     console.log(`Error: ${err}`); //this give me a declared error msg ^_^
    
    let error = {...err}; 
    error.message = err.message ;
    // // console.log(error);


    //here we will creat our instance Error from our Custom ErrorResponse Class
    //Mongoose Bad OpjectID
    if(err.name ==='CastError'){
        const message = `Resource Not Found on Database With That ID: ${err.value}` ;
        error = new ErrorResponse( message ,404);
    }

    //Mongoose Duplicate Key
    if(err.code === 11000){
        const message = `Duplicate Value There is another Entity with that name` ;
        error = new ErrorResponse( message ,400);
    }
    // Mongoose validation error
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse( message ,400);
    }

    // Original Error Message 
    res.status(error.statuscode || 500).send({
        state: false,
        msg: 'Internal server error',
        error: error.message || 'Server Error'
    });
}
//header("Application-Error",error.message)

module.exports  = errorHandler
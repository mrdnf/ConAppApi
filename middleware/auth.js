const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');
const vars = require('../config/vars');


//protect routes
exports.protect = asyncHandler(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    //  else if(req.cookie.token) token = req.cookie.token

    if (!token) {
        return next(new ErrorResponse('not authorized to access this route', 401));
    }

    try {
        //verify token
        const decoded = jwt.verify(token, vars.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return next(new ErrorResponse('not authorized to access this route', 401));
    }

});



//Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`user role ${req.user.role} is not authorized to to access this route`, 403));
        }
        next();
    }
}
module.exports = {


/////////////////////////////////////////////////////////////////////Enviroment setting
NODE_ENV : "development",
PORT : "3001",
DBIN : "mongodb://localhost:27017/bootcapms",
DBOUT : "mongodb+srv://dnf:123@danofa-3feqm.mongodb.net/test?retryWrites=true&w=majority",


/////////////////////////////////////////////////////////////////////file upload options
FILE_UPLOAD_PATH : "./public/uploads",
FILE_UPLOAD_MAX_SIZE : "1000000",


/////////////////////////////////////////////////////////////////////Auth Sec
JWT_SECRET : "6kty645ty645|54#%@",
JWT_EXPIRE : "7d",
COOKIE_EXPIRE : "7",


/////////////////////////////////////////////////////////////////////node mailer conf
CompanyName : "ConApp",
SMTP_SERVER : "mail.syseagles.com",
SMTP_PORT : "587",
SMTP_EMAIL : "danofa@syseagles.com",
SMTP_PASSWORD : "Ayooa3Ayooa#",
FROM_EMAIL : "danofa@syseagles.com",
FROM_NAME : "Sys Eagles Admin",
};

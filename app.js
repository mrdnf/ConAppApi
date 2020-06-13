const colors = require('colors');
const vars = require('./config/vars');


//====================================================express
const express = require('express');
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
//====================================================express



//====================================================cors
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//====================================================cors


//====================================================cors
const cors = require('cors');
app.use(cors());
//====================================================cors


//====================================================cors
const morgan = require('morgan');
app.use(morgan('dev'));
//====================================================cors


//======================================================DB 
const connectDB = require('./config/db');
connectDB();
//======================================================DB 


//============================================Route Files
const customer = require('./routes/customer');
const supplier = require('./routes/supplier');


const product = require('./routes/product');
const unit = require('./routes/unit');

const supplierProduct = require('./routes/supplierProduct');

const bank = require('./routes/bank');

const branch = require('./routes/branch/branch');
const cashbox =  require('./routes/branch/cashbox');
const store = require('./routes/branch/store');

const operation = require('./routes/operation');

const opsstore1st = require('./routes/1st/ops-store-1st');
const opsbank1st = require('./routes/1st/ops-bank-1st');
const opscash1st = require('./routes/1st/ops-cash-1st');
const opscustomer1st = require('./routes/1st/ops-customer-1st');
const opssupplier1st = require('./routes/1st/ops-supplier-1st');



const opsbuybank = require('./routes/buy/ops-buy-bank');
const opsbuycash = require('./routes/buy/ops-buy-cash');
const opsbuycredit = require('./routes/buy/ops-buy-credit');

const opssellbank = require('./routes/sell/ops-sell-bank');
const opssellcash = require('./routes/sell/ops-sell-cash');
const opssellcredit = require('./routes/sell/ops-sell-credit');

const opspaymentcustomer = require('./routes/payment/ops-customer-payment');
const opspaymentsupplier = require('./routes/payment/ops-supplier-payment');


const user = require('./routes/user');
const auth = require('./routes/auth');
//============================================Route Files


//============================================Mount Route
app.use('/api/v1/customer', customer);
app.use('/api/v1/supplier', supplier);

app.use('/api/v1/product', product);
app.use('/api/v1/unit', unit);

app.use('/api/v1/supplierproduct', supplierProduct);


app.use('/api/v1/bank', bank);

app.use('/api/v1/branch', branch);
app.use('/api/v1/cash', cashbox);
app.use('/api/v1/store', store);


app.use('/api/v1/operation', operation);

app.use('/api/v1/opsstore1st', opsstore1st);
app.use('/api/v1/opsbank1st', opsbank1st);
app.use('/api/v1/opscash1st', opscash1st);
app.use('/api/v1/opscustomer1st', opscustomer1st);
app.use('/api/v1/opssupplier1st', opssupplier1st);



app.use('/api/v1/opsbuybank', opsbuybank);
app.use('/api/v1/opsbuycash', opsbuycash);
app.use('/api/v1/opsbuycredit', opsbuycredit);

app.use('/api/v1/opssellbank', opssellbank);
app.use('/api/v1/opssellcash', opssellcash);
app.use('/api/v1/opssellcredit', opssellcredit);

app.use('/api/v1/opspaymentcustomer', opspaymentcustomer);
app.use('/api/v1/opspaymentsupplier', opspaymentsupplier);


app.use('/api/v1/user', user);
app.use('/api/v1/auth', auth);
//============================================Mount Route


//==================================================errorHandler
const errorHandler = require('./middleware/error');
app.use(errorHandler);
//==================================================errorHandler


const PORT = vars.PORT;
//====================================================================================set The listening 
app.listen(PORT, () => { console.log( `App Running on Port ${PORT}`.yellow.bold );  });
//====================================================================================set The listening 



//=====================================================================================Handle Unhandled Promise Rejections
process.on('unhandledRejection' ,(error ,promise) => {
    //log some exception
    console.log(`Error: ${error.message}`.rainbow.bold);
    //Close Server & Exit Process
    app.close(()=> process.exit(1));              });
//======================================================================================Handle Unhandled Promise Rejections
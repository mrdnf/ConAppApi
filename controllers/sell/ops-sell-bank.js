const Operation = require('../../models/sell/Ops-sell-bank');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');


const Product = require('../../models/Product');
const Customer = require('../../models/Customer');
const Bank = require('../../models/Bank');
const Store = require('../../models/Store');

// @description Get All acconts
// Rout GET api/v1/operation
//Access Public 
exports.getOperations =  asyncHandler(async (req, res, next) => {

    let query = { ops: "sell", paymentType: "bank" };

    const operations = await Operation.find(query).sort({createdAt: -1});

    let operationsCount = await Operation.find(query).countDocuments();

    res.status(200).json({
        state: true,
        msg: 'Get All Resource Data From Database',
        count: operationsCount,
        data: operations
    });
});


// @description Get Single operation
// Rout GET api/v1/operation/:id
//Access Public 
exports.getOperation = asyncHandler(async (req, res, next) => {
    const operation = await Operation.findById(req.params.id);

    if (!operation) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }
    res.status(200).json({
        state: true,
        msg: 'Fetch Single operation Successfully',
        data: operation
    });
});


exports.postOperation =  asyncHandler(async (req, res, next) => {


    let productx = await Product.findOne({_id: req.body.product}).populate('unit');
    let bankx = await Bank.findOne({_id: req.body.bank});    
    let storex = await Store.findOne({_id: req.body.store});
    let customerx = await Customer.findOne({_id: req.body.customer});
    let unitx = req.body.unit;
    



    let payload = {
        product       : req.body.product,
        productName   : productx.name,
        bank          : req.body.bank,
        bankName      : bankx.name,
        customer      : req.body.customer,
        customerName  : customerx.name,
        store         : req.body.store,
        storeName     : storex.name,
        unit          : req.body.unit,
        quantity      : req.body.quantity,
        price         : req.body.price,
        total         : req.body.price * req.body.quantity,
        accounting    : [
                            {   id: req.body.bank,
                                debit: 0,
                                credit: req.body.price * req.body.quantity,
                                details: `sell by bank (${bankx.name}) ${req.body.quantity} ${unitx} Of ${productx.name} to ${customerx.name} from ${storex.name} store`  
                            },
                        
    /*                                 { id: req.body.customer,
                                        debit: 0,
                                        credit: req.body.total,
                                        details: `payment by bank(${bankx.name}) to sell ${req.body.quantity} ${unitx}  Of ${productx.name}` },
                                
                                    { id: req.body.customer,
                                        debit: req.body.total,
                                        credit: 0,
                                        details: `sell by bank(${bankx.name}) ${req.body.quantity} ${unitx}  Of ${productx.name}` }   */
        
                        ],
    
        storebalance  : [
                            {   store         : req.body.store,
                                storeName     : storex.name,
                                product       : req.body.product,
                                productName   : productx.name,
                                unit          : productx.unit.small,
                                in            : 0,
                                out           : unitx == productx.unit.large? req.body.quantity * productx.unit.ratio : req.body.quantity,
                            }
                        ]
    };









            const operation = await Operation.create(payload);
        
            res.status(200).json({
                state: true,
                msg: `New operation to add - Created successfully`,
                data: operation
            });   
        
});

// @description update operation
// Rout PUT api/v1/operation/:id
//Access Private 
exports.updateOperation =  asyncHandler(async (req, res, next) => {

     
//data


let productx = await Product.findOne({_id: req.body.product}).populate('unit');
let bankx = await Bank.findOne({_id: req.body.bank});    
let storex = await Store.findOne({_id: req.body.store});
let customerx = await Customer.findOne({_id: req.body.customer});
let unitx = req.body.unit;




let payload = {
    product       : req.body.product,
    productName   : productx.name,
    bank          : req.body.bank,
    bankName      : bankx.name,
    customer      : req.body.customer,
    customerName  : customerx.name,
    store         : req.body.store,
    storeName     : storex.name,
    unit          : req.body.unit,
    quantity      : req.body.quantity,
    price         : req.body.price,
    total         : req.body.price * req.body.quantity,
    accounting    : [
                        {   id: req.body.bank,
                            debit: 0,
                            credit: req.body.price * req.body.quantity,
                            details: `sell by bank (${bankx.name}) ${req.body.quantity} ${unitx} Of ${productx.name} to ${customerx.name} from ${storex.name} store`  
                        },
                    
/*                                 { id: req.body.customer,
                                    debit: 0,
                                    credit: req.body.total,
                                    details: `payment by bank(${bankx.name}) to sell ${req.body.quantity} ${unitx}  Of ${productx.name}` },
                            
                                { id: req.body.customer,
                                    debit: req.body.total,
                                    credit: 0,
                                    details: `sell by bank(${bankx.name}) ${req.body.quantity} ${unitx}  Of ${productx.name}` }   */
    
                    ],

    storebalance  : [
                        {   store         : req.body.store,
                            storeName     : storex.name,
                            product       : req.body.product,
                            productName   : productx.name,
                            unit          : productx.unit.small,
                            in            : 0,
                            out           : unitx == productx.unit.large? req.body.quantity * productx.unit.ratio : req.body.quantity,
                        }
                    ]
};


//var
let filter = {_id: req.params.id};
let replacement =  payload ;
let options = { new: true };
//update
let operation = await Operation.findOneAndUpdate(filter, replacement, options);
res.status(200).json({
    state: true,
    msg: ` Operation updated successfully`,
    data: operation
});   
});


// @description Delete operation
// Rout DELETE api/v1/operation/:id
//Access Private 
exports.deleteOperation = asyncHandler(async (req, res, next) => {

    const operation = await Operation.findByIdAndDelete(req.params.id);

    if (!operation) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Operation ( ${req.params.id} ) Deleted Successfully`,
    });
});
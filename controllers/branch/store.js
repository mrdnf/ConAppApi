const Store = require('../../models/Store');

const Product = require('../../models/Product');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async')

// @description Get All Stores (view stores names only)
// Rout GET api/v1/store
//Access Public 
exports.getStores = asyncHandler(async (req, res, next) => {

  const stores = await Store.find().sort({createdAt: -1});
  const storesCount = await Store.countDocuments();

  res.status(200).json({
      state: true,
      msg: 'Get All Resource Data From Database',
      count: storesCount,
      data: stores
  });
});


// @description Get All Stores (view stores with its balance)
// Rout GET api/v1/store
//Access Public 
exports.getStoresPlus = asyncHandler(async (req, res, next) => {

  const stores = await Store.find().populate('balance');

  res.status(200).json({
      state: true,
      msg: 'Get All Resource Data From Database',
      data: stores
  });
});

// @description Get Single Store
// Rout GET api/v1/store/:id
//Access Public 
exports.getStore = asyncHandler(async (req, res, next) => {
   
        let itemx = await Store.findById(req.params.id).populate('balance').exec();    
        let x=[];
        for (let y = 0; y < itemx.balance.length; y++) {
            
        for (let i = 0; i < itemx.balance[y].storebalance.length; i++) {
                if(JSON.stringify(itemx._id) == JSON.stringify(itemx.balance[y].storebalance[i].store))  { x.push( itemx.balance[y].storebalance[i]) } ;
            }   
        }

        let g = [];
        for (let r = 0; r < x.length; r++) { g.push(x[r].product) }

        function removeDups(g) {
        let unique = {};
        g.forEach(function(i) { if(!unique[i]) {unique[i] = true;}});
        return Object.keys(unique);
        }
        let uniqq =  removeDups(g);


        let  ins = 0, outs = 0;
        let Products = [];
        let totally=[];
        for (let w = 0; w < uniqq.length; w++) {
        let item =  x.filter(el=> el.product == uniqq[w])
            let dataIn=[],
            dataOut=[]
            for (let u = 0; u < item.length; u++) {
            dataIn.push(item[u].in);
                ins = dataIn.reduce(function(acc, val) { return acc + val; }, 0);
            dataOut.push(item[u].out);
            outs = dataOut.reduce(function(acc, val) { return acc + val; }, 0);
            }
            totally.push(ins-outs);
        }



        for (let bb = 0; bb < uniqq.length; bb++) {
           let prox = await Product.findById(uniqq[bb]);
           Products.push({ ProductName: prox.name , Balance:totally[bb]});
        } 
      


        res.status(200).json({
            state: true,
            msg: 'Fetch Single store Successfully',
            data: { name: itemx.name, totalProducts: uniqq.length, Products},
            
    });
});




// @description Creat New Store
// Rout POST api/v1/store
//Access Private 
exports.postStore = asyncHandler(async (req, res, next) => {

    const store = await Store.create({name: req.body.name});

    res.status(200).json({
        state: true,
        msg: `New Store - ${req.body.name} - Created successfully`,
        data: store
    });
});

// @description Put an Store
// Rout PUT api/v1/store/:id
//Access Private 
exports.updateStore = asyncHandler(async (req, res, next) => {

    let store = await Store.findById(req.params.id);

    if (!store) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        state: true,
        msg: `Store ( ${req.params.id} ) Updated Successfully`,
        data: store
    });
});

// @description Delete A Store
// Rout DELETE api/v1/store/:id
//Access Private 
exports.deleteStore = asyncHandler(async (req, res, next) => {

    const store = await Store.findByIdAndDelete(req.params.id);

    if (!store) {
        return next(new ErrorResponse(`Error in ID: ${req.params.id}`, 404));
    }

    res.status(201).json({
        state: true,
        msg: `Store ( ${req.params.id} ) Deleted Successfully`,
    });
});
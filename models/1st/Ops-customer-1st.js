const mongoose = require("mongoose");

var OperationSchema = new mongoose.Schema(
    {
        ops: { type: String, default: "1st balance" },
        customer: { type: mongoose.Schema.ObjectId, ref: "Customer" },
        customerName: String,
        total:String,
        accounting: [
            {
                id: { type: mongoose.Schema.ObjectId, ref: "Customer" },
                credit: Number,
                debit: { type: Number, default: 0 },
                details: { type: String },
                date: { type: String, default: new Date() }
            }
        ]
    },
    { timestamps: true }
);



module.exports = mongoose.model("opsCustomer1st", OperationSchema, "Operation");

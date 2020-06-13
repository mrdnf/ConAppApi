const mongoose = require("mongoose");

var OperationSchema = new mongoose.Schema(
    {
        ops: { type: String, default: "1st balance" },
        supplier: { type: mongoose.Schema.ObjectId, ref: "Supplier" },
        supplierName: String,
        total:String,
        accounting: [
            {
                id: { type: mongoose.Schema.ObjectId, ref: "Supplier" },
                credit: Number,
                debit: { type: Number, default: 0 },
                details: { type: String },
                date: { type: String, default: new Date() }
            }
        ]
    },
    { timestamps: true }
);


module.exports = mongoose.model("opsSupplier1st", OperationSchema, "Operation");

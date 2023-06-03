const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products : [
        {
            type : mongoose.ObjectId,
            ref : 'product'
        }
    ],
    payment : {
        type:Number
    },
    buyer : {
        type : mongoose.ObjectId,
        ref : 'users'
    },
    status : {
        type : String,
        default : "Not Process",
        enum: ['Not Process', 'Processing', 'Shipped' ,"Delivered", 'Cancel']
    }
},{timestamps  : true})
const orderModel = mongoose.model('order',orderSchema)
module.exports = orderModel;
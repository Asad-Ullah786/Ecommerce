const express = require ('express');
const connectDB = require("./config/db") 
const morgan = require('morgan')
const router = require('./routes/authRoute')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require("./routes/productRoutes")
const color=require('colors')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
require("dotenv").config();

connectDB();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(morgan('dev'))

// database connection method
app.use("/api/v1/auth", router)
app.use("/api/v1/category", categoryRoutes)
app.use("/api/v1/product", productRoutes)
console.log(process.env.PORT)
const PORT= 2020;



app.listen(PORT,()=>{
    console.log(`running on POrt :${PORT}`.bgCyan.white); 
})
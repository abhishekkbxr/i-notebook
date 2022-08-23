const express = require('express');
const app = express();
const cookiParser = require('cookie-parser')

const errorMiddleware = require('./middleware/error')

app.use(express.json());
app.use(cookiParser());


// Route import 
app.use('/api/v1' , require('./routes/productRoutes'))
app.use('/api/v1' , require('./routes/userRoutes'))
app.use('/api/v1' , require('./routes/orderRoutes'))





// middleware for error
app.use(errorMiddleware);


module.exports=app;
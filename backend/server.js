const app = require('./app')
const dotenv = require('dotenv')
const connectToMongo = require('./db')

// handeling unCaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`suttning down the server due to unCaught Exception `)
    process.exit(1);
})


// config
dotenv.config({ path: "backend/config/config.env" })

// connecting to data base 
connectToMongo()

// server 
const server = app.listen(process.env.PORT, () => {
    console.log(`server listen on http://localhost:${process.env.PORT}`)
})


// Unhandaled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`suttning down the server due to Unhandaled promise rejection `)
    server.close(() => {
        process.exit(1);
    })
})
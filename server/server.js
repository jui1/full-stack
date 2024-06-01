const dotenv  =  require("dotenv")
const express  =  require("express")
const userRoute = require("../server/Router/userRoute")
const mongoose = require("mongoose")

const app = express()
dotenv.config();
const cors =  require("cors")
app.use(cors())
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connect mongoDb")
}).catch((err)=>{
    console.log(err)
})


app.use("/api/users", userRoute);

const PORT = 8000;

app.listen(PORT,()=>{
    console.log(`ypur server is running ${PORT} `)
})
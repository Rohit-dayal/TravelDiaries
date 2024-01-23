import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
// We created index.js file because in package.json the main file is mentioned as index.js

dotenv.config();
mongoose.connect(
    process.env.MONGO
)
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((err)=>{
    console.log(err);
})
const app = express();
// As a default we are not allowed to send the json to the backend so we need to use the below line. 
//This will allow the json as a input to the backend
app.use(express.json());

app.listen(3000,() => {
    console.log('server is running on port 3000 !!')
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)

// This is the middleware we use it to get rid of from rewritting the same code multiple times 
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})
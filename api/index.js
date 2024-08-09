import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
// We created index.js file because in package.json the main file is mentioned as index.js
import cookieParser from 'cookie-parser'; // for this we installed a package name npm i cookie-parser
// deploying on render
import path from 'path';

dotenv.config();
mongoose.connect(
    process.env.MONGO
)
.then(()=>{
    console.log('Connected to MongoDb')
})
.catch((err)=>{
    console.log(err);
});

const __dirname = path.resolve(); // deployment

const app = express();
// As a default we are not allowed to send the json to the backend so we need to use the below line. 
//This will allow the json as a input to the backend
app.use(express.json());
app.use(cookieParser()); // So by this way we can get a cookie from a browser 

app.listen(3000,() => {
    console.log('server is running on port 3000 !!')
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)
app.use('/api/comment',commentRoutes)

app.use(express.static(path.join(__dirname,'/client/dist'))) // if we are using create react app then we have to use /client/build
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})


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
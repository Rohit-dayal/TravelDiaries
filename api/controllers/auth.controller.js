import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils.js/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;

    if(!username || !email ||!password || username === '' || email === '' || password === ''){
        next(errorHandler(400,'All fields are required'))
    }
    // we used bcryptjs for hashing the password for security purpose
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        // console.log(newUser)
      res.json('Signup successful')
    } catch (error) {
        // console.log(error)
        next(error);
    }  
}

export const signin = async (req,res,next) =>{
    const {email,password} = req.body;

    if(!email ||!password || email === ''  || password === ''){
        next(errorHandler(400,'All fields are required'))
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found'));
        } 
        const validPassword = bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(404,'Invalid password'));
        }
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET,)
        // {expiresIn:'1d'} we use this when we want that the user will be logged out once he closes his browser
        
        const {password: pass,...rest} = validUser._doc

        // we set the httpOnly: true to make our cookie secure
        res.status(200).cookie('access_token',token, {httpOnly: true}).json(rest)
    } catch (error) {
        next(error);
    }
}
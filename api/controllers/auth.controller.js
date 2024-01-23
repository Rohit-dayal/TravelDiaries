import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils.js/error.js';

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
        console.log(newUser)
      res.json('Signup successful')
    } catch (error) {
        console.log(error)
        next(error);
    }
    
}
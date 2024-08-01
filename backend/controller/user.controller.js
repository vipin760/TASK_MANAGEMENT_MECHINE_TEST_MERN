const User = require("../model/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const generateToken=(userExist)=>{
    const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET,{expiresIn:'30d'})
    return token
}

exports.userRegister= async(req,res)=>{
    try {
        const { name,email } = req.body
        const userExist =await User.findOne({email:email});
        if(userExist){
           return res.status(401).send({message:"user already exist"});
        }
        const hashPassword = await bcrypt.hash(req.body.password,10);
        console.log(hashPassword);
        const saveUser = {
            name:name,
            email:email,
            password:hashPassword
        }
        await User.create(saveUser).then(data=>{
           res.status(200).send({message:`welcome ${name} your registration completed`});
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"internal server down"});
    }
}

exports.userLogin = async(req,res)=>{
    try {
        const { email, password} = req.body
        const userExist = await User.findOne({email:email});
        if(!userExist){
            return res.status(401).send({message:'incorrect email or password'})
        }
        const passwordMatch = await bcrypt.compare(password,userExist.password);
        if(!passwordMatch){
            return res.status(401).send({message:'incorrect email or password'}) 
        }
        const token = generateToken(userExist)
        return res.status(200).send({token:token,message:"login success..."});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:"internal server down"});
    }
}
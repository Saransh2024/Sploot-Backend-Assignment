

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {db}=require("../config/db");

const User = require("../models/User");

const register=async (req, res) => {
  const { name, email, password ,age} = req.body;

  // check all the missing fields.
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ statusCode:400,error: `Please enter all the required field.` });

  // name validation.
  if (name.length > 25)
    return res
      .status(400)
      .json({ statusCode:400,error: "name can only be less than 25 characters" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ statusCode:400,error: "please enter a valid email address." });

  // validation of password.
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be atleast 6 characters long" });
  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res.status(400).json({
        statusCode:400,
        error: `a user with that email [${email}] already exists so please try another one.`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword,age });

    // save the user.
    const result = await newUser.save();

    result._doc.password = undefined;

    const resultdata={

      statusCode:null,
      data:
      {
        data:result._doc

    }
  }

    return res.status(201).json({ ...resultdata,statusCode:201 });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ statusCode:500,error: err.message });
  }
};

const login =async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ statusCode:400,error: "please enter all the required fields!" });

  // email validation.
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailReg.test(email))
    return res
      .status(400)
      .json({ statusCode:400,error: "please enter a valid email address." });

  try {
    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits)
      return res.status(400).json({ statusCode:400,error: "Invalid email or password!" });

    // if there were any user present.
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ statusCode:400,error: "Invalid email or password!" });

    const payload = { _id: doesUserExits._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const data = { ...doesUserExits._doc, password: undefined };
    const result={
          statusCode:null,
          data:{
            data:data,
            token:token
          }
    }


    return res.status(200).json({...result,statusCode:200});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ statusCode:500,error: err.message });
  }
};
const updateprofile=async(req,res)=>
{
 
  try{
    const name=req.body.name;
    const age=req.body.age;
   const {userId}= req.params;
    const userprofile=await User.find({_id:userId});
   
   const updatedData = { ...userprofile,name:name,age:age };
   const data = await User.findByIdAndUpdate(userId, updatedData, {
     new: true,
     
   }
   
   );
   const result={
    statusCode:null,
    data:{
        data
    }
   }
   return res.status(201).json({...result,statusCode:201});
  }catch(err)
  {
    return res.status(500).json({statusCode:500,error:err});
  }
  
};



  module.exports={login,register,updateprofile};
  
  
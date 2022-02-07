const sequelize = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");


/// MODEL 
const User = require("../models/user");


module.exports.register = async (req, res)=> {

  sequelize.sync().then( async  () =>{

    const email = await User.findOne( { where : { email: req.body.email }});
    if (email) {
      return res.send({
        code: 409,
        message: "user already exist with that email address",
      });
    }
     try{
      const isUserCreated = await User.create({
        email: req.body.email,
        username: req.body.username,
        user_type: req.body.user_type,
        phone:req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      if(isUserCreated){
        return res.status(200).send({
            message:'created successfully',
            code:200,
          });
    }
    return res.status(400).send({
        message:'something went wrong, try again',
        code:400
    })   
      } catch(error){
        return res.send({
          message:'please send valid data',
          message: error.errors[0].message,
          error: error.error,
        })
      }
  } )
    
} ;



module.exports.login = async (req, res)  =>{
  sequelize.sync().then( async ()=>{
    const secret = process.env.SECRET;
    let findQuery ={
      where: { email: req.body.email},
      attributes:['id', 'username', 'email','password']
    }
  const user = await User.findOne(findQuery);

  // check if user not found
  if (!user) {
    return res.status(401).json({ code: 401, message: "user not found." });
  }
  // check for credentials
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign({ id: user.id }, secret, {
      expiresIn: "1d",
    });
    let {id, username, email,  } = user;
    return res.status(200).json({
      code: 200,      
      userId: id,
      email: email, 
      name: username,
      token,
    });
  } else {
    return res.status(401).send({
      code: 401,
      message: "Invalid email or password",
    });
  }
  } )
}


//LIST OF USER

module.exports.listOfRegisteredUser = async (req, res)=>{
    sequelize.sync().then( async () =>{
      const userList = await User.findAll({});
  if (!userList) {
    return res.status(400).json({
      message: "no user in collection ",
    });
  }
  return res.status(200).send({
    user: userList,
  });

    } )



}

module.exports.userInfo = async (req, res)=>{
  sequelize.sync().then( async () =>{
    try {
     let findQuery ={
       where:{id: req.query.id   },
       attributes:['id', 'username', 'phone','address','addressTitle','state',]
     }
      const user = await User.findOne(findQuery);
      if (!user) {
        return res.status(400).json({
          message: "Record not found",
        });
      } else if(user){
      return res.status(200).send({
        status: 200,
        message:"Fetch succesffully",
        user: user,
      });
    }       
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message:"Server Error",
      });
    }

  } )
}



module.exports.updateUser = async (req, res)=>{
  sequelize.sync().then( async () =>{
    try {
     let findQuery ={
       where:{id: req.body.id   },
     }
      const user = await User.findOne(findQuery);

      if (!user) {
        return res.status(400).json({
          status: 400,
          message: "Record not found",
        });
      } else if(user){
         let isUserUpdated = await User.update(req.body, findQuery );
         if(isUserUpdated){
          return res.status(200).send({
            status: 200,
            message:"User updated Successfully",
          });
         } else {
          return res.status(400).send({
            status: 400,
            message:"DB Error, try again",
          });
         }
    }       
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message:"Server Error",
      });
    }

  } )
}

const jwt = require("jsonwebtoken");
const { User } = require('../models'); 
const { ApiError } = require("./ApiError");

const verifyToken = async (req, res, next)=>{
  try {
      const authorizationHeader = req.headers.authorization
      if (!authorizationHeader){
          throw new ApiError(401, 'Unauthorized')
      }
      const token = authorizationHeader.split(' ')[1]
      if(!token){
          throw new ApiError(401, 'Unauthorized')
      }
      const id = jwt.verify(token, process.env.JWT_SECRET)
      req.user= id
      next()
  } catch (error) {
      next(error)
  }
}


 const verfiyHrAuth =async(req, res, next)=>{
  try {
      const user = await User.findOne({where:{id:req.user.id}})
      if(!user || user.role!='HR'){
          throw new ApiError(403,'you are not authorized to access this')
      }
      next()
  } catch (error) {
       next(error)
  }
}

module.exports = { verifyToken,verfiyHrAuth };
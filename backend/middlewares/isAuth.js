
import jwt from "jsonwebtoken"
const isAuth=async (req,res,next)=>{
    try {
 
      let {token} = req.cookies
     
      if(!token){
        return res.status(401).json({message:"user doesn't have token"})
      }
      let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
      
      if(!verifyToken){
        return res.status(401).json({message:"user doesn't have valid token"})
      }
  
      req.userId = verifyToken.userId
      next()
    } catch (error) {
        console.log(error)
        res.clearCookie("token")
        return res.status(401).json({message:`is auth error: invalid token`})
    }
}
export default isAuth
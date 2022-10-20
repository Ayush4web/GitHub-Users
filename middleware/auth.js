const jwt = require('jsonwebtoken')
const UnAutharise = require('../errors/UnAutharise')


const auth = async (req, res, next) => {
  
  if (!req.headers.authorization) {
    throw new UnAutharise('You are not Autharised')
  }
  
  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    res.status(200).json({ sucess: "true", user: decoded })
  } catch (error) {
    
     throw new UnAutharise('You are not Autharised')
  }
  next()
}



module.exports = auth
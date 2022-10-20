
const dashboard = async (req, res) => {
      
}

const update = async (req, res) => {
      
   
 // since we have updated the data, jwt payload needs to get updated too
   const token = jwt.sign(
     {
       name: updatedUser.name,
       email: updatedUser.email,
       profileImg: updatedUser.profileImg,
     },
     process.env.JWT_SECRET,
     { expiresIn: '1d' }
   )

   res.cookie('token', token)

}

module.exports = { dashboard,update }

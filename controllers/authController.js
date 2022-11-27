const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const BadRequest = require('../errors/BadRequest')
const User = require('../model/user')

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequest('Please Provide all details')
  }

  const isDuplicate = await User.findOne({ email })

  if (isDuplicate) {
    throw new BadRequest('Email already exists')
  }
  // hashing password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // creating user
  const user = await User.create({ name, email, password: hashPassword })

  const token = jwt.sign({ name: user.name,email:user.email }, process.env.JWT_SECRET)

  res.cookie('token', token)

  res.status(201).json({ success: 'true',token, user: { name, email } })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequest('Please Provide all details')
  }

  const currentUser = await User.findOne({ email })

  if (!currentUser) {
    throw new BadRequest('Account Does not exists')
  }

  if (currentUser.source == 'google') {
    throw new BadRequest('Please Login using Google')
  }

  const match = await currentUser.comparePassword(password)

  if (!match) {
    throw new BadRequest('Incorrect Credentials')
  }

  const token = jwt.sign(
    {
      name: currentUser.name,
      email: currentUser.email,
      profileImg: currentUser.profileImg,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )

  res.cookie('token', token)
  
  res
    .status(200)
    .json({ success: 'true', token,user: { name: currentUser.name, email } })
}

const logout = async (req, res) => {
  // social logout
  if (res.session) {
    req.session.destroy(function () {
      res.clearCookie('connect.sid')
      res.redirect('/')
    })
  }

  // normal logout
  res.cookie('token', 'logout', { expiresIn: new Date(Date.now()) })
  res.status(200).json({ sucess: 'true', msg: 'User Succesfully Logged out' })
}

module.exports = { register, login, logout }

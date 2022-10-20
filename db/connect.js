const mongoose = require('mongoose')

const connectDB = async (url) => {
  return mongoose.connect(url, console.log('connected to MongoDB'))
}

module.exports = connectDB

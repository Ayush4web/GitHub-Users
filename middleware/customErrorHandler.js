const customErrorHandler = (err, req, res, next) => {
 if (err.statusCode) {
  res.status(err.statusCode).json({ success: 'false', msg: err.message })
 } else {
   res.status(500).json({ success: 'false', msg: err.message })
 }

 next()
}

module.exports = customErrorHandler
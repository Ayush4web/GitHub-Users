class UnAutharise extends Error{
 constructor(msg) {
  super(msg)
  this.statusCode = 401
  }
}

module.exports = UnAutharise
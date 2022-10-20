const notfound = (req, res, next) => {
 res.status(404).json({'msg':"The route you are looking doesn't exists !!!"})
}

module.exports = notfound
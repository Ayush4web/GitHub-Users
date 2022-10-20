const express = require('express')
const router = express.Router()

const { dashboard,update } = require('../controllers/dashboard')

router.get('/dashboard', dashboard)
router.post('/dashboard/update',update)

module.exports = router
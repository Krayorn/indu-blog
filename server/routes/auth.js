import express from 'express'

import auth from '../controllers/auth'

const router = express.Router()

router.post('/auth', auth.authUser)

router.post('/user', auth.registerUser)

export default router

import express from 'express'

import auth from '../controllers/auth'

const router = express.Router()

router.post('/auth', auth.authUser)

router.post('/user', auth.registerUser)

router.get('/user', auth.getAllUsers)

router.delete('/user/:id', auth.deleteUser)

router.patch('/user/:id', auth.updateRole)

export default router

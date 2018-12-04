import express from 'express'

import comment from '../controllers/comment'

const router = express.Router()

router.delete('/comment/:id', comment.deleteComment)

export default router

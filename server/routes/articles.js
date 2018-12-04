import express from 'express'

import article from '../controllers/article'

const router = express.Router()

router.get('/article', article.getAllArticles)

router.post('/article', article.createArticle)

router.get('/article/:id', article.getOneArticle)

router.post('/article/:id', article.writeComment)

router.delete('/article/:id', article.deleteArticle)

router.put('/article/:id', article.editArticle)

export default router

import Article from '../models/Article'
import fetch from 'node-fetch'

async function getJsonResponse (response) {
    const json = await response.json()
    if (response.ok){
      return json
    } else {
      throw json
    }
}

export const createArticle = (req, res, next) => {
    const { title, content } = req.body

    Article.findOne({ title }).then((article) => {
        if (article) {
            return res.sjson({
                status: 400,
                errors: [{
                    id: 'api.article.create.title.existing',
                    msg: 'Il y a déjà un Article portant le même titre !'
                }]
            })
        } else if(req.decoded.role === 'DEFAULT') {
            return res.sjson({
                status: 301,
                errors: ['bad']
            })
        } else {
            new Article({ title, content, author: req.decoded._id, comments: [] })
            .save((err, article) => {
                if (err) res.send(err)

                return fetch(`${process.env.GAME_API_BASE_URL}/gamer/${req.decoded._id}?api_key=${process.env.GAME_API_KEY}`, {
                    mode: 'cors',
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        experience: 20,
                    })
                })
                .then(getJsonResponse)
                .then(gamerInfo => {
                    return res.sjson({
                        status: 200,
                        data: {
                            article,
                            gamerInfo: gamerInfo.data,
                        }
                    })
                })
            })
        }
    })
}

export const getAllArticles = (req, res, next) => {
    Article.find({}).populate('author').populate('comments.author')
    .exec((err, articles)=> {
        if (err)
            res.send(err)
        else if (!articles)
            res.send(404)
        else
            res.sjson({
                status: 200,
                data: articles
            })
    })
}

export const getOneArticle = (req, res, next) => {
    Article.findOne({_id: req.params.id}).populate('author').populate('comments.author')
    .exec((err, article)=> {
        if (err)
            res.send(err)
        else if (!article)
            res.send(404)
        else
            res.sjson({
                status: 200,
                data: article
            })
    })
}

export const writeComment = (req, res, next) => {
    Article.findOne({_id: req.params.id})
    .then((article)=> {
        if (!article)
            return res.send(404)
        return article.comment({
            text: req.body.comment,
            author: req.decoded._id,
        })
        .then((article) => {
            article.populate('author').populate('comments.author', (err) => {

                return fetch(`${process.env.GAME_API_BASE_URL}/gamer/${req.decoded._id}?api_key=${process.env.GAME_API_KEY}`, {
                    mode: 'cors',
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        experience: 10,
                    })
                })
                .then(getJsonResponse)
                .then(gamerInfo => {
                    res.sjson({
                        status: 200,
                        data: {
                            article,
                            gamerInfo: gamerInfo.data,
                        },
                    })
                })

            })
        })
    })
}

export const deleteArticle = (req, res, next) => {
    Article.findOne({_id: req.params.id}, (err, article) => {
        if (req.decoded._id === article.author._id || req.decoded.role === 'ADMIN') {
            Article.deleteOne({_id: req.params.id}, (err, deleted) => {
                return res.sjson({
                    status: 200,
                    data: {
                        id: req.params.id,
                        deleted,
                    },
                })
            })
        }
    })

}

export const editArticle = (req, res, next) => {
    Article.findOne({_id: req.params.id})
    .then(article => {
        if (!article)
        return res.send(404)

        if(req.decoded._id === article.author.toString() || req.decoded.role === 'ADMIN') {

            article.title = req.body.title
            article.content = req.body.content

            article.save((err, updatedArticle) => {
                res.sjson({
                    status: 200,
                    data: updatedArticle
                })
            })
        }

    })
}

export default {
    createArticle,
    getAllArticles,
    getOneArticle,
    writeComment,
    deleteArticle,
    editArticle,
}

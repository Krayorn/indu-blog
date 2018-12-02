import Article from '../models/Article'

export const createArticle = (req, res, next) => {
    const { title, content } = req.body

    new Article({ title, content, author: req.decoded._id, comments: [] })
    .save((err, article) => {
        if (err) res.send(err)
        res.sjson({
            status: 200,
            data: article
        })
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
        .then((comment) => {
            res.sjson({
                status: 200,
                data: comment,
            })
        })
    })
}

export default {
    createArticle,
    getAllArticles,
    getOneArticle,
    writeComment,
}

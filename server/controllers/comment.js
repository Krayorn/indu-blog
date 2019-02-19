import Article from '../models/Article'

export const deleteComment = (req, res, next) => {
    Article.findOne({'comments._id': req.params.id})
    .then((article)=> {
        if (!article)
            return res.send(404)
        return article.uncomment(req.params.id, req.decoded._id)
        .then((article) => {
            Article.populate(article, ['author', 'comments.author'], (err) => {
                res.sjson({
                    status: 200,
                    data: article,
                })
            })
        })
    })
}

export default {
    deleteComment,
}

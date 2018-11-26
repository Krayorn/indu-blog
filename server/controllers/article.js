import Article from '../models/Article'
import User from '../models/User'

export const addArticle = (req, res, next) => {
    const { title, content } = req.body

    new Article({ title, content, author: req.decoded._id })
    .save((err, article) => {
        if (err) res.send(err)
        res.send(article)
    })
}


export default {

}

import mongoose from 'mongoose'

const ArticleSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
)

ArticleSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}

ArticleSchema.methods.getUserArticle = function (_id) {
    ArticleSchema.find({'author': _id}).then((article) => {
        return article
    })
}

export default mongoose.model('Article', ArticleSchema)

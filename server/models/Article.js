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

ArticleSchema.methods.uncomment = function(id, userId) {

    const index = this.comments.findIndex(comment => {
        if (comment._id.toString() === id) {
            return this.author._id.toString() === userId || comment.author._id.toString() === userId
        }
        return false
    })

    if (index !== -1) {
        this.comments.splice(index, 1)
        return this.save()
    }
}

export default mongoose.model('Article', ArticleSchema)

import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import { getOneArticle } from '../../../redux/actions/article'
import { writeComment } from '../../../redux/actions/comment'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class Article extends Component {
    constructor(props) {
        super(props)

        this.props.getOneArticle({id: this.props.match.params.id})
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    writeComment = (e) => {
        e.preventDefault()
        this.props.writeComment({
            ...this.state,
            id: this.props.article._id,
            token: this.props.user.token
        })
    }

    render() {
        const { article, user } = this.props
        console.log('test', user)
        return (
            <RegularLayout>
                <h2>{article.title}</h2>

                <p>
                    {article.content}
                </p>

                {
                    article.comments && article.comments.map((comment) => {
                        return (<div key={comment._id}>
                            <p>{comment.text}</p>
                            <span>by {comment.author.username}</span>
                        </div>)
                    })
                }

                {
                    user &&
                    <div>
                        Publier Un commentaire !

                        <form>
                            <textarea onChange={(e) => this.handleChange('comment', e.target.value)} type='text' placeholder='comment' name='comment' />
                            <button onClick={this.writeComment} >Envoyer mon commentaire !</button>
                        </form>
                    </div>
                }

            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    article: state.article.detail || {},
    user: state.auth.user,
})

const mapDispatchToProps = (dispatch) => ({
    getOneArticle: (payload) => dispatch(getOneArticle(payload)),
    writeComment: (payload) => dispatch(writeComment(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)

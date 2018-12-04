import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { getOneArticle, deleteArticle } from '../../../redux/actions/article'
import { writeComment, deleteComment } from '../../../redux/actions/comment'

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

    deleteComment = (e, id) => {
        e.preventDefault()
        this.props.deleteComment({
            id,
            token: this.props.user.token
        })
    }

    deleteArticle = (e) => {
        e.preventDefault()
        this.props.deleteArticle({
            id: this.props.article._id,
            token: this.props.user.token
        })
        this.props.history.push('/')
    }

    render() {
        const { article, user } = this.props
        return (
            <RegularLayout>
                {
                    (user && article.author && user._id === article.author._id) &&
                    <Fragment>
                        <form>
                            <button onClick={this.deleteArticle} >Supprimer l'article !</button>
                        </form>
                        <Link to={`/edit/${article._id}`}>Editer l'article</Link>
                    </Fragment>
                }

                <h2>{article.title}</h2>

                <p>
                    {article.content}
                </p>

                {
                    article.comments && article.comments.map((comment) => {
                        return (<div key={comment._id}>
                            <p>{comment.text}</p>
                            <span>by {comment.author.username}</span>
                            {
                                (user && (user._id === comment.author._id || user._id === article.author._id)) &&
                                <form>
                                    <button onClick={(e) => this.deleteComment(e, comment._id)} >Supprimer mon commentaire !</button>
                                </form>
                            }
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
    user: state.auth.user || {},
})

const mapDispatchToProps = (dispatch) => ({
    getOneArticle: (payload) => dispatch(getOneArticle(payload)),
    deleteArticle: (payload) => dispatch(deleteArticle(payload)),
    writeComment: (payload) => dispatch(writeComment(payload)),
    deleteComment: (payload) => dispatch(deleteComment(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Article))

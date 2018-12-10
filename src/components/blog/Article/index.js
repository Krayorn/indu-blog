import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { getOneArticle, deleteArticle } from '../../../redux/actions/article'
import { writeComment, deleteComment } from '../../../redux/actions/comment'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

// Components
import Button from '../../commons/Button'
import Form from '../../commons/Form'
import TextArea from '../../commons/TextArea'

import {
    HeaderContainer,
    StyledLink,
    Title,
} from './style'

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
                    <HeaderContainer>
                        <Form>
                            <Button onClick={this.deleteArticle} text='Delete !' />
                        </Form>
                        <StyledLink to={`/edit/${article._id}`}>Editer l'article</StyledLink>
                    </HeaderContainer>
                }

                <h2>{article.title}</h2>

                <p>
                    {article.content}
                </p>

                {
                    article.comments && article.comments.length > 0 &&
                    <Title>
                        Comments Section !
                    </Title>
                }

                {
                    article.comments && article.comments.map((comment) => {
                        return (<div key={comment._id}>
                            <p>{comment.text}</p>
                            <span>by {comment.author.username}</span>
                            {
                                (user && (user._id === comment.author._id || user._id === article.author._id)) &&
                                <Form>
                                    <Button onClick={(e) => this.deleteComment(e, comment._id)} text='Delete my comment !' />
                                </Form>
                            }
                            <hr />
                        </div>)
                    })
                }

                {
                    user && user.token &&
                    <div>
                        Publish one comment !

                        <Form>
                            <TextArea onChange={(e) => this.handleChange('comment', e.target.value)} type='text' placeholder='comment' name='comment' />
                            <Button onClick={this.writeComment} text='Send !' />
                        </Form>
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

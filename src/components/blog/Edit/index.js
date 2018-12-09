import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { editArticle, getOneArticle } from '../../../redux/actions/article'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class Edit extends Component {
    state = {title: '', content: ''}

    constructor(props) {
        super(props)

        this.props.getOneArticle({id: this.props.match.params.id})
    }

    static getDerivedStateFromProps(props, state) {
        if ((state.title === '' || state.content === '') && props.match.params.id === props.article._id) {
            return {
                title: props.article.title,
                content: props.article.content,
            }
        }

        return null
    }

    editArticle = (e) => {
        e.preventDefault()
        this.props.editArticle({...this.state, token: this.props.token, id: this.props.article._id})
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <RegularLayout>
                <form>
                    <input onChange={(e) => this.handleChange('title', e.target.value)} value={this.state.title} type='text' placeholder='title' name='title' />
                    <textarea onChange={(e) => this.handleChange('content', e.target.value)} value={this.state.content} type='text' placeholder='content' name='content' />

                    <button onClick={this.editArticle} >Publier !</button>
                </form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.user.token,
    article: state.article.detail || {},
})

const mapDispatchToProps = (dispatch) => ({
    editArticle: (payload) => dispatch(editArticle(payload)),
    getOneArticle: (payload) => dispatch(getOneArticle(payload)),
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit))

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { writeArticle } from '../../../redux/actions/article'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

// Components
import Button from '../../commons/Button'
import Form from '../../commons/Form'
import TextArea from '../../commons/TextArea'

class Create extends Component {
    state = {}

    writeArticle = (e) => {
        e.preventDefault()
        this.props.writeArticle({...this.state, token: this.props.token})
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {

        if (this.props.detail && this.props.detail.title === this.state.title && this.props.detail.content === this.state.content) {
            this.props.history.push(`/article/${this.props.detail._id}`)
        }

        return (
            <RegularLayout>
                {
                    this.props.errors.length > 0 &&
                    this.props.errors.map(err => (
                        <div key={err.id} >
                            {err.msg}
                        </div>
                    ))
                }
                <Form>
                    <input onChange={(e) => this.handleChange('title', e.target.value)} type='text' placeholder='title' name='title' />
                    <TextArea onChange={(e) => this.handleChange('content', e.target.value)} type='text' placeholder='content' name='content' />

                    <Button onClick={this.writeArticle} text='Publish !' />
                </Form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.user.token,
    detail: state.article.detail || false,
    errors: (state.article.errors || []).filter(err => err.id.startsWith('api.article.create')),
})

const mapDispatchToProps = (dispatch) => ({
    writeArticle: (payload) => dispatch(writeArticle(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))

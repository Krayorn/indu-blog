import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { writeArticle } from '../../../redux/actions/article'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

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
        return (
            <RegularLayout>
                <form>
                    <input onChange={(e) => this.handleChange('title', e.target.value)} type='text' placeholder='title' name='title' />
                    <textarea onChange={(e) => this.handleChange('content', e.target.value)} type='text' placeholder='content' name='content' />

                    <button onClick={this.writeArticle} >Publier !</button>
                </form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.auth.user.token,
})

const mapDispatchToProps = (dispatch) => ({
    writeArticle: (payload) => dispatch(writeArticle(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create))

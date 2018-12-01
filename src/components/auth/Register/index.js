import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { registerUser } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class Register extends Component {
    state = {}

    registerUser = (e) => {
        e.preventDefault()
        this.props.registerUser(this.state)
        this.props.history.push('/login')
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
                    <input onChange={(e) => this.handleChange('username', e.target.value)} type='text' placeholder='username' name='username'></input>
                    <input onChange={(e) => this.handleChange('password', e.target.value)} type='password' placeholder='password' name='password' />
                    <input onChange={(e) => this.handleChange('passwordConfirm', e.target.value)} type='password' placeholder='passwordConfirm' name='passwordConfirm' />

                    <button onClick={this.registerUser} >M'inscrire !</button>
                </form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    registerUser: (payload) => dispatch(registerUser(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))

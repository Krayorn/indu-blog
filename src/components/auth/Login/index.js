import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { loginUser } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class Login extends Component {
    state = {}

    loginUser = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state)
        this.props.history.push('/')
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

                    <button onClick={this.loginUser} >Me connecter !</button>
                </form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    loginUser: (payload) => dispatch(loginUser(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))

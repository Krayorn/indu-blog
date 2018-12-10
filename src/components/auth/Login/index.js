import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { loginUser } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

// Components
import Button from '../../commons/Button'
import Form from '../../commons/Form'

class Login extends Component {
    state = {}

    loginUser = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state)
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {

        if (this.props.user.token) {
            this.props.history.push('/')
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
                    <input onChange={(e) => this.handleChange('username', e.target.value)} type='text' placeholder='username' name='username'></input>
                    <input onChange={(e) => this.handleChange('password', e.target.value)} type='password' placeholder='password' name='password' />

                    <Button onClick={this.loginUser} text='Login !' />
                </Form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user || {},
    errors: state.auth.errors || []
})

const mapDispatchToProps = (dispatch) => ({
    loginUser: (payload) => dispatch(loginUser(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))

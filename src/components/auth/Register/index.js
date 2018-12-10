import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { registerUser } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

// Components
import Button from '../../commons/Button'
import Form from '../../commons/Form'

class Register extends Component {
    state = {success: false}

    static getDerivedStateFromProps(props, state) {
        if (props.user.username === state.username && props.user.token) {
            return {
                success: true,
            }
        }

        return null
    }

    registerUser = (e) => {
        e.preventDefault()
        this.props.registerUser(this.state)
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {

        if (this.state.success) {
            this.props.history.push('/login')
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
                    <input onChange={(e) => this.handleChange('passwordConfirm', e.target.value)} type='password' placeholder='passwordConfirm' name='passwordConfirm' />

                    <Button onClick={this.registerUser} text='Register !' />
                </Form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user || {},
    errors: state.auth.errors || [],
})

const mapDispatchToProps = (dispatch) => ({
    registerUser: (payload) => dispatch(registerUser(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))

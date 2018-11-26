import React, { Component } from 'react'

class Register extends Component {
    state = {}

    registerUser = (e) => {
        e.preventDefault()
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <form>
                    <input onChange={(e) => this.handleChange('username', e.target.value)} type='text' placeholder='username' name='username'></input>
                    <input onChange={(e) => this.handleChange('password', e.target.value)} type='password' placeholder='password' name='password' />
                    <input onChange={(e) => this.handleChange('passwordConfirm', e.target.value)} type='password' placeholder='passwordConfirm' name='passwordConfirm' />

                    <button onClick={this.registerUser} >M'inscrire !</button>
                </form>
            </div>
        )
    }
}

export default Register

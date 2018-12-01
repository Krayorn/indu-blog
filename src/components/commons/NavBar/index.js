import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

// Redux
import { logoutUser } from '../../../redux/actions/auth'
import { connect } from 'react-redux'

import {
    Container,
    UserSection,
    Item,
    FakeItem,
} from './style'

class NavBar extends Component {

    logout = () => {
        this.props.logoutUser()
        this.props.history.push('/login')
    }

    render() {
        const { user } = this.props

        return (
            <Container>
                <Item to={'/'}>Home</Item>
                <UserSection>
                    {
                        user
                        ? <Fragment>
                            <Item to={'/profile'}>{user.username}</Item>
                            <FakeItem onClick={this.logout} >Logout</FakeItem>
                        </Fragment>
                        : <Fragment>
                            <Item to={'/login'}>Login</Item>
                            <Item to={'/register'}>Register</Item>
                        </Fragment>
                    }
                </UserSection>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: (payload) => dispatch(logoutUser(payload)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))

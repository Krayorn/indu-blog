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
                            {
                                user.role === 'ADMIN' &&
                                <Fragment>
                                    <Item to={'/admin/articles'}>Admin Articles</Item>
                                    <Item to={'/admin/users'}>Admin Users</Item>
                                </Fragment>
                            }
                            <Item to={'/profile'}>{user.username}</Item>
                            {
                                user.role !== 'DEFAULT' &&
                                <Item to={'/create'}>New article</Item>
                            }
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
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))

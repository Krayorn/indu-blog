import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import { deleteUser } from '../../../redux/actions/auth'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

// Components
import Button from '../../commons/Button'

class Profile extends Component {
    deleteUser = (e, id) => {
        e.preventDefault()
        this.props.deleteUser({
            id,
            token: this.props.user.token
        })
    }

    render() {
        const { user } = this.props

        return (
            <RegularLayout>
                <p>{user.username}</p>
                <p>{user.role}</p>
                <form>
                    <Button onClick={(e) => this.deleteUser(e, user._id)} text='Delete my account !' />
                </form>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user || {},
})

const mapDispatchToProps = (dispatch) => ({
    deleteUser: (payload) => dispatch(deleteUser(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

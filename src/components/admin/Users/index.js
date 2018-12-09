import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'
import { getAllUsers, deleteUser, updateRole } from '../../../redux/actions/auth'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class AdminUsers extends Component {
    constructor(props) {
        super(props)

        this.props.getAllUsers({token: this.props.user.token})
    }

    deleteUser = (e, id) => {
        e.preventDefault()
        this.props.deleteUser({
            id,
            token: this.props.user.token
        })
    }

    updateRole = (e, id) => {
        e.preventDefault()
        this.props.updateRole({
            id,
            token: this.props.user.token,
            role: this.state[id]
        })
    }

    render() {
        const { users } = this.props

        return (
            <RegularLayout>
                <h2>Welcome on this Blog !</h2>

                {
                    users.map((user) => {
                        return (
                            <div key={user._id} >
                                <span>{user.username}</span>
                                <span>{user.role}</span>
                                <form>
                                    <button onClick={(e) => this.deleteUser(e, user._id)} >Delete User !</button>
                                </form>
                                <form>
                                    <select defaultValue={user.role} onChange={(e) => this.setState({[user._id]: e.target.value})} name='role' >
                                        <option value="DEFAULT" >DEFAULT</option>
                                        <option value="BLOGGER" >BLOGGER</option>
                                        <option value="ADMIN" >ADMIN</option>
                                    </select>
                                    <button onClick={(e) => this.updateRole(e, user._id)} >Update user role !</button>
                                </form>
                            </div>
                        )
                    })
                }

            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.auth.list || [],
    user: state.auth.user || {},
})

const mapDispatchToProps = (dispatch) => ({
    getAllUsers: (payload) => dispatch(getAllUsers(payload)),
    deleteUser: (payload) => dispatch(deleteUser(payload)),
    updateRole: (payload) => dispatch(updateRole(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers)

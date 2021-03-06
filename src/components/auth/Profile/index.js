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
                <h1>GAMER INFO</h1>
                <p>LEVEL: {user.gamer.level}</p>
                <p>XP: {user.gamer.experience}</p>
                <form>
                    <Button onClick={(e) => this.deleteUser(e, user._id)} text='Delete my account !' />
                </form>
                {
                    user.gamer.achievements &&
                    <div>
                        {user.gamer.achievements.map(ach => {
                            return <div key={ach.detail._id} >
                                    {ach.detail.title} - {ach.detail.condition}
                                    {
                                        ach.detail.goal &&
                                        <div>{ach.progression}/{ach.detail.goal}</div>
                                    }
                                </div>
                        })}
                    </div>
                }

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

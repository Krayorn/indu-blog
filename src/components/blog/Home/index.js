import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'

// Layout
import RegularLayout from '../../../layouts/RegularLayout'

class Home extends Component {
    state = {}

    render() {
        return (
            <RegularLayout>
                <h2>This is my HomePage</h2>
            </RegularLayout>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

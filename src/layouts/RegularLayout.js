import React, { Component } from 'react'

// Redux
import { connect } from 'react-redux'

// Components
import NavBar from '../components/commons/NavBar'

// Style
import {
    Container,
} from './style'

class RegularLayout extends Component {
    render() {
        return (
            <Container>
                <NavBar user={this.props.user} />
                {this.props.children}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user || false
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RegularLayout)

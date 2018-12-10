import React from 'react'

import {
    Container,
} from './style'

const Form = (props) => {
    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default Form

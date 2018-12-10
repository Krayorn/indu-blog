import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
`

export const StyledLink = styled(Link)`
    background-color: #9999ff;
    padding: 10px 15px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    height: 15px;
`

export const Title = styled.h2`
    text-align: center;
`

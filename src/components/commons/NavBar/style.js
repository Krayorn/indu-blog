import styled from 'styled-components'

import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #282626;
`

export const UserSection = styled.div`
    display: flex;
`

export const Item = styled(Link)`
    margin: 10px;
    color: white;
    text-decoration: none;
`

export const FakeItem = styled.div`
    margin: 10px;
    color: white;
    cursor: pointer;
`

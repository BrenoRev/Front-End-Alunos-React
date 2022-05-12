import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';

import { Title } from './styled'
import { Container } from '../../styles/GlobalStyles'
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  
    return (
        <Container>
            <h1> Login </h1>
        </Container>
    )
}
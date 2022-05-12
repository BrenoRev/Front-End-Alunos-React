import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';

import { Title } from './styled'
import { Container } from '../../styles/GlobalStyles'
import * as exampleActions from '../../store/modules/example/actions';

export default function Photos() {
  
    return (
        <Container>
            <h1> Photos </h1>
        </Container>
    )
}
import React from 'react';
import { Title } from './styled'
import { Container } from '../../styles/GlobalStyles'
import axios from '../../services/axios';

export default function Login() {
   React.useEffect(() => {
    axios.get('/alunos').then(response => {
        console.log(response.data);
    });
   }, []);

    return (
        <Container>
            <Title>Login
                <p>Breno</p>
                <p>lorem</p>
                <button>Enviar</button>
            </Title>
        </Container>
    )
}
import React from 'react';
import { useDispatch } from 'react-redux';

import { Title } from './styled'
import { Container } from '../../styles/GlobalStyles'
import axios from '../../services/axios';

export default function Login() {

    const dispatch = useDispatch();

    function handleClick(e)  {
        e.preventDefault();
        dispatch(
            { 
                type: 'ADD_TODO',
                payload: 'teste' 
            }
            );
   }


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
                <button onClick={handleClick} >Enviar</button>
            </Title>
        </Container>
    )
}
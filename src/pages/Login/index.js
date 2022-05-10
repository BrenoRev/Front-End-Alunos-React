import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';

import { Title } from './styled'
import { Container } from '../../styles/GlobalStyles'
import * as exampleActions from '../../store/modules/example/actions';
export default function Login() {

    const dispatch = useDispatch();

    function handleClick(e)  {
        e.preventDefault();
        dispatch(exampleActions.clicaBotao());
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
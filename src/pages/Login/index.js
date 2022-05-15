import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';

import { Form } from './styled'
import { Container } from '../../styles/GlobalStyles'
import * as actions from '../../store/modules/auth/actions';
import { toast } from 'react-toastify';
import { get } from 'lodash';

export default function Login() {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        let formErrors = false;

        if(password.length < 6 || password.length > 50) {
            formErrors = true;
            toast.error('A senha deve ter entre 6 e 50 caracteres');
        }
        if(email.length < 6 || email.length > 255) {
            formErrors = true;
            toast.error('O e-mail deve ter entre 6 e 255 caracteres');
        }

        if(formErrors)
            return;

        try{
            dispatch(actions.loginRequest( {email, password } ));
        } catch(error){
            const errors = get(error, 'response.data.errors', []);
            errors.map(error => toast.error(error));
        }
    }


    return (
        <Container>
            <h1> Login </h1>
            
             <Form onSubmit={handleSubmit}>
                
                <label htmlFor="email">Email:
                    <input 
                        type="email" 
                        placeholder="Seu e-mail:" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="password">Senha:
                    <input 
                        type="password" 
                        placeholder="Sua senha:" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}/>
                </label>

                <button type="submit">Acessar</button>
            </Form>
        </Container>
    )
}
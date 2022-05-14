import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';

import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Form } from './styled'
import { Container } from '../../styles/GlobalStyles'
import history from '../../services/history';


export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        let formErrors = false;

        if(name.length < 3 || name.length > 255) {
            formErrors = true;
            toast.error('O nome deve ter entre 3 e 255 caracteres');
        }
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
        
        axios.post('/users/', {
            nome: name,
            email: email,
            password: password
        }).then(() => {
            toast.success('Aluno cadastrado com sucesso');
            history.push('/');

        }).catch(error => {
            const errors = get(error, 'response.data.errors', []);
            errors.map(error => toast.error(error));
        }
        )

    }

    return (
        <Container>
            <h1> Crie sua conta </h1>

            <Form onSubmit={handleSubmit}>
                <label htmlFor="name">Nome:
                    <input 
                        type="text" 
                        placeholder="Nome:" 
                        value={name} 
                        onChange={e => setName(e.target.value)}/>
                </label>
                
                <label htmlFor="email">E-mail:
                    <input 
                        type="email" 
                        placeholder="E-mail:" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="password">Senha:
                    <input 
                        type="password" 
                        placeholder="Senha:" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}/>
                </label>

                <button type="submit">Criar conta</button>
            </Form>
        </Container>
    )
}
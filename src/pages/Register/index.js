import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { get } from 'lodash';
import { Form } from './styled'
import { Container } from '../../styles/GlobalStyles'
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {

    const dispatch = useDispatch();

    const id = useSelector(state => state.auth.user.id);
    const nomeStored = useSelector(state => state.auth.user.nome);
    const emailStored = useSelector(state => state.auth.user.email);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    React.useEffect( () => {
        if(!id) return;
        setName(nomeStored);
        setEmail(emailStored);
    }, [emailStored, nomeStored, id]);

    function handleSubmit(e) {
        e.preventDefault();

        let formErrors = false;

        if(!id && (name.length < 3 || name.length > 255)) {
            formErrors = true;
            toast.error('O nome deve ter entre 3 e 255 caracteres');
        }
        if(!id && (password.length < 6 || password.length > 50)) {
            formErrors = true;
            toast.error('A senha deve ter entre 6 e 50 caracteres');
        }
        if(!id && (email.length < 6 || email.length > 255)) {
            formErrors = true;
            toast.error('O e-mail deve ter entre 6 e 255 caracteres');
        }

        if(formErrors)
            return;
        
        dispatch(actions.registerRequest({ id, name, email, password }));

    }

    return (
        <Container>
            <h1> {id ? 'Editar dados' : 'Crie sua conta'} </h1>

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

                <button type="submit">{ id ? 'Salvar' : 'Criar conta' }</button>
            </Form>
        </Container>
    )
}
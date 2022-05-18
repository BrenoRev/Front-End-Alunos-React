import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { get } from 'lodash'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaUserCircle, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import { ProfilePicture, Form } from './styled'
import { Container, Title } from '../../styles/GlobalStyles'

export default function Aluno() {

    const id = window.location.pathname.split('/')[2] || '';

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [foto, setFoto] = useState('');

    React.useEffect( () => {
        if(id) {
            async function getData(){
                try{
                    const { data } = await axios.get(`/alunos/${id}`)
                    const Foto = get(data, 'Fotos[0].url', '');
                    setFoto(Foto);

                    setNome(data.nome);
                    setSobrenome(data.sobrenome);
                    setEmail(data.email);
                    setIdade(data.idade);
                    setPeso(data.peso);
                    setAltura(data.altura);
                } catch(err) {
                    toast.error('Erro ao carregar aluno')
                }
            }

            getData();
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        let formIsInvalid = false;

        if(nome.length < 3 || nome.length > 255) {
            formIsInvalid = true;
            toast.error('Nome deve ter entre 3 e 255 caracteres!');
        }

        if(sobrenome.length < 3 || sobrenome.length > 255) {
            formIsInvalid = true;
            toast.error('Sobrenome deve ter entre 3 e 255 caracteres!');
        }

        if(
        email.length < 3 ||
        email.length > 255 ||
        (!email.includes('@') && !email.includes('.'))
        ) {
            formIsInvalid = true;
            toast.error('Email inválido!');
        }

        if(idade.length < 1 || idade.length > 3 || isNaN(idade)) {
            formIsInvalid = true;
            toast.error('Idade inválida!');
        }

        if(formIsInvalid)
            return;

        const aluno = {
            nome,
            sobrenome,
            email,
            idade,
            peso,
            altura
        };

        if(id) {
            axios.put(`/alunos/${id}`, aluno)
            .then(response => {
                toast.success('Aluno atualizado com sucesso!');
                return;
            }
            ).catch(error => {
                const status = get(error, 'response.status', 0);
                if(status === 401) {
                    toast.warning('Você precisa fazer login!');
                    return;
                }else{
                    const errors = get(error, 'response.data.errors', []);
                    errors.map(error => toast.error(error));
                    return;
                }
            });
        }

        if(!id) {
            axios.post('/alunos', aluno)
            .then(response => {
                toast.success('Aluno cadastrado com sucesso!');
                history.push(`/aluno/${data.id}/edit`);
                return;
            }
            ).catch(error => {
                const status = get(error, 'response.status', 0);
                if(status === 401) {
                    toast.warning('Você precisa fazer login!');
                    return;
                }else{
                    const errors = get(error, 'response.data.errors', []);
                    errors.map(error => toast.error(error));

                    return;
                }
            });
        }
    }

    return (
        <Container>
            <Title>{id? 'Editar Aluno': 'Novo Aluno'}</Title>

            {id && (
            <ProfilePicture>
                {
                foto ? 
                    (
                        <img src={foto} alt={nome} />
                    ) 
                        : 
                    (
                    <FaUserCircle size={180}/>
                    )
                }
                <Link to={`/fotos/${id}`}>
                    <FaEdit size={24}/>
                </Link>
            </ProfilePicture>
            )}

            <Form onSubmit={handleSubmit}>
                <input type="text" 
                value={nome} 
                onChange={e => setNome(e.target.value)}
                placeholder="Nome"/>

                <input type="text" 
                value={sobrenome} 
                onChange={e => setSobrenome(e.target.value)}
                placeholder="Sobrenome"/>

                <input type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                placeholder="E-mail"/>

                <input type="number" 
                value={idade} 
                onChange={e => setIdade(e.target.value)}
                placeholder="Idade"/>

                <input type="text" 
                value={peso} 
                onChange={e => setPeso(e.target.value)}
                placeholder="Peso"/>

                <input type="text" 
                value={altura} 
                onChange={e => setAltura(e.target.value)}
                placeholder="Altura"/>

            <button type="submit"> Enviar </button>
            </Form>
        </Container>
    )
}

Aluno.propTypes = {
    id: PropTypes.number
};
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { get } from 'lodash';
import { FaUserCircle, FaExclamation, FaEdit, FaWindowClose } from 'react-icons/fa';
import { AlunoContainer, ProfilePicture } from './styled';
import { Container } from '../../styles/GlobalStyles';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Alunos() {

    const [ alunos, setAlunos ] = useState([ ]);

    const handleDeleteAsk = (event) => {
        event.preventDefault();
        const exclamation = event.currentTarget.nextSibling;
        event.currentTarget.remove();
        exclamation.setAttribute('style', 'display: block');

    }

    const handleDelete = async  (event, alunoId, index) => {
        event.persist();
        try {
            await axios.delete(`/alunos/${alunoId}`);
            
            const alunosAtualizados = [...alunos];
            alunosAtualizados.splice(index, 1);
            setAlunos(alunosAtualizados);
            toast.success('Aluno deletado com sucesso!');

        } catch ( error ) {
            const status = get(error, 'response.status', 0);
            if(status === 401) {
                toast.warning('Você precisa fazer login!');
                return;
            }else{
                const errors = get(error, 'response.data.errors', []);
                errors.map(error => toast.error(error));
            }
        }
    }

    React.useEffect(() => {
        async function loadAlunos() {
            const response = await axios.get('/alunos');
            setAlunos(response.data);
        }

        loadAlunos();
    }, []);

    return (
        <Container>
            <h1> Alunos </h1>
            <AlunoContainer>
                {alunos.map((aluno,index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, 'Fotos[0].url', false) ? (
                                <img src={aluno.Fotos[0].url} alt={aluno.nome} />
                            ):
                            (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>
                                <Link to={`/aluno/${aluno.id}/edit`}>
                                    <FaEdit size={16} />
                                </Link>

                                <Link onClick={handleDeleteAsk} to={`/aluno/${aluno.id}/delete`}>
                                    <FaWindowClose size={16} />
                                </Link>

                                <FaExclamation
                                size={16} 
                                display="none" 
                                cursor="pointer" 
                                onClick={(event) => handleDelete(event, aluno.id, index)}
                                />
                    </div>  
                ))}
            </AlunoContainer>
        </Container>
    )
}
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { AlunoContainer, ProfilePicture } from './styled';
import { Container } from '../../styles/GlobalStyles';
import * as exampleActions from '../../store/modules/example/actions';
import { Link } from 'react-router-dom';

export default function Alunos() {

    const [ alunos, setAlunos ] = useState([ ]);

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
                {alunos.map(aluno => (
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

                                <Link to={`/aluno/${aluno.id}/delete`}>
                                    <FaWindowClose size={16} />
                                </Link>
                    </div>  
                ))}
            </AlunoContainer>
        </Container>
    )
}
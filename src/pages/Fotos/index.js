import React from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../services/axios';
import { Form } from './styled';
import { Container, Title } from '../../styles/GlobalStyles'
import history from '../../services/history';
import { get } from 'lodash'; 
import { toast } from 'react-toastify';

export default function Photos() {

    const id = window.location.pathname.split('/')[2];
    const [foto, setFoto] = React.useState('');

    const handleChange = async (event) => {
        const foto = event.target.files[0];
        const fotoUrl = URL.createObjectURL(foto);
        setFoto(fotoUrl);

        const formData = new FormData();
        formData.append('foto', foto);
        formData.append('aluno_id', id);
        
        try{
            await axios.post('/fotos', formData);
            toast.success('Foto enviada com sucesso!');
        } catch (err) {
            toast.error('Erro ao enviar foto');
        }
    }

    React.useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axios.get(`/alunos/${id}`);
                const Foto = get(data, 'Fotos[0].url', '');
                setFoto(Foto);
            } catch(err) {
                toast.error('Erro ao carregar foto');
                history.push('/')
            }
        }

        getData();

    }, []);
    return (
        <Container>
            <Title> Photos </Title>

            <Form>
                <label htmlFor="foto">
                    {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
                    <input type="file" id="foto" onChange={handleChange}/>
                </label>

            </Form>
        </Container>
    )
}
import { call, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify';
import * as actions from './actions'
import * as types from '../types';
import { get } from 'lodash';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({payload}){
    try {
        const response = yield call(axios.post, '/tokens/', payload);
        yield put(actions.loginSuccess({...response.data}))

        toast.success('Login realizado com sucesso!');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        history.push('/');

    } catch(e) {
        toast.error('Usuário ou senha inválidos.')
        yield put(actions.loginFailure());
    }
}

function persistRehydrate({payload}){
    const token = get(payload, 'auth.token');
    if(!token){
        return;
    }

    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }){
        const {id, name, email, password} = payload;
        
        try{
            console.log(id);
            if(id){
               yield call(axios.put, `/users/`, 
               {
                   nome: name, 
                   email, 
                   password: password ? password : undefined
                });
                toast.success('Conta atualizada com sucesso, você precisara realizar o login novamente');
                yield put(actions.registerSuccess({name, email, password}))
                yield put(actions.loginFailure());
                return history.push('/login')

            }
            else{
               yield call(axios.post, '/users/',
                {
                    nome: name, 
                    email,
                    password
                });
               
               toast.success('Conta criada com sucesso!');
               yield put(actions.registerSuccess({name, email, password}))
               history.push('/login');
            }

            

        } catch(e) {
            const errors = get(e, 'response.data.errors', []);
            if(errors.length > 0){
                errors.map(error => toast.error(error.message));
            } else {
                toast.error('Erro desconhecido.')
            }

            yield put(actions.registerFailure());
    }
}


export default all
    ([
        takeLatest(types.LOGIN_REQUEST, loginRequest),
        takeLatest(types.REGISTER_REQUEST, registerRequest),
        takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
    ]);
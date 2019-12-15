import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container } from './styles';

import { singInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('E-mail inválido')
        .required('o e-mail é obrigatório'),
    password: Yup.string()
        .min(6, 'A senha deve term entre 6 e 14 caracters')
        .max(14, 'A senha deve term entre 6 e 14 caracters')
        .required('A senha é obrigatória')
});

export default function SingIn() {
    const dispatch = useDispatch();

    function handleSubmit({ email, password }) {
        dispatch(singInRequest(email, password));
    }

    return (
        <Container>
            <Form schema={schema} onSubmit={handleSubmit}>
                <img src={logo} alt="Gympoint" />
                <label htmlFor="email">SEU E-MAIL</label>
                <Input
                    name="email"
                    type="email"
                    placeholder="Seu e-mail"
                />
                <label htmlFor="password">SUA SENHA</label>
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua senha"
                />
                <button type="submit">Entrar no sistema</button>
            </Form>
        </Container>
    );
}

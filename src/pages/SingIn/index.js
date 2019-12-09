import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';

import logo from '~/assets/logo.svg';

export default function SingIn() {
    return (
        <Container>
            <Form>
                <img src={logo} alt="Gympoint" />
                <label>SEU E-MAIL</label>
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <label>SUA SENHA</label>
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua senha"
                />
                <button>Entrar no sistema</button>
            </Form>
        </Container>
    );
}

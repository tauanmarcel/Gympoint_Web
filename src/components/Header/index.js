import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { singOut } from '~/store/modules/auth/actions';

import logofdp from '~/assets/logo-slim.png';
import { Container } from './styles';

export default function Header() {
    const profile = useSelector(state => state.user.profile);

    const dispatch = useDispatch();

    function handleSingOut() {
        dispatch(singOut());
    }

    return (
        <Container>
            <header>
                <img src={logofdp} alt="Gympoint" />
                <ul>
                    <li>
                        <a href="student">ALUNOS</a>
                    </li>
                    <li>
                        <a href="plans">PLANOS</a>
                    </li>
                    <li>
                        <a href="registrations">MATRÍCULAS</a>
                    </li>
                    <li>
                        <a href="help-orders">PEDIDOS DE AUXÍLIO</a>
                    </li>
                </ul>

                <div>
                    <p>{profile.name}</p>
                    <button type="button" onClick={handleSingOut}>
                        sair do sistema
                    </button>
                </div>
            </header>
        </Container>
    );
}

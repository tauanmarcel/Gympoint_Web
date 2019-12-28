import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { singOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-slim.png';
import { Container, Nav } from './styles';
import './styles.css';

export default function Header({ match }) {
    const profile = useSelector(state => state.user.profile);

    const dispatch = useDispatch();

    function handleSingOut() {
        dispatch(singOut());
    }

    return (
        <Container>
            <header>
                <a href="/students">
                    <img src={logo} alt="Gympoint" />
                </a>
                <ul>
                    <li>
                        <Nav to="/students" activeClassName="main-nav-active">
                            ALUNOS
                        </Nav>
                    </li>
                    <li>
                        <Nav to="/plans" activeClassName="main-nav-active">
                            PLANOS
                        </Nav>
                    </li>
                    <li>
                        <Nav
                            to="/registrations"
                            activeClassName="main-nav-active"
                        >
                            MATRÍCULAS
                        </Nav>
                    </li>
                    <li>
                        <Nav
                            to="/help-orders"
                            activeClassName="main-nav-active"
                        >
                            PEDIDOS DE AUXÍLIO
                        </Nav>
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

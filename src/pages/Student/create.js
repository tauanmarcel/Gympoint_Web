import React, { useState } from 'react';
import * as Yup from 'yup';
import { FaChevronLeft, FaSave } from 'react-icons/fa';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import {
    Center,
    ContentMain,
    ContentTop,
    ContentForm,
    UnformInput,
    UnformLable
} from '~/styles/main';

import { Col1, Col3 } from '~/styles/grid';
import { BtnRed, BtnGrey } from '~/styles/button';

import api from '~/services/api';

const schema = Yup.object().shape({
    name: Yup.string().required('o nome é obrigatório'),
    email: Yup.string()
        .email('E-mail inválido')
        .required('o e-mail é obrigatório'),
    birth: Yup.date('data inválida').required(
        'a data de nascimento é obrigatória'
    ),
    weight: Yup.number('valor inválido').required('o peso é obrigatório'),
    height: Yup.number('valor inválido').required('a altura é obrigatória')
});

export default function Student() {
    const [loading, setLoading] = useState(false);

    function reload(time = 3000) {
        setTimeout(() => window.location.reload(true), time);
    }

    async function handleSubmit({ name, email, birth, weight, height }) {
        setLoading(true);

        try {
            await api.post('students', {
                name,
                email,
                birth,
                weight,
                height
            });

            toast.success('Novo aluno cadastrado com sucesso!');
            reload();
        } catch (err) {
            toast.error('Erro ao salvar novo aluno!');
            reload();
        }
    }

    return (
        <div>
            <Header />
            <Center>
                <Form schema={schema} onSubmit={handleSubmit}>
                    <ContentTop>
                        <h1>Cadastro de alunos</h1>

                        <aside>
                            <BtnRed type="submit">
                                <FaSave />
                                {loading ? 'SALVANDO...' : 'SALVAR'}
                            </BtnRed>

                            <a href="students">
                                <BtnGrey type="button">
                                    <FaChevronLeft />
                                    VOLTAR
                                </BtnGrey>
                            </a>
                        </aside>
                    </ContentTop>

                    <ContentMain>
                        <ContentForm>
                            <Col1>
                                <UnformLable for="name">
                                    NOME COMPLETO
                                </UnformLable>
                                <UnformInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="João das Botas"
                                />
                                <UnformLable for="email">
                                    ENDEREÇO DE E-MAIL
                                </UnformLable>
                                <UnformInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="exemple@email.com"
                                />
                            </Col1>
                            <Col3>
                                <UnformLable for="birth">
                                    DATA DE NASCIMENTO
                                </UnformLable>
                                <UnformInput
                                    type="date"
                                    name="birth"
                                    id="birth"
                                />
                            </Col3>
                            <Col3>
                                <UnformLable for="weight">
                                    PESO (em kg)
                                </UnformLable>
                                <UnformInput name="weight" id="weight" />
                            </Col3>
                            <Col3>
                                <UnformLable for="height">
                                    ALTURA (em m)
                                </UnformLable>
                                <UnformInput name="height" id="height" />
                            </Col3>
                        </ContentForm>
                    </ContentMain>
                </Form>
            </Center>
        </div>
    );
}

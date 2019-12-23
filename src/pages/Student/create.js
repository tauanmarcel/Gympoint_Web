import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FaChevronLeft, FaSave } from 'react-icons/fa';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';

import Header from '~/components/Header';
import {
    Center,
    ContentMain,
    ContentTop,
    ContentForm,
    UnformInput,
    UnformLable,
    FormTop,
    FormBottom
} from '~/styles/main';

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

export default function CreateStudent({ match }) {
    const [loading, setLoading] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentEmail, setStudentEmail] = useState('');
    const [studentBirth, setStudentBirth] = useState('');
    const [studentWeight, setStudentWeight] = useState('');
    const [studentHeight, setStudentHeight] = useState('');

    async function loadStudent(id) {
        const response = await api.get(`students/${id}`);

        if (response.data) {
            setStudentId(response.data.id);
            setStudentName(response.data.name);
            setStudentEmail(response.data.email);
            setStudentBirth(
                format(parseISO(response.data.birth), 'yyyy-MM-dd')
            );

            setStudentWeight(response.data.weight);
            setStudentHeight(response.data.height);
        }
    }

    useEffect(() => {
        loadStudent(match.params.id);
    }, []);

    function reload(time = 3000) {
        setTimeout(() => window.location.reload(true), time);
    }

    async function handleSubmit({
        id = studentId,
        name,
        email,
        birth,
        weight,
        height
    }) {
        setLoading(true);

        try {
            if (!id) {
                await api.post('students', {
                    name,
                    email,
                    birth,
                    weight,
                    height
                });

                toast.success('Novo aluno cadastrado com sucesso!');
            } else {
                await api.put(`students/${id}`, {
                    name,
                    email,
                    birth,
                    weight,
                    height
                });

                toast.success('Aluno atualizado com sucesso!');
            }
            reload();
        } catch (err) {
            toast.error('Erro ao salvar os dados do aluno!');
            reload();
        }
    }

    return (
        <div>
            <Header />

            <Center>
                <Form schema={schema} onSubmit={handleSubmit}>
                    <ContentTop>
                        <h1>
                            {studentId
                                ? 'Edição de aluno'
                                : 'Cadastro de aluno'}
                        </h1>

                        <aside>
                            <a href="/students">
                                <BtnGrey type="button">
                                    <FaChevronLeft />
                                    VOLTAR
                                </BtnGrey>
                            </a>
                            <BtnRed type="submit">
                                <FaSave />
                                {loading ? 'SALVANDO...' : 'SALVAR'}
                            </BtnRed>
                        </aside>
                    </ContentTop>

                    <ContentMain>
                        <ContentForm>
                            <FormTop>
                                <UnformLable for="name">
                                    NOME COMPLETO
                                </UnformLable>
                                <UnformInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="João das Botas"
                                    value={studentName || null}
                                    onChange={e =>
                                        setStudentName(e.target.value)
                                    }
                                />
                                <UnformLable for="email">
                                    ENDEREÇO DE E-MAIL
                                </UnformLable>
                                <UnformInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="exemple@email.com"
                                    value={studentEmail || null}
                                    onChange={e =>
                                        setStudentEmail(e.target.value)
                                    }
                                />
                            </FormTop>
                            <FormBottom>
                                <p>
                                    <UnformLable for="birth">
                                        DATA DE NASCIMENTO
                                    </UnformLable>
                                    <UnformInput
                                        type="date"
                                        name="birth"
                                        id="birth"
                                        value={studentBirth || null}
                                        onChange={e =>
                                            setStudentBirth(e.target.value)
                                        }
                                    />
                                </p>
                                <p>
                                    <UnformLable for="weight">
                                        PESO (em kg)
                                    </UnformLable>
                                    <UnformInput
                                        name="weight"
                                        id="weight"
                                        value={studentWeight || null}
                                        onChange={e =>
                                            setStudentWeight(e.target.value)
                                        }
                                    />
                                </p>
                                <p>
                                    <UnformLable for="height">
                                        ALTURA (em m)
                                    </UnformLable>
                                    <UnformInput
                                        name="height"
                                        id="height"
                                        value={studentHeight || null}
                                        onChange={e =>
                                            setStudentHeight(e.target.value)
                                        }
                                    />
                                </p>
                            </FormBottom>
                        </ContentForm>
                    </ContentMain>
                </Form>
            </Center>
        </div>
    );
}

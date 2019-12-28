import React, { useEffect, useState } from 'react';
import { FaPlus, FaCheckCircle, FaRegCheckCircle } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import { Center, ContentMain, ContentTop, Edit, Del } from '~/styles/main';
import { BtnRed } from '~/styles/button';

import api from '~/services/api';

export default function Student() {
    const [registrations, setRegistrations] = useState([]);

    async function handleLoadRegistrations() {
        const response = await api.get('registrations');

        const regs = response.data.map(reg => ({
            ...reg,
            startDateParsed: format(
                parseISO(reg.start_date),
                "dd 'de' MMMM 'de' yyyy",
                {
                    locale: pt
                }
            ),
            endDateParsed: format(
                parseISO(reg.end_date),
                "dd 'de' MMMM 'de' yyyy",
                {
                    locale: pt
                }
            )
        }));

        setRegistrations([...regs]);
    }

    async function handleDelete(id) {
        const confirmation = window.confirm(
            'Deseja realmente excluir essa matrícula?'
        );

        if (confirmation) {
            try {
                await api.delete(`registrations/${id}`);

                toast.success('Matrícula excluída com sucesso!');
                handleLoadRegistrations();
            } catch (err) {
                toast.error(
                    'Não foi possível excluir a matrícula. Tente novamente.'
                );
            }
        }
    }

    useEffect(() => {
        handleLoadRegistrations();
    }, []);

    return (
        <div>
            <Header />
            <Center>
                <ContentTop>
                    <h1>Gerenciando matrículas</h1>

                    <aside>
                        <a href="registrations-create">
                            <BtnRed type="button">
                                <FaPlus />
                                CADASTRAR
                            </BtnRed>
                        </a>
                    </aside>
                </ContentTop>

                <ContentMain>
                    <table>
                        <thead>
                            <tr>
                                <th>ALUNO</th>
                                <th>PLANO</th>
                                <th>INÍCIO</th>
                                <th>TERMINO</th>
                                <th>ATIVA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registrations.map(registration => (
                                <tr>
                                    <td>{registration.student.name}</td>
                                    <td>{registration.plan.title}</td>
                                    <td>{registration.startDateParsed}</td>
                                    <td>{registration.endDateParsed}</td>
                                    <td>
                                        {registration.active ? (
                                            <FaCheckCircle color="#36bf55" />
                                        ) : (
                                            <FaRegCheckCircle color="#ddd" />
                                        )}
                                    </td>
                                    <td>
                                        <Edit
                                            to={`registrations-update/${registration.id}`}
                                        >
                                            editar
                                        </Edit>
                                        <Del
                                            onClick={() =>
                                                handleDelete(registration.id)
                                            }
                                        >
                                            apagar
                                        </Del>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ContentMain>
            </Center>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { parseISO, getYear, getMonth, getDate } from 'date-fns';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import { Center, ContentMain, ContentTop, Edit, Del } from '~/styles/main';
import { BtnRed } from '~/styles/button';

import api from '~/services/api';

export default function Student() {
    const [students, setStudents] = useState([]);

    function calculateAge(date) {
        const year = getYear(parseISO(date));
        const month = getMonth(parseISO(date)) + 1;
        const day = getDate(parseISO(date)) + 1;

        const today = new Date();

        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();

        let age = currentYear - year;

        if (currentMonth < month) {
            age -= 1;
        } else if (currentMonth === month && currentDay <= day) {
            age -= 1;
        }

        return age;
    }

    async function handleLoadStudents(name = '') {
        const response = await api.get(`students?name=${name}`);

        const studentParsed = response.data.map(student => ({
            ...student,
            age: calculateAge(student.birth)
        }));

        setStudents([...studentParsed]);
    }

    async function handleDelete(id) {
        const confirmation = window.confirm(
            'Deseja realmente excluir esse aluno?'
        );

        if (confirmation) {
            try {
                await api.delete(`students/${id}`);

                toast.success('Aluno excluído com sucesso!');
                handleLoadStudents();
            } catch (err) {
                toast.error(
                    'Não foi possível excluir o aluno. Tente novamente.'
                );
                handleLoadStudents();
            }
        }
    }

    useEffect(() => {
        handleLoadStudents();
    }, [students]);

    return (
        <div>
            <Header />
            <Center>
                <ContentTop>
                    <h1>Gerenciando alunos</h1>

                    <aside>
                        <a href="students-create">
                            <BtnRed type="button">
                                <FaPlus />
                                CADASTRAR
                            </BtnRed>
                        </a>
                        <Form>
                            <FaSearch />
                            <Input
                                name="name"
                                placeholder="Buscar aluno"
                                onChange={e =>
                                    handleLoadStudents(e.target.value)
                                }
                            />
                        </Form>
                    </aside>
                </ContentTop>

                <ContentMain>
                    <table>
                        <thead>
                            <tr>
                                <th>NOME</th>
                                <th>E-MAIL</th>
                                <th>IDADE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <Edit
                                            to={`students-update/${student.id}`}
                                        >
                                            editar
                                        </Edit>
                                        <Del
                                            onClick={() =>
                                                handleDelete(student.id)
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

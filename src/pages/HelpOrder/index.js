import React, { useEffect, useState } from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import Header from '~/components/Header';
import {
    Center,
    ContentMain,
    ContentTop,
    Edit,
    PopUp,
    UnformLable
} from '~/styles/main';

import api from '~/services/api';

export default function HelpOrder() {
    const [orders, setOrders] = useState([]);
    const [question, setQuestion] = useState([]);

    async function loadOrders() {
        const response = await api.get('help-orders');

        setOrders(response.data);
    }

    function handleLoadQuestion(e, id) {
        const quest = orders.find(order => order.id === Number(id));
        setQuestion(quest);

        document.getElementById('popup').style.display = 'block';
    }

    function handleClose() {
        document.getElementById('popup').style.display = 'none';
    }

    async function handleSubmit({ id, student_id, answer }) {
        try {
            await api.post(`help-orders/${student_id}/answer/${id}`, {
                answer
            });
            toast.success('Pergunta do aluno respondida com sucesso!');
            handleClose();
            loadOrders();
        } catch (err) {
            toast.error('Erro ao responder pergunta do aluno!');
        }
    }

    useEffect(() => {
        loadOrders();
    }, []);

    return (
        <div>
            <Header />
            <Center>
                <ContentTop>
                    <h1>Pedidos de auxílio</h1>
                </ContentTop>

                <ContentMain>
                    <table>
                        <thead>
                            <tr>
                                <th>ALUNO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr>
                                    <td>{order.student.name}</td>
                                    <td>
                                        <Edit
                                            onClick={e =>
                                                handleLoadQuestion(e, order.id)
                                            }
                                        >
                                            responder
                                        </Edit>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ContentMain>
            </Center>
            <PopUp id="popup">
                <Form onSubmit={handleSubmit}>
                    <span>
                        <button type="button" onClick={handleClose}>
                            <FaTimesCircle size={30} color="#ee4d64" />
                        </button>
                    </span>
                    <UnformLable>PERGUNTA DO ALUNO</UnformLable>
                    <p>{question.question}</p>
                    <UnformLable>SUA RESPOSTA</UnformLable>
                    <Input multiline name="answer" />
                    <Input type="hidden" name="id" value={question.id} />
                    <Input
                        type="hidden"
                        name="student_id"
                        value={question.student_id}
                    />
                    <button type="submit">Responder aluno</button>
                </Form>
            </PopUp>
        </div>
    );
}

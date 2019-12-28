import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Header from '~/components/Header';
import {
    Center,
    ContentMain,
    ContentTop,
    Edit,
    UnformLable
} from '~/styles/main';

import { ContentHelp, PopUp } from './styles';

import api from '~/services/api';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function HelpOrder() {
    const [orders, setOrders] = useState([]);
    const [question, setQuestion] = useState([]);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function loadOrders() {
        const response = await api.get('help-orders');

        setOrders(response.data);
    }

    function handleLoadQuestion(e, id) {
        const quest = orders.find(order => order.id === Number(id));
        setQuestion(quest);

        handleOpen();
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
            <ContentHelp>
                <Center>
                    <ContentTop>
                        <h1>Pedidos de auxílio</h1>
                    </ContentTop>
                    <ContentMain>
                        <table>
                            <thead>
                                <tr>
                                    <th width="90%">ALUNO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr>
                                        <td>{order.student.name}</td>
                                        <td>
                                            <Edit
                                                onClick={e =>
                                                    handleLoadQuestion(
                                                        e,
                                                        order.id
                                                    )
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
            </ContentHelp>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <PopUp id="popup">
                            <Form onSubmit={handleSubmit}>
                                <UnformLable>PERGUNTA DO ALUNO</UnformLable>
                                <p>{question.question}</p>
                                <UnformLable>SUA RESPOSTA</UnformLable>
                                <Input multiline name="answer" />
                                <Input
                                    type="hidden"
                                    name="id"
                                    value={question.id}
                                />
                                <Input
                                    type="hidden"
                                    name="student_id"
                                    value={question.student_id}
                                />
                                <button type="submit">Responder aluno</button>
                            </Form>
                        </PopUp>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}

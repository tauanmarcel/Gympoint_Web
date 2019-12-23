import React, { useState, useEffect } from 'react';
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
    UnformLable,
    FormTop,
    FormBottom
} from '~/styles/main';

import { BtnRed, BtnGrey } from '~/styles/button';

import api from '~/services/api';

const schema = Yup.object().shape({
    title: Yup.string().required('o título é obrigatório'),
    duration: Yup.string().required('a duração é obrigatória'),
    price: Yup.number().required('o preço mensal é obrigatório')
});

export default function CreatePlans({ match }) {
    const [loading, setLoading] = useState(false);
    const [planId, setPlanId] = useState('');
    const [planTitle, setPlanTitle] = useState('');
    const [planDuration, setPlanDuration] = useState('');
    const [planPrice, setPlanPrice] = useState('');
    const [planTotalPrice, setPlanTotalPrice] = useState('');

    async function loadPlans(id) {
        const response = await api.get(`plans/${id}`);

        if (response.data) {
            setPlanId(response.data.id);
            setPlanTitle(response.data.title);
            setPlanDuration(response.data.duration);
            setPlanPrice(response.data.price);
            setPlanTotalPrice(response.data.price * response.data.duration);
        }
    }

    useEffect(() => {
        loadPlans(match.params.id);
    }, []);

    function reload(time = 3000) {
        setTimeout(() => window.location.reload(true), time);
    }

    async function handleSubmit({ id = planId, title, duration, price }) {
        setLoading(true);

        try {
            if (!id) {
                await api.post('plans', {
                    title,
                    duration,
                    price
                });

                toast.success('Novo plano cadastrado com sucesso!');
            } else {
                await api.put(`plans/${id}`, {
                    title,
                    duration,
                    price
                });

                toast.success('Plano atualizado com sucesso!');
            }
            reload();
        } catch (err) {
            toast.error('Erro ao salvar os dados do plano!');
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
                            {planId ? 'Edição de plano' : 'Cadastro de plano'}
                        </h1>

                        <aside>
                            <a href="/plans">
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
                                <UnformLable for="title">TÍTULO</UnformLable>
                                <UnformInput
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Família"
                                    value={planTitle || null}
                                    onChange={e => setPlanTitle(e.target.value)}
                                />
                            </FormTop>
                            <FormBottom>
                                <p>
                                    <UnformLable for="duration">
                                        DURAÇÃO (em meses)
                                    </UnformLable>
                                    <UnformInput
                                        type="text"
                                        name="duration"
                                        id="duration"
                                        value={planDuration}
                                        onChange={e => {
                                            setPlanDuration(e.target.value);
                                            setPlanTotalPrice(
                                                `R$ ${e.target.value *
                                                    planPrice}`
                                            );
                                        }}
                                        placeholder="ex: 6"
                                    />
                                </p>
                                <p>
                                    <UnformLable for="price">
                                        PREÇO MENSAL
                                    </UnformLable>
                                    <UnformInput
                                        name="price"
                                        id="price"
                                        value={planPrice || null}
                                        onChange={e => {
                                            setPlanPrice(e.target.value);
                                            setPlanTotalPrice(
                                                `R$ ${e.target.value *
                                                    planDuration}`
                                            );
                                        }}
                                        placeholder="ex: 45.00"
                                    />
                                </p>
                                <p>
                                    <UnformLable for="totalPrice">
                                        PREÇO TOTAL
                                    </UnformLable>
                                    <UnformInput
                                        name="totalPrice"
                                        id="totalPrice"
                                        value={`R$ ${planTotalPrice}` || null}
                                        disabled
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

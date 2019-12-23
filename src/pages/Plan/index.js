import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Header from '~/components/Header';
import { Center, ContentMain, ContentTop, Edit, Del } from '~/styles/main';
import { BtnRed } from '~/styles/button';

import api from '~/services/api';
import { formatPrice } from '~/util/format';

export default function Plan() {
    const [plans, setPlans] = useState([]);

    async function handleLoadPlans() {
        const response = await api.get('plans');

        const plansParsed = response.data.map(p => ({
            ...p,
            formattedPrice: formatPrice(p.price)
        }));

        setPlans(plansParsed);
    }

    async function handleDelete(id) {
        const confirmation = window.confirm(
            'Deseja realmente excluir esse plano?'
        );

        if (confirmation) {
            try {
                await api.delete(`plans/${id}`);

                toast.success('Plano excluído com sucesso!');
                setTimeout(() => window.location.reload(true), 3000);
            } catch (err) {
                toast.error(
                    'Não foi possível excluir o plano. Tente novamente.'
                );
                setTimeout(() => window.location.reload(true), 3000);
            }
        }
    }

    useEffect(() => {
        handleLoadPlans();
    }, []);

    return (
        <div>
            <Header />
            <Center>
                <ContentTop>
                    <h1>Gerenciando planos</h1>

                    <aside>
                        <a href="plans-create">
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
                                <th>TÍTULO</th>
                                <th>DURAÇÃO</th>
                                <th>VALOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {plans.map(plan => (
                                <tr>
                                    <td>{plan.title}</td>
                                    <td>
                                        {plan.duration}
                                        {plan.duration > 1 ? ' meses' : ' mês'}
                                    </td>
                                    <td>{plan.formattedPrice}</td>
                                    <td>
                                        <Edit to={`plans-update/${plan.id}`}>
                                            editar
                                        </Edit>
                                        <Del
                                            onClick={() =>
                                                handleDelete(plan.id)
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

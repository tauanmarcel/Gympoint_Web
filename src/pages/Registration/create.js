import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FaChevronLeft, FaSave } from 'react-icons/fa';
import { Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { parseISO, addMonths, format, isBefore } from 'date-fns';

import { formatPrice } from '~/util/format';

import Header from '~/components/Header';
import {
    Center,
    ContentMain,
    ContentTop,
    ContentForm,
    UnformInput,
    UnformSelect,
    UnformLable,
    FormTop,
    FormBottom
} from '~/styles/main';

import { BtnRed, BtnGrey } from '~/styles/button';

import api from '~/services/api';

const schema = Yup.object().shape({
    student_id: Yup.number().required('informar o aluno é obrigatório'),
    plan_id: Yup.number().required('informar o plano é obrigatório'),
    start_date: Yup.date('data inválida').required(
        'a data de início é obrigatória'
    )
});

export default function CreateRegistration({ match }) {
    const [loading, setLoading] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [registrationId, setRegistrationId] = useState('');

    const [regStudentId, setRegStudentId] = useState(null);
    const [regPlanId, setRegPlanId] = useState(null);
    const [regStartDate, setRegStartDate] = useState('');
    const [regEndDate, setRegEndDate] = useState('');
    const [regFinalPrice, setRegFinalPrice] = useState('');

    const [students, setStudents] = useState([]);

    const [plans, setPlans] = useState([]);
    const [planOptions, setPlanOptions] = useState([]);
    const [choicededPlan, setChoicededPlan] = useState([]);

    async function loadRegistration(id) {
        const response = await api.get(`registrations/${id}`);

        if (response.data) {
            setRegistrationId(response.data.id);
            setRegStudentId(response.data.student.id);
            setRegPlanId(response.data.plan.id);
            setChoicededPlan(response.data.plan);
            setRegFinalPrice(
                response.data.plan.price * response.data.plan.duration
            );
        }

        setRegStartDate(
            format(parseISO(response.data.start_date), 'yyyy-MM-dd')
        );

        setRegEndDate(
            format(
                addMonths(
                    parseISO(response.data.start_date),
                    response.data.plan.duration
                ),
                'yyyy-MM-dd'
            )
        );
    }

    async function loadStudent() {
        const response = await api.get('students');

        const studentOptions = response.data.map(s => ({
            id: s.id,
            title: s.name
        }));

        setStudents(studentOptions);
    }

    async function loadPlan() {
        const response = await api.get('plans');

        const optPlans = response.data.map(p => ({
            id: p.id,
            title: p.title
        }));

        setPlans(response.data);
        setPlanOptions(optPlans);
    }

    async function handleSetDates(date) {
        const endDate = addMonths(parseISO(date), choicededPlan.duration);

        setRegStartDate(date);
        setRegEndDate(format(endDate, 'yyyy-MM-dd'));
    }

    async function handleCalculateFinalPrice(id) {
        const plan = plans.find(p => p.id === Number(id));

        const finalPrice = formatPrice(plan.price * plan.duration);

        setRegPlanId(plan.id);
        setChoicededPlan(plan);
        setRegFinalPrice(finalPrice);
    }

    useEffect(() => {
        loadStudent();
        loadPlan();

        if (regStartDate != '') handleSetDates(regStartDate);

        if (firstLoad) loadRegistration(match.params.id);

        setFirstLoad(false);
    }, [regPlanId]);

    function reload(time = 3000) {
        setTimeout(() => window.location.reload(true), time);
    }

    // eslint-disable-next-line consistent-return
    async function handleSubmit({
        id = registrationId,
        student_id,
        plan_id,
        start_date
    }) {
        if (isBefore(start_date, new Date())) {
            toast.error(
                'Data inválida! A data de início não pode ser anterior á atual.'
            );
            return false;
        }

        setLoading(true);

        try {
            if (!id) {
                await api.post('registrations', {
                    student_id,
                    plan_id,
                    start_date
                });

                toast.success('Nova matrícula efetuada com sucesso!');
            } else {
                await api.put(`registrations/${id}`, {
                    student_id,
                    plan_id,
                    start_date
                });

                toast.success('Matrícula atualizada com sucesso!');
            }
            reload();
        } catch (err) {
            toast.error('Erro ao salvar os dados da matrícula!');
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
                            {registrationId
                                ? 'Edição de matrícula'
                                : 'Cadastro de matrícula'}
                        </h1>

                        <aside>
                            <a href="/registrations">
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
                                <UnformLable for="student_id">
                                    ALUNO
                                </UnformLable>
                                <UnformSelect
                                    name="student_id"
                                    id="student_id"
                                    placeholder="Buscar aluno"
                                    options={students}
                                    value={regStudentId}
                                />
                            </FormTop>

                            <FormBottom>
                                <p>
                                    <UnformLable for="plan_id">
                                        PLANO
                                    </UnformLable>
                                    <UnformSelect
                                        type="text"
                                        name="plan_id"
                                        id="plan_id"
                                        placeholder="Selecione o plano"
                                        options={planOptions}
                                        value={regPlanId}
                                        onChange={e =>
                                            handleCalculateFinalPrice(
                                                e.target.value
                                            )
                                        }
                                    />
                                </p>
                                <p>
                                    <UnformLable for="start_date">
                                        DATA DE INÍCIO
                                    </UnformLable>
                                    <UnformInput
                                        type="date"
                                        name="start_date"
                                        id="start_date"
                                        value={regStartDate || null}
                                        onChange={e =>
                                            handleSetDates(e.target.value)
                                        }
                                        placeholder="Escolha a data"
                                    />
                                </p>
                                <p>
                                    <UnformLable for="end_date">
                                        DATA DE TÉRMINO
                                    </UnformLable>
                                    <UnformInput
                                        type="date"
                                        name="end_date"
                                        id="end_date"
                                        value={regEndDate || null}
                                        onChange={e =>
                                            setRegEndDate(e.target.value)
                                        }
                                        disabled
                                    />
                                </p>
                                <p>
                                    <UnformLable for="final_price">
                                        VALOR FINAL
                                    </UnformLable>
                                    <UnformInput
                                        name="final_price"
                                        id="final_price"
                                        value={regFinalPrice || null}
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

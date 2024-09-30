import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';

const Incomes = () => {
    const { addIncome, incomes, getIncomes, deleteIncome, totalIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">
                    Total income: <span>${totalIncome()}</span>
                </h2>
                <div className="income-content">
                    <div className="form-container">
                        <Form />
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const { _id, title, amount, date, type, category, description } = income;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    type={type}
                                    category={category}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteIncome}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    );
};

const IncomesStyled = styled.div`
    display: flex;
    flex-direction: column; // Stack elements vertically
    padding-left: 250px; // Offset for the fixed navigation bar
    transition: padding-left 0.5s ease-in-out; // Smooth transition when nav opens

    .total-income {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: 0.5rem;

        span {
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--color-green);
        }
    }

    .income-content {
        display: flex;
        flex-direction: row; // Align form and incomes horizontally
        gap: 2rem;
        flex-wrap: wrap; // Allow wrapping if space is limited

        .form-container {
            flex: 1 1 300px; // Allow flexible width for the form
            min-width: 300px; // Ensure a minimum width for the form
        }

        .incomes {
            flex: 2; // Income items take more space
            display: flex;
            flex-direction: column; // Stack income items vertically
            gap: 1rem; // Space between income items
        }
    }
`;

export default Incomes;

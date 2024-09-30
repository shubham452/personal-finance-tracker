import React, { useEffect } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';

const Expenses = () => {
    const { addExpense, expenses, getExpenses, deleteExpense, totalExpense } = useGlobalContext();

    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className="total-expense">
                    Total expense: <span>${totalExpense()}</span>
                </h2>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm />
                    </div>
                    <div className="expense">
                        {expenses.map((expense) => {
                            const { _id, title, amount, date, category, type, description } = expense;
                            return (
                                <IncomeItem
                                    key={_id}
                                    id={_id}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    category={category}
                                    date={date}
                                    type={type}
                                    indicatorColor="var(--color-green)"
                                    deleteItem={deleteExpense}
                                />
                            );
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    );
};

const ExpensesStyled = styled.div`
    display: flex;
    flex-direction: column; // Stack elements vertically
    padding-left: 250px; // Offset for the fixed navigation bar
    transition: padding-left 0.5s ease-in-out; // Smooth transition when nav opens

    .total-expense {
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

    .expense-content {
        display: flex;
        flex-direction: row; // Align form and expenses horizontally
        gap: 2rem;
        flex-wrap: wrap; // Allow wrapping if space is limited

        .form-container {
            flex: 1 1 300px; // Allow flexible width for the form
            min-width: 300px; // Ensure a minimum width for the form
        }

        .expense {
            flex: 2; // Expense items take more space
            display: flex;
            flex-direction: column; // Stack expense items vertically
            gap: 1rem; // Space between expense items
        }
    }
`;

export default Expenses;

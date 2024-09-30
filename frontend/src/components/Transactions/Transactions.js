import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Transactions = () => {
    const { transactionHistory } = useGlobalContext();
    const history = transactionHistory(); // Call the function directly

    // Check if history is an array before mapping
    if (!Array.isArray(history)) {
        return <p>No recent transactions available.</p>; // Fallback UI
    }

    return (
        <TransactionsStyled>
            <h2>Transaction History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item; // Destructure relevant properties
                return (
                    <div key={_id} className='transaction-item'> {/* Use _id as key */}
                        <p style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                            {title}
                        </p>
                        <p style={{ color: type === 'expense' ? 'red' : 'var(--color-green)' }}>
                            {type === 'expense' ? `-${amount}` : `+${amount}`}
                        </p>
                    </div>
                );
            })}
        </TransactionsStyled>
    );
};

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem; /* Add padding for better spacing */
    margin-top: 70px; /* Margin to prevent content from being hidden behind navbar */
    background: #ffffff; /* Background color to match the navbar */
    border-radius: 15px; /* Rounded corners */
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    width: 300px; /* Set a fixed width for the transactions */
    max-width: 100%; /* Ensure it doesn't exceed the parent's width */
    position: absolute; /* Use absolute positioning */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Shift left by half of its width */
    top: 80px; /* Adjust as necessary to place below the navbar */
    z-index: 10; /* Ensure it stays on top of other elements */

    h2 {
        margin-bottom: 1rem;
        color: #333333; /* Darker text for the heading */
        text-align: center; /* Center the heading text */
    }

    .transaction-item {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.3s ease; /* Transition for hover effect */

        &:hover {
            background-color: #f0f0f0; /* Slight change on hover */
        }
    }
`;

export default Transactions;

import React, { useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layout";
import Chart from "../Chart/Chart";
import { dollar } from "../../utils/Icons";
import { useGlobalContext } from "../../context/globalContext";

const Dashboard = () => {
  const { totalExpense, totalIncome, totalBalance, getIncomes, getExpenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
          </div>
          <div className="amount-con">
            <div className="income">
              <h2>Total Income</h2>
              <p>
                {dollar} {totalIncome()}
              </p>
            </div>
            <div className="expense">
              <h2>Total Expense</h2>
              <p>
                {dollar} {totalExpense()}
              </p>
            </div>
            <div className="balance">
              <h2>Total Balance</h2>
              <p>
                {dollar} {totalBalance()}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  padding-left: 270px; // Leave space for the nav bar
  transition: padding-left 0.5s ease;

  .stats-con {
    display: flex;
    gap: 2rem;

    .chart-con {
      flex: 3; // Take up more space for the chart
      height: 400px;
      background-color: #f5f7fa;
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.8s ease-in-out;
    }

    .amount-con {
      flex: 1; // Less space for income and expense
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .income,
      .expense,
      .balance {
        background: #ffffff;
        border: 2px solid #e0e0e0;
        border-radius: 20px;
        padding: 1.5rem;
        text-align: center;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
        }

        p {
          font-size: 3.5rem;
          font-weight: 700;
        }
      }

      .income {
        background-color: #e8f7f0;
        color: #27ae60;
      }

      .expense {
        background-color: #fdecec;
        color: #e74c3c;
      }

      .balance {
        background-color: #f0f7fc;
        color: #3498db;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: 4.5rem;
          opacity: 0.9;
        }
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Dashboard;

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { config } from "process";

const BASE_URL = "https://personal-finance-tracker-api-ec61.onrender.com/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  //income
  const addIncome = async (income) => {
    try {
      const response = await axios.post(`${BASE_URL}add-income`, income);
      setIncomes([...incomes, response.data]);
      getIncomes();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const deleteIncome = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}delete-income/${id}`);
      if (res.status === 200) {
        console.log("deletion successful:", res.data.message);
      }
      getIncomes();
    } catch (error) {
      console.log(
        "Error deleting income:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const totalIncome = () => {
    let totalincome = 0;
    incomes.forEach((income) => {
      totalincome = totalincome + income.amount;
    });

    return totalincome;
  };
  console.log("total income is:", totalIncome());

  //expenses
  const addExpense = async (expenses) => {
    try {
      const response = await axios.post(`${BASE_URL}add-expense`, expenses);
      setExpenses([...incomes, response.data]);
      getExpenses();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  const deleteExpense = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}delete-expense/${id}`);
      if (res.status === 200) {
        console.log("deletion successful:", res.data.message);
      }
      getExpenses();
    } catch (error) {
      console.log(
        "Error deleting income:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const totalExpense = () => {
    let totalexpense = 0;
    expenses.forEach((expenses) => {
      totalexpense = totalexpense + expenses.amount;
    });

    return totalexpense;
  };
  //console.log("total income is:",totalIncome())
  const totalBalance = () => {
    return totalIncome() - totalExpense();
  };

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0,5);
  };

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        addExpense,
        getExpenses,
        expenses,
        deleteExpense,
        totalExpense,
        totalBalance,
        transactionHistory,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

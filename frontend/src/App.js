
import styled from "styled-components";
import bg from './img/bg.png'
import { MainLayout } from './styles/Layout';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Incomes from './components/Incomes/Incomes';
import Expenses from './components/Expenses/Expenses';
import Transaction from './components/Transactions/Transactions'
function App() {

  const orbMemo = useMemo(()=>{
    return <Orb/>
  },[])
  const [active,setActive]= useState(1);

  const displayData = ()=>{
    switch(active){
      case 1:
        return <Dashboard/>
      case 2:
        return <Transaction/>
      case 3:
        return <Incomes/>
      case 4:
        return <Expenses/>
      default:
        return <Dashboard/>
      
    }
  }

  return (
    <AppStyled className="App">
    {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive}/>
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height:100vh;
  background-image:url(${bg});
  position:relative;
  main{
    flex:1;
    background:rgba(252,246,249,0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius:32px;
    overflow-x:hidden;
    &::-webkit-scrollbar{
      width:0;
    }
  }
  `;

export default App;

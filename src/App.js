import { Header } from "./pages/Header";
import { Route, Routes, Link } from 'react-router-dom';
import { Home } from "./pages/Home"
import { Guide } from "./pages/Guide";
import { Bot } from "./pages/BotPage";
import { Statistics } from "./pages/StatisticsPage";
import { useState } from "react";

function App() {

  const [globalLogin, setGlobalLogin] = useState('');

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home setGlobalLogin={(login) => { setGlobalLogin(login) }}></Home>}></Route>
          <Route path='/guide' element={<Guide></Guide>}></Route>
          <Route path='/bot' element={<Bot login={globalLogin}></Bot>}></Route>
          <Route path='/Statistics' element={<Statistics></Statistics>}></Route>
        </Routes >
      </div>
    </div>
  );
}

export default App;

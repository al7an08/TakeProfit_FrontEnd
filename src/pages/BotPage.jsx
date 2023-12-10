import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from "axios";
import { HiBan } from "react-icons/hi";
import { HiCheckCircle } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { ToolTip } from '../components/Tooltip';

const url = 'https://webservice-57a4.onrender.com';


export function Bot({ login }) {

    const [botIsRunning, setBotIsRunning] = useState(false);

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url + '/' + login + '/trading/stats', {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            const dataset = response.data
            setCompanyShares(dataset);
            if (companyShares[companyShares.length - 1]) {
                setBalance(companyShares[companyShares.length - 1].balance);
            }
            console.log('Fetching data from the server')
        }

        const timer = setInterval(() => {
            if (botIsRunning) {
                fetchData();
            }
        }, 10000);
        return () => clearInterval(timer);
    }, [botIsRunning]);

    useEffect(() => {
        console.log(login)
    }, [])
    const [companyShares, setCompanyShares] = useState([
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'TINKOFF',
            amount: 3,
            price: 150,
            action: 'sale',
            date: '2023-09-12T00:15:10',
            balance: 1000221
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        }, {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 100023
        },
        {
            name: 'SBER',
            amount: 5,
            price: 100,
            action: 'purchase',
            date: '2023-09-12T00:10:10',
            balance: 1337
        }
    ]);

    const [capital, setCapital] = useState(null);

    const [active, setActive] = useState(true);

    const [procentOfPossibleLoss, setProcentOfPossibleLoss] = useState(null);

    const [daysOfTrade, setDaysOfTrade] = useState(null);

    const [algorithm, setAlgorithm] = useState('');


    const validation = (min, max, value) => {
        if (value && value >= min && value <= max) {
            return true
        }
        else {
            return false
        }
    }

    const acceptSettings = async () => {
        if (active) {
            try {
                if (validation(1, 1000, capital)
                    &&
                    validation(0, 100, procentOfPossibleLoss)
                    &&
                    (validation(0, 1000, daysOfTrade) || daysOfTrade === null)
                    &&
                    algorithm) {
                    const response = await axios.post(url + '/' + login + '/trading',
                        {
                            fond: capital,
                            percentOfPossibleLoss: procentOfPossibleLoss,
                            daysOfTrade: daysOfTrade || 0,
                            algorithmNum: algorithm,
                        }, {
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    setActive(false);
                    setBalance(capital * 1000);
                }
                else if (!validation(1, 1000, capital)) {
                    alert('Укажите стартовый капитал')
                }
                else if (!validation(0, 100, procentOfPossibleLoss)) {
                    alert('Укажите процент допустимых потерь')
                }
                else if (!(validation(0, 1000, daysOfTrade)) && !(daysOfTrade === null)) {
                    alert('Укажите количество дней торговли')
                }
                else if (!algorithm) {
                    alert('Выберите алгортим для торговли')
                }
            }
            catch (err) {
                alert('Возникла ошибка попробуйте снова через некоторое время')
                console.log(err)
            }
        }
        else {
            runBot();
            setActive(true)
        }

    }

    const runBot = async () => {
        if (!active) {
            try {

                const response = await axios.post(url + '/' + login + '/trading' + '/startbot',
                    {
                        command: botIsRunning ? 'stop' : 'start'
                    }, {
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(data => console.log(data))



                if (botIsRunning) {
                    setBotIsRunning(false);
                }
                else {
                    setBotIsRunning(true);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert('Введите настройки')
        }
    }

    return (
        <div className='botPage'>
            <div>
                <div className='investMenu'>
                    <table className='tableShare'>
                        <thead>
                            <tr style={{ background: '#ff0507', color: 'white', height: '4vh' }}>
                                <td align='middle' >Название акции</td>
                                <td align='middle' valign='middle'>Количество акций</td>
                                <td align='middle' valign='middle'>Цена</td>
                                <td align='middle' valign='middle'>Тип операции</td>
                                <td align='middle' valign='middle'>Дата</td>
                            </tr>
                        </thead>
                        {companyShares.map((share) => {
                            return <tbody>
                                <tr style={{ height: '3vh' }}>
                                    <td align='middle' valign='middle'>{share.name}</td>
                                    <td align='middle' valign='middle'>{share.amount}</td>
                                    <td align='middle' valign='middle'>{share.price}</td>
                                    <td align='middle' valign='middle'>{share.action}</td>
                                    <td align='middle' valign='middle'>{share.date}</td>
                                </tr>
                            </tbody>
                        })}
                    </table>
                </div>
                <div className='stats'>
                    <label className='balance' style={{ color: 'Black' }}>Баланс: {balance} рублей</label>
                </div>
            </div>
            <div className='botSettings'>
                <div className="settingsInputDiv">
                    <label className='settingsLabel'> Капитал (Тыс. рублей)<div className='tooltip'><HiOutlineInformationCircle className='icon'
                    />
                        <p className='tooltiptext'>Сумма денег, которая дается в распоряжение алгоритму, как начальная</p>
                    </div>
                    </label>

                    <div className='input'>
                        <input disabled={!active} onChange={(e) => { setCapital(e.target.value) }} type='number' min='1' max='1000' className='settingsInput'></input>
                        {validation(1, 1000, capital) ? <HiCheckCircle color='green' className='icon' /> : <HiBan color='red' className='icon' />}
                    </div>
                </div>
                <div className="settingsInputDiv">
                    <label className='settingsLabel'>Процент допустимых потерь
                        <div className='tooltip'>
                            <HiOutlineInformationCircle className='icon' />
                            <p className='tooltiptext'>Часть от начальной суммы потеря, которой считается допустимой при торговле. Если алгоритм понесет потери больше допустимых, то алгоритм прекратит работу</p>
                        </div>
                    </label>
                    <div className='input'>
                        <input disabled={!active} onChange={(e) => { setProcentOfPossibleLoss(e.target.value) }} min='0' max='100' type='number' className='settingsInput'></input>
                        {validation(0, 100, procentOfPossibleLoss) ? <HiCheckCircle color='green' className='icon' /> : <HiBan color='red' className='icon' />}
                    </div>
                </div>

                <div className="settingsInputDiv">
                    <label className='settingsLabel'>Срок торговли (Дней)
                        <div className='tooltip'>
                            <HiOutlineInformationCircle className='icon' />
                            <p className='tooltiptext'>Не является обязательным параметром. Кол-во дней, в течение которых будет вестись торговля. Если не установить его, то торговля будет продолжаться пока алгоритм не будет остановлен вручную, либо пока алгоритм не выйдет за пределы по допустимым потерям</p>
                        </div></label>
                    <div className='input' >
                        <input disabled={!active} onChange={(e) => { setDaysOfTrade(e.target.value) }} type='number' min='1' max='365' className='settingsInput'></input>
                        {(daysOfTrade === null || validation(0, 1000, daysOfTrade)) ? <HiCheckCircle color='green' className='icon' /> : <HiBan color='red' className='icon' />}
                    </div>
                </div>
                <div className='selectDiv'>
                    <select disabled={!active} className='select' onChange={(e) => setAlgorithm(e.target.value)}>
                        <option value={''}>--Выберите алгоритм для трейда--</option>
                        <option value={'ML'}>Machine Learning алгоритм</option>
                        <option value={'Math'}>Математический алгоритм</option>
                    </select>
                    <div className='tooltip'>
                        <HiOutlineInformationCircle className='icon' />
                        <p className='tooltiptext' style={{ width: '20vw', right: '1vw' }}>Machine Learning алгоритм - алгоритм машинного обучения, который фильтрует решения на основе устойчивого тренда и дерева принятия решений, построенного на основе больших данных. Математический алгоритм ещё в разработке</p>
                    </div>
                </div>


                <button className='startButton' onClick={acceptSettings}>
                    {active ? 'Применить настройки' : 'Изменить настройки'}
                </button>
                <button className='startButton' onClick={runBot}>{botIsRunning ? 'Остановить бота' : 'Запустить бота'}</button>
            </div>
            {/* <button onClick={sendPost}></button> */}
        </div >
    )
}


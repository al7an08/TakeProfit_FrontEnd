import React, { useState } from 'react'
import { Link, resolvePath } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const hostUrl = 'https://webservice-57a4.onrender.com'

export function Home({ setGlobalLogin }) {

    const [login, setLogin] = useState('');

    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const Click = async () => {
        if (password && login) {
            try {
                const response = await axios.post(hostUrl + '/register_user',
                    {
                        login: login,
                        password: password
                    },
                    {
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                setGlobalLogin(login);
                navigate('/bot')
            }
            catch (err) {
                alert('Возникла ошибка попробуйте снова через некоторое время')
                console.log(err)
            }
        }
        else {
            alert('Введите пароль и логин')
        }
    }
    return (
        <div className='homePage'>
            <div className='slogan'>
                <h1 className='bigText'>Начни Трейдить Прямо Сейчас</h1>
                <p className='mediumText'>Вы хотите зарабатывать валюту на финансовых рынках, но не знаете, с чего начать? Мы предлагаем вам решение – алгоритм для алготрейдинга!</p>

                <p className='mediumText'> Наш алгоритм позволяет автоматизировать торговлю на бирже, независимо от вашего опыта и знаний. Он основан на сильных математических моделях и стратегиях, которые анализируют множество параметров и принимают решения на основе актуальных данных Московской Биржи.</p>
            </div>
            <div className='authorizationBox'>
                <label>Логин</label>
                <input type='text' className='input' onChange={(e) => setLogin(e.target.value)}></input>
                <label>Пароль</label>
                <input type='password' className='input' onChange={(e) => setPassword(e.target.value)}></input>
                <button className='enterButton' onClick={Click}>Войти</button>
            </div>
        </div >
    )
}


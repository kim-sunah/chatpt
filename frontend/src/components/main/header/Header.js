import React, { useEffect, useState, useRef } from 'react';
import logo from '../../../img/chat_PT_logo.png';
import { BiLogIn } from 'react-icons/bi';
import { BiLogOut } from 'react-icons/bi';
import { BsFillFilePersonFill } from 'react-icons/bs';

import { Link, useNavigate } from 'react-router-dom';
import SearchForm from '../../search/Search-form';
import { useDispatch } from 'react-redux';
import { searchActions } from '../../store/search.action';
import { BiSolidCommentDetail } from 'react-icons/bi';
import { BiSolidUser } from 'react-icons/bi';
import { auto } from '@popperjs/core';

const Header = () => {
    const searchref = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [Token, setToken] = useState(false);
    useEffect(() => {
        if (sessionStorage.getItem('accessToken')) {
            setToken(true);
        }
    });
    const Logouthanlder = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('authority');
        navigate('/');
    };

    const searchhandler = (events) => {
        events.preventDefault();
        localStorage.setItem('name', searchref.current.value);
        dispatch(searchActions.search(searchref.current.value));
        navigate('/search');
    };

    const handleTrainerClick = () => {
        navigate('/trainer');
    };

    return (
        // <div className="bg-white min-h-screen px-40 mx-5">className="p-6 min-h-screen px-40 mx-40"
        <header className="flex items-center justify-between p-6 border-b px-20 mx-40  max-w-screen-xl mx-auto">
            <Link to="/">Chat PT</Link>
            <div className="flex items-center space-x-4 ">
                {sessionStorage.getItem("accessToken") && <Link to ="TrainerPage"> Trainer </Link>}
                <form onSubmit={searchhandler}>
                    <input
                        type="text"
                        className="flex h-10 w-full rounded-md border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border p-2"
                        placeholder="검색"
                        ref={searchref}
                    />
                </form>

                <Link to="message">
                    <BiSolidCommentDetail size="30" style={{ color: 'black' }} />
                </Link>

                <Link to={sessionStorage.getItem('accessToken') ? '/mypage' : '/Login'}>
                    <BiSolidUser size="30" style={{ color: 'black', marginLeft: '10%' }} />
                </Link>

                {sessionStorage.getItem('authority') === 'Admin' && (
                    <Link to="admin">
                        <BsFillFilePersonFill size="30" style={{ color: 'black', marginLeft: '10%' }} />
                    </Link>
                )}

                {sessionStorage.getItem('accessToken') ? (
                    <BiLogOut size="30" onClick={Logouthanlder} style={{ color: 'black' }} />
                ) : (
                    <Link to="Login" style={{ color: 'black' }}>
                        <BiLogIn size="30" />{' '}
                    </Link>
                )}
            </div>
        </header>
    );
};
export default Header;

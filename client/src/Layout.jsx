import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import BackgroundFloor from './Components/BackgroundFloor/BackgroundFloor';
import GameSwitchBar from "./Components/GameSwitchBar/GameSwitchBar";
import './Layout.css'

export default function Layout({ rerenderLoginState }) {
    const [loginState, setLoginState] = useState(1);
    
    useEffect(() => {
        setLoginState(rerenderLoginState);
    },[rerenderLoginState])

    return (
        <main>
            <Header setLoginState={setLoginState}/>
            <BackgroundFloor/>
            <Outlet/>
            <GameSwitchBar loginState={loginState}/>
        </main>
    );
}
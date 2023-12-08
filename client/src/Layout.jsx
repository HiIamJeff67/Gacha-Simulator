import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import BackgroundFloor from './Components/BackgroundFloor/BackgroundFloor';
import GameSwitchBar from "./Components/GameSwitchBar/GameSwitchBar";

export default function Layout({ rerenderLoginState }) {
    const [loginState, setLoginState] = useState(1);
    
    useEffect(() => {
        setLoginState(rerenderLoginState);
    },[rerenderLoginState])

    return (
        <main style={{perspective: "27.5em", height: "100%"}}>
            <Header setLoginState={setLoginState}/>
            <BackgroundFloor/>
            <Outlet/>
            <GameSwitchBar loginState={loginState}/>
        </main>
    );
}
import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import BackgroundFloor from './Components/BackgroundFloor/BackgroundFloor';
import GameSwitchBar from "./Components/GameSwitchBar/GameSwitchBar";
import './Layout.css'

export default function Layout() {
    return (
        <main>
            <Header/>
            <BackgroundFloor/>
            <Outlet/>
            <GameSwitchBar/>
        </main>
    );
}
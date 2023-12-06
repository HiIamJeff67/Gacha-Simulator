import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import GameSwitchBar from "./Components/GameSwitchBar/GameSwitchBar";

export default function Layout() {
    return (
        <main>
            <Header/>
            <Outlet/>
            <GameSwitchBar/>
        </main>
    );
}
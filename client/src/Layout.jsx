import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import BackgroundFloor from './Components/BackgroundFloor/BackgroundFloor'
import GameSwitchBar from "./Components/GameSwitchBar/GameSwitchBar";

export default function Layout() {
    return (
        <main style={{perspective: "30em"}}>
            <Header/>
            <BackgroundFloor/>
            <Outlet/>
            <GameSwitchBar/>
        </main>
    );
}
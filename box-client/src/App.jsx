import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { Route, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LandingPage from "./components/LandingPage";
import CreateTeam from "./components/CreateTeam";
import Leaderboard from "./components/Leaderboard";
import StartRace from "./components/StartRace";
import MyTeam from "./components/MyTeam";

export default function Home() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/create" element={<CreateTeam />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                {/* <Route path="/start-race" element={<StartRace />} /> */}
                <Route path="/team" element={<MyTeam />} />
            </Routes>
        </DndProvider>
    );
}

import React, { useState, useEffect } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";

const styles = {
    leaderboardPage: {
        minHeight: "100vh",
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#fdf0d5",
        // color: "#fdf0d5ff", // Papaya Whip
    },
};

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    const { contract } = useContract(
        "0x019A3D456C1b763153769013d88F041992724E70"
    );
    const { data: leaderboardData, isLoading } = useContractRead(
        contract,
        "getLeaderboard",
        []
    );

    useEffect(() => {
        if (leaderboardData && leaderboardData.teamNames.length > 0) {
            // Combine team names and scores into an array of objects
            const combinedLeaderboard = leaderboardData.teamNames.map(
                (teamName, index) => ({
                    teamName,
                    score: leaderboardData.scores[index].toNumber(),
                })
            );

            // Filter out unique team names
            const uniqueTeams = Array.from(
                new Set(combinedLeaderboard.map((team) => team.teamName))
            ).map((teamName) =>
                combinedLeaderboard.find((team) => team.teamName === teamName)
            );

            setLeaderboard(uniqueTeams);
        }
    }, [leaderboardData]);

    return (
        <div style={styles.leaderboardPage}>
            <h2 style={{ color: "#003049", marginBottom: "20px" }}>
                Leaderboard
            </h2>
            <table style={{ backgroundColor: "#669BBC", width: "100%" }}>
                <thead>
                    <tr>
                        <th style={{ color: "#c1121f" }}>Team</th>
                        <th style={{ color: "#c1121f" }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((team, index) => (
                        <tr key={index}>
                            <td>{team.teamName}</td>
                            <td>{team.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;

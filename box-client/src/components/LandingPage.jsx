import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./ConnectButton";

const LandingPage = () => {
    const styles = {
        landingPage: {
            minHeight: "100vh",
            textAlign: "center",
            padding: "50px",
            backgroundColor: "#003049ff", // Prussian Blue
            color: "#fdf0d5ff", // Papaya Whip
        },
        button: {
            backgroundColor: "#780000ff", // Barn Red
            color: "#fdf0d5ff", // Papaya Whip
            padding: "10px 20px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
        },
        buttonHover: {
            backgroundColor: "#c1121fff", // Fire Brick
        },
        navBar: {
            backgroundColor: "#669bbcff", // Air Superiority Blue
            padding: "10px",
            display: "flex",
            justifyContent: "space-around",
            position: "fixed",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: 1,
        },
        navLink: {
            textDecoration: "none",
            color: "#fdf0d5ff", // Papaya Whip
            fontSize: "18px",
            margin: "0 20px",
        },
        content: {
            marginTop: "100px", // Adjusted to prevent overlap with fixed navbar
        },
    };

    return (
        <div style={styles.landingPage}>
            <div style={styles.navBar}>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-list-item">
                            <Link to="/">BoxBlocks</Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/create">Create Team</Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/team">My Team</Link>
                        </li>
                        <li className="nav-list-item">
                            <Link to="/leaderboard">Leaderboard</Link>
                        </li>
                        <li className="nav-list-item">
                            <Navbar />
                        </li>
                    </ul>
                </nav>
            </div>

            <div style={styles.content}>
                <h1>Welcome to Box Blox F1</h1>
                <p>Explore the exciting world of F1 racing with Box Blox!</p>
                <p>
                    Create your own F1 team, select drivers, strategize your
                    race, and compete with others!
                </p>
                <h2>How to Play:</h2>
                <ol>
                    <li>
                        Create your F1 team by selecting two drivers,
                        constructor team, and team name.
                    </li>
                    <li>
                        Participate in races and earn points based on your
                        team's performance.
                    </li>
                    <li>
                        Compete with other players and climb the leaderboard.
                    </li>
                </ol>
            </div>
        </div>
    );
};

export default LandingPage;

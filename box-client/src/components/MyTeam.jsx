import React, { useState } from "react";
import {
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
} from "@material-ui/core";
import { useContract, useContractRead } from "@thirdweb-dev/react";

const styles = {
    myTeamPage: {
        minHeight: "100vh",
        textAlign: "center",
        padding: "50px",
        backgroundColor: "#fdf0d5",
        // color: "#fdf0d5ff", // Papaya Whip
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
    card: {
        margin: "5px",
        width: "130px",
        borderRadius: "10px", // Optional: Add border radius
    },
    driverCard: {
        backgroundColor: "#c1121f",
    },
    teamCard: {
        backgroundColor: "#669bbc",
    },
    input: {
        marginBottom: "20px",
    },
    loadingText: {
        marginBottom: "20px",
        color: "#003049",
    },
    noTeamText: {
        color: "#780000",
    },
};

const constructorTeams = [
    { id: 0, name: "Red Bull" },
    { id: 1, name: "Mercedes" },
    { id: 2, name: "Ferarri" },
    { id: 3, name: "McLaren" },
    { id: 4, name: "Aston Martin" },
    { id: 5, name: "Alpine" },
    { id: 6, name: "Alpha Romeo" },
    { id: 7, name: "Haas" },
    { id: 8, name: "Alphatauri" },
    { id: 9, name: "Williams" },
];

const driverNames = [
    "Max",
    "Sergio",
    "Lewis",
    "Fernando",
    "George",
    "Carlos",
    "Lando",
    "Charles",
    "Oscar",
    "Pierre",
    "Lance",
    "Zhou",
    "Kevin",
    "Alex",
    "Esteban",
    "Yuki",
    "Valtteri",
    "Niko",
    "Daniel",
    "Logan",
];

const DriverCard = ({ driverId }) => {
    const driverName = driverNames[driverId];
    return (
        <Card style={{ ...styles.card, ...styles.driverCard }}>
            <CardContent>
                <Typography variant="h6">{driverName}</Typography>
                <img
                    src={`/drivers/${driverId}.png`}
                    style={{ width: "100%" }}
                    alt={driverName}
                />
            </CardContent>
        </Card>
    );
};

const TeamCard = ({ teamName }) => {
    const team = constructorTeams.find((team) => team.name === teamName);
    return (
        <Card style={{ ...styles.card, ...styles.teamCard }}>
            <CardContent>
                <Typography variant="h6">{teamName}</Typography>
                <img
                    src={`/teams/${team.id}.png`}
                    style={{ width: "100%" }}
                    alt={team.name}
                />
            </CardContent>
        </Card>
    );
};

const MyTeam = () => {
    const [userAddress, setUserAddress] = useState("");

    const { contract } = useContract(
        "0x019A3D456C1b763153769013d88F041992724E70"
    );

    const { data: team, isLoading: isFetching } = useContractRead(
        contract,
        "getTeamByOwner",
        [userAddress]
    );

    return (
        <div style={styles.myTeamPage}>
            <div style={{ marginTop: "20px" }}>
                <TextField
                    label="Enter Wallet Address"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    style={styles.input}
                />

                {team && team.constructorTeam !== "" && (
                    <div
                        style={{
                            marginTop: "20px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography variant="h5">Team:</Typography>
                        <Typography variant="h5">{team.teamName}</Typography>
                        <br />
                        <div style={{ display: "flex", marginRight: "20px" }}>
                            <DriverCard driverId={team.driver1} />
                            <DriverCard driverId={team.driver2} />
                        </div>
                        <div>
                            <TeamCard teamName={team.constructorTeam} />
                        </div>
                    </div>
                )}

                {team && team.constructorTeam === "" && (
                    <Typography variant="h6" style={styles.noTeamText}>
                        No team found for this owner.
                    </Typography>
                )}
            </div>
        </div>
    );
};

export default MyTeam;

import React, { useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import {
    Card,
    CardContent,
    Drawer,
    List,
    ListItem,
    Typography,
    Button,
    TextField,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useContract, useContractWrite } from "@thirdweb-dev/react";

const ItemType = {
    DRIVER: "DRIVER",
    TEAM: "TEAM",
};

const BlankCard = ({ type }) => {
    return (
        <Card
            style={{
                margin: "5px",
                width: "130px",
                height: "130px",
                backgroundColor: "#8D99AE",
            }}
        >
            <CardContent>
                <Typography variant="h6">
                    {type === ItemType.DRIVER ? "Driver" : "Team"}
                </Typography>
            </CardContent>
        </Card>
    );
};

const DriverCard = ({ driver, index }) => {
    const [, ref] = useDrag({
        type: ItemType.DRIVER,
        item: { id: driver.id, index },
    });

    return (
        <div ref={ref}>
            <Card
                style={{
                    margin: "5px",
                    width: "130px",
                    backgroundColor: "#c1121f",
                }}
            >
                <CardContent>
                    <Typography variant="h6">{driver.name}</Typography>
                    <img
                        src={`/drivers/${driver.id}.png`}
                        style={{ width: "100%" }}
                        alt={driver.name}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

const TeamCard = ({ team, index }) => {
    const [, ref] = useDrag({
        type: ItemType.TEAM,
        item: { id: team.id, index },
    });

    return (
        <div ref={ref}>
            <Card
                style={{
                    margin: "5px",
                    width: "130px",
                    backgroundColor: "#669bbc",
                }}
            >
                <CardContent>
                    <Typography variant="h6">{team.name}</Typography>
                    <img
                        src={`/teams/${team.id}.png`}
                        style={{ width: "100%" }}
                        alt={team.name}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

const CreateTeam = () => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [selectedTab, setSelectedTab] = useState("drivers");
    const [drivers, setDrivers] = useState([
        { id: 0, name: "Max" },
        { id: 1, name: "Sergio" },
        { id: 2, name: "Lewis" },
        { id: 3, name: "Fernando" },
        { id: 4, name: "George" },
        { id: 5, name: "Carlos" },
        { id: 6, name: "Lando" },
        { id: 7, name: "Charles" },
        { id: 8, name: "Oscar" },
        { id: 9, name: "Gasly" },
        { id: 10, name: "Lance" },
        { id: 11, name: "Zhou" },
        { id: 12, name: "Kevin" },
        { id: 13, name: "Alex" },
        { id: 14, name: "Esteban" },
        { id: 15, name: "Yuki" },
        { id: 16, name: "Valtteri" },
        { id: 17, name: "Nico" },
        { id: 18, name: "Daniel" },
        { id: 19, name: "Logan" },
    ]);
    const [constructorTeams, setConstructorTeams] = useState([
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
    ]);
    const [selectedDrivers, setSelectedDrivers] = useState([]);
    const [selectedConstructorTeams, setSelectedConstructorTeams] = useState(
        []
    );
    const [teamName, setTeamName] = useState("");

    const { contract } = useContract(
        "0x019A3D456C1b763153769013d88F041992724E70"
    );
    const { mutateAsync: createTeam, isLoading } = useContractWrite(
        contract,
        "createTeam"
    );

    const call = async (driver1, driver2, constructorteam) => {
        try {
            const data = await createTeam({
                args: [driver1, driver2, constructorteam, teamName],
            });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
        }
    };

    const [, drop] = useDrop({
        accept: [ItemType.DRIVER, ItemType.TEAM],
        drop: (item, monitor) => {
            const droppedId = item.id;
            const droppedType = monitor.getItemType();
            if (droppedType === ItemType.DRIVER) {
                // Check if the driver is already in the selectedDrivers array
                const isDriverSelected = selectedDrivers.some(
                    (driver) => driver.id === droppedId
                );
                const selectedDriver = drivers.find(
                    (driver) => driver.id === droppedId
                );
                // If the driver is not selected, add it to the selectedDrivers array
                if (!isDriverSelected && selectedDrivers.length < 2) {
                    setSelectedDrivers((prev) => [...prev, selectedDriver]);
                }
            } else if (droppedType === ItemType.TEAM) {
                // Handle dropped team
                const selectedTeam = constructorTeams.find(
                    (team) => team.id === droppedId
                );
                if (selectedTeam && !selectedConstructorTeams.length) {
                    setSelectedConstructorTeams([selectedTeam]);
                }
            }
        },
    });

    const handleCreateTeam = async () => {
        try {
            console.log(
                selectedDrivers[0]["id"],
                selectedDrivers[1]["id"],
                selectedConstructorTeams[0]["name"],
                teamName
            );

            await call(
                selectedDrivers[0]["id"],
                selectedDrivers[1]["id"],
                selectedConstructorTeams[0]["name"],
                teamName
            );
            // Handle success
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div>
            <Drawer variant="persistent" anchor="left" open={drawerOpen}>
                <div style={{ width: "300px" }}>
                    <List>
                        <ListItem
                            button
                            onClick={() => setSelectedTab("drivers")}
                            selected={selectedTab === "drivers"}
                        >
                            <Typography>Drivers</Typography>
                        </ListItem>
                        <ListItem
                            button
                            onClick={() => setSelectedTab("teams")}
                            selected={selectedTab === "teams"}
                        >
                            <Typography>Teams</Typography>
                        </ListItem>
                    </List>

                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            padding: "10px",
                        }}
                    >
                        {selectedTab === "drivers" &&
                            drivers.map((driver, index) => (
                                <DriverCard
                                    key={driver.id}
                                    driver={driver}
                                    index={index}
                                />
                            ))}

                        {selectedTab === "teams" &&
                            constructorTeams.map((team, index) => (
                                <TeamCard
                                    key={team.id}
                                    team={team}
                                    index={index}
                                />
                            ))}
                    </div>
                </div>
            </Drawer>

            <div
                ref={drop}
                style={{
                    padding: "20px",
                    backgroundColor: "#fdf0d5",
                    minHeight: "100vh",
                    marginLeft: drawerOpen ? 300 : 0,
                    transition: "margin 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Button onClick={() => setDrawerOpen(!drawerOpen)}>
                    {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </Button>

                <h2>Create Team</h2>

                <h3>Selected Drivers</h3>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                    {selectedDrivers.map((driver) => (
                        <DriverCard key={driver.id} driver={driver} />
                    ))}
                    {selectedDrivers.length < 2 && (
                        <BlankCard type={ItemType.DRIVER} />
                    )}
                </div>

                <h3>Selected Constructor Team</h3>
                <div>
                    {selectedConstructorTeams.length > 0 ? (
                        <TeamCard
                            key={selectedConstructorTeams[0].id}
                            team={selectedConstructorTeams[0]}
                        />
                    ) : (
                        <BlankCard type={ItemType.TEAM} />
                    )}
                </div>

                <TextField
                    label="Team Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateTeam}
                    style={{ marginTop: "20px" }}
                >
                    Create Team
                </Button>
            </div>
        </div>
    );
};

export default CreateTeam;

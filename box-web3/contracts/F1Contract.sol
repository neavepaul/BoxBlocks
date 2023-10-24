// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FantasyF1Contract is ERC721Enumerable, Ownable{

    uint256 constant MAX_TEAMS = 10000;
    uint256 constant TOTAL_RACES = 5;

    uint256 public nextRaceId = 0;
    uint256 public totalTeams = 0;

    mapping(uint256 => Race) public races;
    // mapping(uint256 => mapping(uint256 => uint256)) public raceScores; // raceId => teamId => score

    mapping(uint256 => string) public driverNames;
    mapping(address => uint256) public teamsByOwner;

    struct Race {
        string raceName;
        mapping(uint256 => string) results; // Position => Driver Name
        
        bool raceCompleted;
        string fastestPitstopTeam;
    }

    struct Team {
        uint256 driver1;
        uint256 driver2;
        string constructorTeam;
        string teamName;
        address owner;
        uint256 score;
    }

    mapping(uint256 => Team) public teams;

    constructor() ERC721("FantasyF1Team", "F1T") {}

    function initialize() external onlyOwner {
        // Initialize hardcoded driver names here
        driverNames[0] = "Max";
        driverNames[1] = "Sergio";
        driverNames[2] = "Lewis";
        driverNames[3] = "Fernando";
        driverNames[4] = "George";
        driverNames[5] = "Carlos";
        driverNames[6] = "Lando";
        driverNames[7] = "Charles";
        driverNames[8] = "Oscar";
        driverNames[9] = "Pierre";
        driverNames[10] = "Lance";
        driverNames[11] = "Zhou";
        driverNames[12] = "Kevin";
        driverNames[13] = "Alex";
        driverNames[14] = "Esteban";
        driverNames[15] = "Yuki";
        driverNames[16] = "Valtteri";
        driverNames[17] = "Niko";
        driverNames[18] = "Daniel";
        driverNames[19] = "Logan";



        races[nextRaceId].raceName = "Australian Grand Prix";
        races[nextRaceId].raceCompleted = false;
        races[nextRaceId].fastestPitstopTeam = "McLaren";
        races[nextRaceId].results[0] = "Sergio";
        races[nextRaceId].results[1] = "Lewis";
        races[nextRaceId].results[2] = "Max";
        races[nextRaceId].results[3] = "Lando";
        races[nextRaceId].results[4] = "Oscar";
        races[nextRaceId].results[5] = "Carlos";
        races[nextRaceId].results[6] = "Kevin";
        races[nextRaceId].results[7] = "Daniel";
        races[nextRaceId].results[8] = "Charles";
        races[nextRaceId].results[9] = "Alex";
        races[nextRaceId].results[10] = "George";
        races[nextRaceId].results[11] = "Yuki";
        races[nextRaceId].results[12] = "Fernando";
        races[nextRaceId].results[13] = "Lance";
        races[nextRaceId].results[14] = "Gasly";
        races[nextRaceId].results[15] = "Esteban";
        races[nextRaceId].results[16] = "Niko";
        races[nextRaceId].results[17] = "Logan";
        races[nextRaceId].results[18] = "Zhou";
        races[nextRaceId].results[19] = "Bottas";

        nextRaceId++;



        races[nextRaceId].raceName = "Bahrain Grand Prix";
        races[nextRaceId].raceCompleted = false;
        races[nextRaceId].fastestPitstopTeam = "Red Bull Racing";
        races[nextRaceId].results[0] = "Sergio";
        races[nextRaceId].results[1] = "Oscar";
        races[nextRaceId].results[2] = "Max";
        races[nextRaceId].results[3] = "Lando";
        races[nextRaceId].results[4] = "Lewis";
        races[nextRaceId].results[5] = "Carlos";
        races[nextRaceId].results[6] = "Kevin";
        races[nextRaceId].results[7] = "Daniel";
        races[nextRaceId].results[8] = "Charles";
        races[nextRaceId].results[9] = "Alex";
        races[nextRaceId].results[10] = "George";
        races[nextRaceId].results[11] = "Yuki";
        races[nextRaceId].results[12] = "Fernando";
        races[nextRaceId].results[13] = "Lance";
        races[nextRaceId].results[14] = "Gasly";
        races[nextRaceId].results[15] = "Esteban";
        races[nextRaceId].results[16] = "Niko";
        races[nextRaceId].results[17] = "Logan";
        races[nextRaceId].results[18] = "Zhou";
        races[nextRaceId].results[19] = "Bottas";

        nextRaceId++;


        nextRaceId = 0;
    }

    function createTeam(uint256 driver1, uint256 driver2, string memory constructorteam, string memory teamName) external {
        require(totalTeams < MAX_TEAMS, "Maximum teams reached");
        require(driver1 != driver2, "Both drivers must be different");

        teams[totalTeams] = Team({
            driver1: driver1,
            driver2: driver2,
            constructorTeam: constructorteam,
            teamName: teamName,
            owner: msg.sender,
            score: 0
        });

        // _safeMint(msg.sender, totalTeams);
        teamsByOwner[msg.sender] = totalTeams;
        totalTeams++;
    }

    function startRace() external onlyOwner {
        require(nextRaceId <= TOTAL_RACES, "All races completed");

        Race storage currentRace = races[nextRaceId];
        require(!currentRace.raceCompleted, "Race already completed");

        for (uint256 i = 0; i < totalTeams; i++) {
            uint256 teamId = i;

            uint256 driver1Position = findDriverPosition(teams[teamId].driver1, currentRace);
            uint256 driver2Position = findDriverPosition(teams[teamId].driver2, currentRace);

            uint256 score = calculateScore(driver1Position, driver2Position, teamId, currentRace.fastestPitstopTeam);
            teams[teamId].score += score;
        }

        currentRace.raceCompleted = true;
        nextRaceId++;
    }

    function findDriverPosition(uint256 driverId, Race storage race) internal view returns (uint256) {
        for (uint256 i = 0; i < 20; i++) {
            if (keccak256(bytes(race.results[i])) == keccak256(bytes(getDriverName(driverId)))) {
                return i;
            }
        }
        return 0; // Driver did not finish within top 20
    }

    function calculateScore(uint256 driver1Position, uint256 driver2Position, uint256 teamId, string memory fastestPitstopTeam) internal view returns (uint256) {
        uint256 score = calculateDriverScore(driver1Position) + calculateDriverScore(driver2Position);

        if (isFastestPitstopTeam(teams[teamId].constructorTeam, fastestPitstopTeam)) {
            score += 10;
        }

        return score;
    }

    function calculateDriverScore(uint256 position) internal pure returns (uint256) {
        if (position == 0) {
            return 25;
        } else if (position == 1) {
            return 18;
        } else if (position == 2) {
            return 15;
        } else if (position == 3) {
            return 12;
        } else if (position == 4) {
            return 10;
        } else if (position == 5) {
            return 8;
        } else if (position == 6) {
            return 6;
        } else if (position == 7) {
            return 4;
        } else if (position == 8) {
            return 2;
        } else if (position == 9) {
            return 1;
        }

        // Positions 11-20 and DNF
        return 0;
    }  

    function isFastestPitstopTeam(string memory teamName, string memory fastestPitstopTeam) internal pure returns (bool) {
        return keccak256(bytes(teamName)) == keccak256(bytes(fastestPitstopTeam));
    }


    function getDriverName(uint256 driverId) internal view returns (string memory) {
        return driverNames[driverId];
    }

    function getTeamByOwner(address owner) external view returns (uint256 driver1, uint256 driver2, string memory constructorTeam, string memory teamName) {
        uint256 teamId = teamsByOwner[owner];

        Team storage team = teams[teamId];
        return (team.driver1, team.driver2, team.constructorTeam, team.teamName);
    }

    function getLeaderboard() external view returns (string[3] memory teamNames, uint256[3] memory scores) {
        uint256[3] memory topScores;
        uint256[3] memory topTeamIds;

        for (uint256 i = 0; i < totalTeams; i++) {
            uint256 score = teams[i].score;
            
            for (uint256 j = 0; j < 3; j++) {
                if (score > topScores[j]) {
                    for (uint256 k = 2; k > j; k--) {
                        topScores[k] = topScores[k - 1];
                        topTeamIds[k] = topTeamIds[k - 1];
                    }
                    topScores[j] = score;
                    topTeamIds[j] = i;
                    break;
                }
            }
        }

        for (uint256 i = 0; i < 3; i++) {
            teamNames[i] = teams[topTeamIds[i]].teamName;
            scores[i] = topScores[i];
        }
    }

}

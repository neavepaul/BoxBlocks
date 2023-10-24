/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: {
        version: "0.8.17",
        defaultNetwork: "sepolia",
        networks: {
            hardhat: {},
            sepolia: {
                url: "https://rpc.ankr.com/eth_sepolia",
                accounts: ["0x4d53Cb2A20CaAf955455f56a9671472A44b13234"],
            },
        },
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
};

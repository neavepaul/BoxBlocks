const FantasyF1Contract = artifacts.require("FantasyF1Contract");

module.exports = function (deployer) {
    deployer.deploy(FantasyF1Contract);
};

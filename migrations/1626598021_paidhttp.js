const PaidHTTP = artifacts.require("PaidHTTP");

module.exports = function(_deployer) {
  _deployer.deploy(PaidHTTP);
};

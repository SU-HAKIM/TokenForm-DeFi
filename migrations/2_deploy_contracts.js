var TokenForm = artifacts.require("../contracts/TokenForm.sol");
var DappToken = artifacts.require("../contracts/DappToken.sol");
var DaiToken = artifacts.require("../contracts/DaiToken.sol");

module.exports = async function (deployer, network, accounts) {
  //Deploy Mock Dai token
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //Deploy Dapp Token
  await deployer.deploy(DappToken);
  let dappToken = await DappToken.deployed();

  //Deploy TokenForm
  await deployer.deploy(TokenForm, dappToken.address, daiToken.address);
  let tokenForm = await TokenForm.deployed();

  //Transfer all DappToken to Token Form
  await dappToken.transfer(tokenForm.address, '1000000000000000000000000');

  //Transfer 100 Mock DaiToken to a investor
  await daiToken.transfer(accounts[1], '100000000000000000000');

};

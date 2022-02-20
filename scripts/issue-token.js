const TokenForm = artifacts.require("../contracts/TokenForm.sol");

module.exports = async function (callback) {


    let tokenForm = await TokenForm.deployed();

    await tokenForm.issueTokens();
    console.log("token issued");
    callback();

};

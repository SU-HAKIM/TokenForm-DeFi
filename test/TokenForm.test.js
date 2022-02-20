const TokenForm = artifacts.require("../contracts/TokenForm.sol");
const DappToken = artifacts.require("../contracts/DappToken.sol");
const DaiToken = artifacts.require("../contracts/DaiToken.sol");


contract("TokenForm", ([owner, investor1, investor2]) => {
    let dappToken;
    let daiToken;
    let tokenForm;
    let totalDappTokenSupply = "1000000000000000000000000";
    let totalDaiTokenSupply = '100000000000000000000';
    let amountOfStakingDaiToken = '10000000000000000000'

    before(async () => {
        daiToken = await DaiToken.new();
        dappToken = await DappToken.new();
        tokenForm = await TokenForm.new(dappToken.address, daiToken.address);

        //transfer tokens
        await dappToken.transfer(tokenForm.address, totalDappTokenSupply);
        await daiToken.transfer(investor1, totalDaiTokenSupply, { from: owner });
    })

    describe("Mock DAI deployment", async () => {
        it("has a name", async () => {
            const name = await daiToken.name();
            assert.equal(name, "Mock DAI Token", "logs the token name");
        })
    })

    describe("Dapp Token deployment", async () => {
        it("has a name", async () => {
            const name = await dappToken.name();
            assert.equal(name, "DApp Token", "logs the token name");
        })
    })

    describe("Token Form deployment", async () => {
        it("has a name", async () => {
            const name = await tokenForm.name();
            assert.equal(name, "Dapp Token Form", "logs the token form name");
        });
        it("contract has Dapp Tokens", async () => {
            let tokens = await dappToken.balanceOf(tokenForm.address);
            assert.equal(tokens.toString(), totalDappTokenSupply);
        })
    })

    describe("Faring Tokens", async () => {
        it("rewards investor for staking mDai tokens", async () => {
            let result;
            result = await daiToken.balanceOf(investor1);
            assert.equal(result.toString(), totalDaiTokenSupply, "logs amount of investors mDai token");
            await daiToken.approve(tokenForm.address, amountOfStakingDaiToken, { from: investor1 });
            await tokenForm.stakeTokens(amountOfStakingDaiToken, { from: investor1 });

            result = await daiToken.balanceOf(investor1);
            assert.equal(result.toString(), totalDaiTokenSupply - amountOfStakingDaiToken);

            result = await tokenForm.stakingBalance(investor1);
            assert.equal(result.toString(), amountOfStakingDaiToken);

            result = await tokenForm.isStaking(investor1);
            assert.equal(result.toString(), 'true');

            await tokenForm.issueTokens({ from: owner });

            result = await dappToken.balanceOf(investor1);
            assert.equal(result.toString(), amountOfStakingDaiToken / 2);

            tokenForm.issueTokens({ from: investor1 }).then(assert.fail).catch(error => {
                assert(error.message.indexOf('revert') >= 0, "only admin")
            })

            await tokenForm.unStakeTokens({ from: investor1 });

            result = await daiToken.balanceOf(tokenForm.address);
            assert.equal(result.toString(), '0');

            result = await daiToken.balanceOf(investor1);
            assert.equal(result.toString(), totalDaiTokenSupply);

            result = await tokenForm.isStaking(investor1);
            assert.equal(result.toString(), 'false');
        })
    })
})



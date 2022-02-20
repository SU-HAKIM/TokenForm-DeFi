//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenForm{
    string public name="Dapp Token Form";
    DappToken public dappToken;
    DaiToken public daiToken; 
    address public owner;

    address[] public stakers;
    mapping(address=>uint) public stakingBalance;
    mapping(address=>bool) public hasStaked;
    mapping(address=>bool) public isStaking;

    constructor(DappToken _dappToken,DaiToken _daiToken){
        dappToken=_dappToken;
        daiToken=_daiToken;
        owner=msg.sender;
    }

    function stakeTokens(uint _amount) public{
        require(_amount>0,"amount can not be 0");
        //Deposit Dai Token
        //Transfer Dai token to this contracts address from client
        daiToken.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender]+=_amount;

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        
        isStaking[msg.sender]=true;
        hasStaked[msg.sender]=true;
    } 

    //issu Dapp token as inteset
    function issueTokens ()public{
        require(msg.sender==owner,"caller must be the owner");
        for(uint i=0;i<stakers.length;i++){
            address recipient=stakers[i];
            uint balance=stakingBalance[recipient];
            if(balance>0){
                dappToken.transfer(recipient, balance / 2);
            }
        }
    }

    //investors winthdraw tokens
    function unStakeTokens()public{
        uint balance=stakingBalance[msg.sender];
        require(balance>0,"staking balace can not be 0");
        daiToken.transfer(msg.sender, balance);
        stakingBalance[msg.sender]=0;
        isStaking[msg.sender]=false;
    }
}
import React, { useEffect, useState } from "react";
import getContract from "./getWeb3";
import Web3 from 'web3';
import "./App.css";
import Navbar from "./components/Navbar";

import DappToken from "./contracts/DappToken.json";
import DaiToken from "./contracts/DaiToken.json";
import TokenForm from "./contracts/TokenForm.json";


import AlertError from "./components/AlertError";
import AlertSuccess from "./components/AlertSuccess";
import Main from "./components/Main";

const App = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState('');
  const [dappToken, setDappToken] = useState(null);
  const [daiToken, setDaiToken] = useState(null);
  const [tokenForm, setTokenForm] = useState(null);
  const [contractAddress, setContractAddress] = useState({
    dappToken: null,
    daiToken: null,
    tokenForm: null
  });
  const [balances, setBalances] = useState({
    dappToken: '0',
    daiToken: '0',
    stakingBalance: '0'
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  const [stakingInput, setStakingInput] = useState(0)

  useEffect(() => {
    async function call() {
      await connectToMetaMask();
    }

    call()
  }, [success, error])

  const handleChange = (e) => {
    setStakingInput(e.target.value);
  }



  const handleStaking = async () => {
    console.log(stakingInput)
    try {
      await daiToken.methods.approve(contractAddress.tokenForm, web3.utils.toWei(stakingInput, 'Ether')).send({ from: accounts });
      await tokenForm.methods.stakeTokens(web3.utils.toWei(stakingInput, 'Ether')).send({ from: accounts });
      setSuccess("Staked Tokens");
      setStakingInput(0)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleUnStaking = async () => {
    try {
      await tokenForm.methods.unStakeTokens().send({ from: accounts });
      setSuccess("Un-Staked Tokens");

    } catch (error) {
      setError(error.message)
    }
  }


  const connectToMetaMask = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        const dappToken = await getContract(web3, DappToken);
        const daiToken = await getContract(web3, DaiToken);
        const tokenForm = await getContract(web3, TokenForm);
        const dappTokenBalance = await dappToken.contract.methods.balanceOf(accounts[0]).call();
        const daiTokenBalance = await daiToken.contract.methods.balanceOf(accounts[0]).call();
        const stakingBalance = await tokenForm.contract.methods.stakingBalance(accounts[0]).call();
        setBalances({ dappToken: dappTokenBalance, daiToken: daiTokenBalance, stakingBalance });
        //set web3
        setWeb3(web3);
        // set contracts
        setDappToken(dappToken.contract);
        setDaiToken(daiToken.contract);
        setTokenForm(tokenForm.contract);
        //set contract addresses
        setContractAddress({
          dappToken: dappToken.address,
          daiToken: daiToken.address,
          tokenForm: tokenForm.address
        });
        //set accounts
        setAccounts(accounts[0]);
        setSuccess('Successfully connected to the Meta Mask');
        setLoading(false);
        console.log("ok")
      } catch (error) {
        setError(error.message);
        setSuccess('')
      }
    } else {
      setError("Please install Meta Mask")
      setSuccess('')
    }
  }
  if (loading) {
    return <p>Loading.....</p>
  } else {
    return (
      <>
        <Navbar accounts={accounts} />
        {error && <AlertError msg={error} />}
        {success && <AlertSuccess msg={success} />}
        {!loading && <Main
          daiTokenBalance={balances.daiToken}
          dappTokenBalance={balances.dappToken}
          stakingBalance={balances.stakingBalance}
          stakingInput={stakingInput}
          web3={web3}
          handleChange={handleChange}
          handleStaking={handleStaking}
          handleUnStaking={handleUnStaking}
        />}
      </>
    )
  }
}


export default App;



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

const App = () => {

  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState('');
  const [contracts, setContracts] = useState({
    dappToken: null,
    daiToken: null,
    tokenForm: null
  });
  const [contractAddress, setContractAddress] = useState({
    dappToken: null,
    daiToken: null,
    tokenForm: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    connectToMetaMask();
  }, [])



  const connectToMetaMask = async () => {
    if (typeof window !== undefined && typeof window.ethereum !== undefined) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        let web3 = new Web3(window.ethereum);
        let accounts = await web3.eth.getAccounts();
        const dappToken = await getContract(web3, DappToken);
        const daiToken = await getContract(web3, DaiToken);
        const tokenForm = await getContract(web3, TokenForm);
        //set web3
        setWeb3(web3);
        // set contracts
        setContracts({
          dappToken: dappToken.contract,
          daiToken: daiToken.contract,
          tokenForm: tokenForm.contract
        });
        //set contract addresses
        setContractAddress({
          dappToken: dappToken.address,
          daiToken: daiToken.address,
          tokenForm: tokenForm.address
        });
        //set accounts
        setAccounts(accounts[0]);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Please install Meta Mask")
    }
  }
  return (
    <>
      <Navbar accounts={accounts} />
      {error && <AlertError msg={error} />}
      {success && <AlertSuccess msg={success} />}

    </>
  );
}


export default App;


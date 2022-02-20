
// import Web3 from "web3";

// const contract_address = "0xC57a3B00e4523cb76095080311ed4BC597B2eE0F";
// const getWeb3 = () =>
//   new Promise((resolve, reject) => {
//     // Wait for loading completion to avoid race conditions with web3 injection timing.
//     window.addEventListener("load", async () => {
//       // Modern dapp browsers...
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         try {
//           // Request account access if needed
//           await window.ethereum.enable();
//           // Accounts now exposed
//           resolve(web3);
//         } catch (error) {
//           reject(error);
//         }
//       }
//       // Legacy dapp browsers...
//       else if (window.web3) {
//         // Use Mist/MetaMask's provider.
//         const web3 = window.web3;
//         console.log("Injected web3 detected.");
//         resolve(web3);
//       }
//       // Fallback to localhost; use dev console port by default...
//       else {
//         const provider = new Web3.providers.HttpProvider(
//           "https://rinkeby.infura.io/v3/2b3bb5649a77425ba2bbbf69ce31c375"
//         );
//         const web3 = new Web3(provider);
//         console.log("No web3 instance injected, using Local web3.");
//         resolve(web3);
//       }
//     });
//   });

// export default getWeb3;

const getContract = async (web3, contracts) => {
  let network_id = await web3.eth.net.getId();
  let contract_address = contracts.networks[network_id];
  console.log(contract_address.address, "=> address");
  let contract = new web3.eth.Contract(contracts.abi, contract_address.address);

  return { contract, address: contract_address };
}

export default getContract;
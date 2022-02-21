import React from "react";
import Dai from "../images/Dai.webp";

const Main = ({
  web3,
  dappTokenBalance,
  daiTokenBalance,
  stakingBalance,
  stakingInput,
  handleChange,
  handleStaking,
  handleUnStaking,
}) => {
  return (
    <>
      <div className="container  w-50 mx-auto mt-3">
        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{web3.utils.fromWei(stakingBalance, "Ether")} mDai</td>
              <td>{web3.utils.fromWei(dappTokenBalance, "Ether")} mDapp</td>
            </tr>
          </tbody>
        </table>
        <div className="card card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h6>Stake Tokens</h6>
            <p className="text-muted">
              Balance : {web3.utils.fromWei(daiTokenBalance, "Ether")}
            </p>
          </div>
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={stakingInput}
              onChange={handleChange}
            />
            <span className="input-group-text" id="basic-addon2">
              <img
                src={Dai}
                alt="Dai token"
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              mDai
            </span>
          </div>
          <button
            className="btn btn-primary btn-block mt-2"
            onClick={handleStaking}
          >
            STAKE!
          </button>
          <button
            className="btn btn-primary btn-block my-2"
            onClick={handleUnStaking}
          >
            UN-STAKE!
          </button>
        </div>
      </div>
    </>
  );
};

export default Main;

import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashOne from './AdUser/UserDashOne';
import UserDashTwo from './AdUser/UserDashTwo';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ethers } from "ethers";
import ABI from "./abi.json";
import ErrorMessage from "./ErrorMessage";
import ToggleSwitch from "../Admin/Lodder/ToggleSwitch";
import { BigNumber, FixedFormat, FixedNumber, formatFixed, parseFixed, BigNumberish } from "@ethersproject/bignumber";
import GetOwnerAddress from "./GetOwnerAddress";
import GetPausedStatus from "./Lodder/GetPausedStatus";
import GetIsAliveStatus from "./IsAlive/GetIsAliveStatus";
import LoadingSpinner from "./Lodder/LoadingSpinner";
// Payment send funcation
const DepositFund = async ({ setError, setTxs, ether, isLoading, SetReceiptInfo }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    const addr = process.env.REACT_APP_CONTRACT_ADD;
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    // Get Interface

    const iface = new ethers.utils.Interface(ABI);
    // Get Function data 
    const data = iface.encodeFunctionData("deposit", []);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether),
      data
    })
    setTxs(tx);
    const receipt = await tx.wait();
    SetReceiptInfo(receipt)


  } catch (err) {
    setError(err.code);
  }
};
//Get User Blance
const GetNomineeBalance
  = async ({ setBalanceError, setnomBalance }) => {

    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //console.log("provider____", window.ethereum.networkVersion, 'window.ethereum.networkVersion');
      const signer = provider.getSigner();

      const AccountAdd = await signer.getAddress();
      ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
      const iface = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADD, ABI, signer);
      try {
        //const userd = await iface.getNominee();
        const userd = await iface.userBalance(AccountAdd);
        let vr = BigNumber.from(userd._hex);
        let nocov = vr.toString();
        const finalBalance = ethers.utils.formatEther(nocov);
        setnomBalance(finalBalance);

      } catch (error) {

        //console.log("ERROR AT GETTING USER: ", error);
      }

    } catch (err) {
      setBalanceError(err.code);
    }
  };

// Withdrow funds
const WithDrawFund = async ({ setError, setTxs, ether, SetReceiptInfoWithdrw }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
    // Get Interface
    const iface = new ethers.utils.Interface(ABI);

    // Get Function data 
    const Contadd = process.env.REACT_APP_CONTRACT_ADD;

    const data = iface.encodeFunctionData("withdraw(uint256)", [ethers.utils.parseEther(ether)]);

    const tx = await signer.sendTransaction({
      to: Contadd,
      data
    })
    setTxs(tx);
    const receipt = await tx.wait();
    SetReceiptInfoWithdrw(receipt);

  } catch (err) {
    //console.log("chk___",err);
    setError(err.code);
  }
};
//ProveIsAlive funcation call using EtherJs
const GetProveIsAlive
  = async ({ setError, setProveAlive, SetReceiptInfoIsAlive }) => {

    try {
      if (!window.ethereum)
        throw new Error("No crypto wallet found. Please install it.");

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const AccountAdd = await signer.getAddress();
      ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
      const iface = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADD, ABI, signer);
      try {
        //const nextSign = await iface.getNextSignBlock();
        const IsAliveSign = await iface.proveIsAlive();
        setProveAlive(IsAliveSign);
        const receipt = await IsAliveSign.wait();
        SetReceiptInfoIsAlive(receipt);

      } catch (error) {

        // console.log("ERROR AT GETTING USER: ", error);
      }

    } catch (err) {
      setError(err.code);
    }
  };

function AdminDashbord(props) {
  const [ProveAlive, setProveAlive] = useState();
  const rememberMe = localStorage.getItem('Admin');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showWithdr, setWithdr] = useState(false);
  const handleCloseWithdr = () => setWithdr(false);
  const handleShowWithdr = () => setWithdr(true);

  const [showIsAive, setIsAive] = useState(false);
  const handleCloseIsAive = () => setIsAive(false);
  const handleShowIsAive = () => setIsAive(true);

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [BalanceError1, setBalanceError] = useState();
  const [nomBalance, setnomBalance] = useState([]);
  const [isOff, setIsOff] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ReceiptInfo, SetReceiptInfo] = useState([]);
  const [ReceiptInfoWithdrw, SetReceiptInfoWithdrw] = useState([]);
  const [ReceiptInfoIsAlive, SetReceiptInfoIsAlive] = useState([]);

  // Deposit Fund funcation call
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target);
    setError();
    await DepositFund({
      setError,
      setTxs,
      SetReceiptInfo,
      isLoading,
      ether: data.get("ether")
    });

  };
  useEffect(() => {
    if (ReceiptInfo && ReceiptInfo.status == 1) {
      setIsLoading(false);
      toast.success("Deposit Funds successfully!");
      setTimeout(() => {
        props.history.push("/dashboard");
        window.location.reload(false);
      }, 4000);
      
    }

  }, [ReceiptInfo]);
  // Deposit Fund End

  // Withdraw funcation call
  const handleSubmitWithdrw = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.target);
    setError();
    await WithDrawFund({
      setError,
      setTxs,
      SetReceiptInfoWithdrw,
      ether: data.get("ether")
    });
  }
  useEffect(() => {
    if (ReceiptInfoWithdrw && ReceiptInfoWithdrw.status == 1) {
      setIsLoading(false);
      toast.success("WithDraw Funds successfully!");
      setTimeout(() => {
        props.history.push("/dashboard");
        window.location.reload(false);
      }, 4000);
      
    }

  }, [ReceiptInfoWithdrw]);
  // End WithDraw funcation End

  // Get Nominee Blance
  useEffect(async () => {
    setBalanceError();
    await GetNomineeBalance({
      setBalanceError,
      setnomBalance
    });
    //console.log('mount it!');
  }, []);

  // Call IsAlive Funcation
  const SubmitIsAlive = async () => {
    setError();
    setIsLoading(true);
    await GetProveIsAlive({
      setError,
      setProveAlive,
      SetReceiptInfoIsAlive,
    });
  };
  useEffect(() => {
    if (ReceiptInfoIsAlive && ReceiptInfoIsAlive.status == 1) {
      setIsLoading(false);
      toast.success("Prove Liveness is successfully!");
      setTimeout(() => {
        props.history.push("/dashboard");
        window.location.reload(false);
      }, 4000);
      
    }

  }, [ReceiptInfoIsAlive]);

  return (

    <>

      { /*<div className="container adm"> */}
      <div className="adm">
        <div className="mb-3">
          <div className="row" id="main">
            <div id="page-top">
              <div id="wrapper">
                {/*sidebar component*/}
                <SideBarAdmin />
                {/*End sidebar component*/}

                {/*  <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">

                    {/* <!-- Topbar component--> */}
                    <TopBarAdmin />
                    {/*  <!-- End of Topbar --> */}

                    <div className="container-fluid">
                      {/*  <!-- Page Heading --> */}
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

                        {(() => {
                          if (rememberMe == "0xcAA36068E764E01CDeEf74fc23eE4204bd082c2b") {
                            return (
                              // <div><React.Fragment>
                              //   <ToggleSwitch label="Contract Status" />
                              // </React.Fragment></div>
                              <div className="container tg_cls">
                                <h4><span>Contract Status</span> <button onClick={() => setIsOff(!isOff)}>{isOff ? 'Paused' : 'UnPaused'}</button></h4>
                              </div>
                            )
                          } else {
                            return (
                              <GetPausedStatus />

                            )
                          }
                        })()}

                      </div>

                      <div className="col-sm-12 rsp">
                        <div className="row">
                          <div className="col">
                            <div className="adbd">
                              <div className="css-hylz56">
                                <div className="css-1u5jwep">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" focusable="false"
                                    className="chakra-icon css-7zspnv" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                                  </svg>
                                </div>
                                <div className="chakra-stat css-1dd0jam">
                                  <dl>
                                    <dt className="chakra-stat__label css-12rqbe4">Total Balance {props.datad} </dt>
                                    {(() => {
                                      if (window.ethereum.networkVersion == 1) {
                                        return (
                                          <dd className="chakra-stat__number css-bsqw91"><span>ETH</span> {nomBalance}</dd>

                                        )
                                      } else if (window.ethereum.networkVersion == 3) {
                                        return (
                                          <dd className="chakra-stat__number css-bsqw91"><span>ETH</span> {nomBalance}</dd>

                                        )
                                      } else if (window.ethereum.networkVersion == 56) {
                                        return (
                                          <dd className="chakra-stat__number css-bsqw91"><span>BNB</span> {nomBalance}</dd>

                                        )
                                      } else if (window.ethereum.networkVersion == 97) {
                                        return (
                                          <dd className="chakra-stat__number css-bsqw91"><span>tBNB</span> {nomBalance}</dd>

                                        )
                                      } else if (window.ethereum.networkVersion == 80001) {
                                        return (
                                          <dd className="chakra-stat__number css-bsqw91"><span>MATIC</span> {nomBalance}</dd>

                                        )
                                      } else if (window.ethereum.networkVersion == 137) {
                                        return (
                                          <dd className="chakra-stat__number css-bsqw91"><span>MATIC</span> {nomBalance}</dd>

                                        )
                                      } else {

                                      }
                                    })()}
                                    {/* <dd className="chakra-stat__number css-bsqw91">${nomBalance}</dd>
                                    {props.datad} */}
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div>

                          <div className="col">
                            <div className="adbd">
                              < UserDashOne />
                            </div>
                          </div>
                          <div className="col">
                            <div className="adbd">
                              < UserDashTwo />
                            </div>
                          </div>

                        </div>
                      </div>
                      <div className="col-sm-12 rsp mt-4">
                        <div className="row">
                          <div className="col">
                            <div className="popBTNFund">
                              <button className="btn dshTwo" onClick={handleShow}>Deposit Funds</button><br></br>

                            </div>
                          </div>
                          <div className="col">
                            <div className="popBTNFund">

                              <button className="btn dshTwo" onClick={handleShowWithdr}>Withdraw Funds</button>
                            </div>
                          </div>
                          <div className="col">
                            <div className="popBTNFund">
                              <button className="btn dshTwo" onClick={handleShowIsAive}>IsAlive</button>
                            </div>
                          </div>

                        </div>
                      </div>


                      {/* <!-- Content Row --> */}
                    </div>
                  </div>
                  {/* <!-- Footer --> */}
                  <FooterAdmin />
                  {/*<!-- End of Footer --> */}
                </div>

                {/* <!-- End of Content Wrapper --> */}
              </div>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="m-4" onSubmit={handleSubmit}>
                    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                      <div className="col-sm-12 rsp">
                        <div className="row">
                          <div className="col">
                            <label>Amount in ETH</label>

                            <input
                              type="text"
                              name="ether"
                              className="form-control"
                            />

                          </div>
                        </div>
                        <footer className="p-4">
                          {isLoading ? <LoadingSpinner /> : <ErrorMessage message={error} />}
                          <button
                            type="submit"
                            disabled={isLoading} className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                          >
                            Deposit
                          </button>
                          {(() => {
                            if (error && error == "ACTION_REJECTED") {
                              return (
                                <h5 mt-2 className="text-center">User Rejected Transaction</h5>
                              )
                            } else if (error == "INVALID_ARGUMENT") {
                              return (
                                <h5 mt-2 className="text-center">INVALID ARGUMENT</h5>
                              )
                            } else if (error == "UNPREDICTABLE_GAS_LIMIT") {
                              return (
                                <h5 mt-2 className="text-center">Cannot Estimate gas Transaction may fail or may require manual gas limit</h5>
                              )
                            }
                          })()}

                        </footer>
                      </div>

                    </div>
                  </form>
                </Modal.Body>
              </Modal>

              {/* WithDrow Funcation model */}
              <Modal
                show={showWithdr}
                onHide={handleCloseWithdr}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Withdraw Funds</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="m-4" onSubmit={handleSubmitWithdrw}>
                    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                      <div className="col-sm-12 rsp">

                        <div className="row">
                          <div className="col">
                            <label>Amount in ETH</label>

                            <input
                              type="text"
                              name="ether"
                              className="form-control"
                            />

                          </div>
                        </div>
                        <footer className="p-4">
                          {isLoading ? <LoadingSpinner /> : <ErrorMessage message={error} />}
                          <button
                            type="submit"
                            disabled={isLoading} className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                          >
                            Withdraw now
                          </button>
                          {(() => {
                            if (error && error == "ACTION_REJECTED") {
                              return (
                                <h5 mt-2 className="text-center">User Rejected Transaction</h5>
                              )
                            } else if (error == "INVALID_ARGUMENT") {
                              return (
                                <h5 mt-2 className="text-center">INVALID ARGUMENT</h5>
                              )
                            } else if (error == "UNPREDICTABLE_GAS_LIMIT") {
                              return (
                                <h5 mt-2 className="text-center">Cannot Estimate gas Transaction may fail or may require manual gas limit</h5>
                              )
                            }
                          })()}

                        </footer>
                      </div>

                    </div>
                  </form>
                </Modal.Body>
              </Modal>

              <Modal
                show={showIsAive}
                onHide={handleCloseIsAive}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title style={{ color: "#333" }}>Please Sign and Prove Your Liveness</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <GetIsAliveStatus />
                  <footer className="mb-2 text-center">
                    {isLoading ? <LoadingSpinner /> : <ErrorMessage message={error} />}
                    <button
                      onClick={SubmitIsAlive}
                      disabled={isLoading} className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                    >
                      Prove Liveness
                    </button>
                    {(() => {
                      if (error && error == "ACTION_REJECTED") {
                        return (
                          <h5 mt-2 className="text-center">User Rejected Transaction</h5>
                        )
                      } else if (error == "INVALID_ARGUMENT") {
                        return (
                          <h5 mt-2 className="text-center">INVALID ARGUMENT</h5>
                        )
                      } else if (error == "UNPREDICTABLE_GAS_LIMIT") {
                        return (
                          <h5 mt-2 className="text-center">Cannot Estimate gas Transaction may fail or may require manual gas limit</h5>
                        )
                      }
                    })()}

                  </footer>
                </Modal.Body>

              </Modal>


            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default withRouter(AdminDashbord);

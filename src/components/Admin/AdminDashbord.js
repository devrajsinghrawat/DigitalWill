import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
//import axios from "axios";
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

// Payment send funcation
const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

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
    const receipt = await tx.wait();
    console.log("TXTX___", tx);
    console.log("okkk___", receipt);

    setTxs([tx]);

  } catch (err) {
    setError(err.message);
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
    const signer = provider.getSigner();
    
    const AccountAdd = await signer.getAddress();
   // console.log("Account2222:", AccountAdd);
    ethers.utils.getAddress("0x2fe348929abfe45270ab4b0951f220a540f19276");
    const iface = new ethers.Contract("0x2fe348929abfe45270ab4b0951f220a540f19276", ABI, signer);
    try {
      //const userd = await iface.getNominee();
      const userd = await iface.userBalance(AccountAdd);
      console.log("man___bl22",userd); 
      let vr = BigNumber.from(userd._hex);
        let nocov = vr.toString();
        const finalBalance = ethers.utils.formatEther( nocov );
        setnomBalance(finalBalance);

    } catch (error) {

      console.log("ERROR AT GETTING USER: ", error);
    }

  } catch (err) {
    setBalanceError(err.message);
  }
};
function AdminDashbord() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);
  const [BalanceError1, setBalanceError] = useState();
  //const [txsBalance, setTxsBalance] = useState([]);
  const [nomBalance, setnomBalance] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });

  };
  useEffect(async () => {
    setBalanceError();
    await GetNomineeBalance({
      setBalanceError,
      setnomBalance
    });
    //console.log('mount it!');
  }, []);
  console.log("nom__",nomBalance);
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
                        <React.Fragment>
                          <ToggleSwitch label="Contract Status" />
                        </React.Fragment>
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
                                    <dt className="chakra-stat__label css-12rqbe4">Total Balance </dt>

                                    <dd className="chakra-stat__number css-bsqw91">${nomBalance}</dd>
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col">
                            <div className="adbd">
                              <div className="css-hylz56">
                                <div className="css-1u5jwep">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" focusable="false" className="chakra-icon css-7zspnv" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></svg>
                                </div>
                                <div className="chakra-stat css-1dd0jam">
                                  <dl>
                                    <dt className="chakra-stat__label css-12rqbe4">Recived Total</dt>
                                    <dd className="chakra-stat__number css-bsqw91">$3450.4</dd>
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div> */}
                          {/* <div className="col">
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
                                    <dt className="chakra-stat__label css-12rqbe4">Total Blance Send</dt>
                                    <dd className="chakra-stat__number css-bsqw91">$450.4</dd>
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div> */}
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

                              <button className="btn dshTwo">Withdraw Funds</button>
                            </div>
                          </div>
                          <div className="col">
                            <div className="popBTNFund">
                              <button className="btn dshTwo">IsAlive</button>
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
                  <Modal.Title>Deposit Funds</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="m-4" onSubmit={handleSubmit}>
                    <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                      <div className="col-sm-12 rsp">

                        <div className="row">
                          <div className="col">
                            <label>Recipient Address</label>
                            <input
                              type="text"
                              name="addr"
                              className="form-control"
                            />
                          </div>
                        </div>
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
                          <button
                            type="submit"
                            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                          >
                            Pay now
                          </button>
                          <ErrorMessage message={error} />

                        </footer>
                      </div>

                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
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

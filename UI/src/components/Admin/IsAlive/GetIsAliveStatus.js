import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import { ethers } from "ethers";
import ABI from "../abi.json";
import ErrorMessage from "../ErrorMessage";
import { BigNumber, FixedFormat, FixedNumber, formatFixed, parseFixed, BigNumberish } from "@ethersproject/bignumber";
//Get User Blance
const GetCurrentBlockStatus
    = async ({ setError, setContStatus }) => {

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
                const userd = await iface.getCurrentBlock();
                let vr = BigNumber.from(userd._hex);
                let nocov = vr.toString();
                setContStatus(nocov);

            } catch (error) {

               // console.log("ERROR AT GETTING USER: ", error);
            }

        } catch (err) {
            setError(err.message);
        }
    };
// NextSign Block number
const GetNextSignBlockStatus
    = async ({ setError, setNextSign }) => {

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
               const nextSign = await iface.getNextSignBlock();
                let vr = BigNumber.from(nextSign._hex);
                let nocov = vr.toString();
                setNextSign(nocov);

            } catch (error) {

                //console.log("ERROR AT GETTING USER: ", error);
            }

        } catch (err) {
            setError(err.message);
        }
    };
// NextSign Block number
const GetLastSignBlockStatus
    = async ({ setError, setLastSign }) => {

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
                const LastSign = await iface.lastSignedBlockNumber(AccountAdd);

                let vr = BigNumber.from(LastSign._hex);
                let nocov = vr.toString();
                setLastSign(nocov);

            } catch (error) {

               // console.log("ERROR AT GETTING USER: ", error);
            }

        } catch (err) {
            setError(err.message);
        }
    };

function GetIsAliveStatus() {

    const [error, setError] = useState();
    const [ContSts, setContStatus] = useState();
    const [NextSign, setNextSign] = useState();
    const [LastSign, setLastSign] = useState();
    

    useEffect(async () => {
        setError();
        await GetCurrentBlockStatus({
            setError,
            setContStatus
        });
    }, []);
    useEffect(async () => {
        setError();
        await GetNextSignBlockStatus({
            setError,
            setNextSign
        });
    }, []);
    useEffect(async () => {
        setError();
        await GetLastSignBlockStatus({
            setError,
            setLastSign
        });
    }, []);

    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <form className="m-4">
                        <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
                            <div className="col-sm-12 rsp text-center">

                                <div className="row p-4">
                                    <div className="col">
                                    <h6 style={{color: "#333"}}> <label><b> Last Signed Block Number :</b> {LastSign}</label><br></br></h6>
                                        <h6 style={{color: "#333"}}><label><b>Current Block Number :</b> {ContSts}</label><br></br></h6>
                                        <h6 style={{color: "#333"}}> <label><b> Next Signed Block Number :</b> {NextSign}</label><br></br></h6>
                                        
                                        
                                    </div>
                                </div>

                            </div>

                        </div>
                    </form>
                    <div className="container-fluid">
                        {/*  <!-- Page Heading --> */}


                    </div>
                </div>

            </div>
        </>
    )
}
export default withRouter(GetIsAliveStatus);

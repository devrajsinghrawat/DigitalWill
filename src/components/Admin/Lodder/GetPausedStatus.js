import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import { ethers } from "ethers";
import ABI from "../abi.json";

//Get User Blance
const GetContractStatus
    = async ({ setError, setContStatus }) => {

        try {
            if (!window.ethereum)
                throw new Error("No crypto wallet found. Please install it.");

            await window.ethereum.send("eth_requestAccounts");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const AccountAdd = await signer.getAddress();
            ethers.utils.getAddress("0xd104fD11eAA70f0092bf449e0963FC21C070ED82");
            const iface = new ethers.Contract("0xd104fD11eAA70f0092bf449e0963FC21C070ED82", ABI, signer);
            try {
                const userd = await iface.paused();
                setContStatus(userd);

            } catch (error) {

                console.log("ERROR AT GETTING USER: ", error);
            }

        } catch (err) {
            setError(err.message);
        }
    };
function GetPausedStatus() {

    const [Error, setError] = useState();
    const [ContSts, setContStatus] = useState();

    useEffect(async () => {
        setError();
        await GetContractStatus({
            setError,
            setContStatus
        });
    }, []);
console.log("stst__",ContSts);
    return (
        <>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">

                    <div className="container-fluid">
                        {/*  <!-- Page Heading --> */}

                        {(() => {
                            if (ContSts == false) {
                                return (
                                    <div className="container tg_cls">
                                        <h4><span>Contract Status</span> <button className="BtnUnpus" disabled={true}>UnPaused</button></h4>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="container tg_cls">
                                        <h4><span>Contract Status</span> <button className="BtnPus" disabled={true}>Paused</button></h4>
                                    </div>
                                )
                            }
                        })()}

                    </div>
                </div>

            </div>
        </>
    )
}
export default withRouter(GetPausedStatus);

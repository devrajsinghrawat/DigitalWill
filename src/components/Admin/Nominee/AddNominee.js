import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "../FooterAdmin";
import TopBarAdmin from "../TopBarAdmin";
import SideBarAdmin from "../SideBarAdmin";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";
import ABI from "../abi.json";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../Lodder/LoadingSpinner";
const AddNomineeData = async ({ setError, setTxs, SetReceiptInfo, NomineePublicKey, Percentage,isLoading }) => {
    try {
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        ethers.utils.getAddress(NomineePublicKey);
        // Get Interface
        const iface = new ethers.utils.Interface(ABI);
        const data = iface.encodeFunctionData("addNominee(address,uint256)", [NomineePublicKey, Percentage]);
        const tx = await signer.sendTransaction({
            to: "0xd104fD11eAA70f0092bf449e0963FC21C070ED82",
            data
        });
       // console.log("tx________",tx,isLoading);
        const receipt = await tx.wait();
       // console.log("receipt_____",receipt,isLoading);
        
        setTxs(tx);
        SetReceiptInfo(receipt);


    } catch (err) {
        setError(err.message);
    }
};

function AddNominee(props) {
    const UserKey = localStorage.getItem("id");
    const [error, setError] = useState();
    const [txs, setTxs] = useState([]);
    const [ReceiptInfo, SetReceiptInfo] = useState([]);
    const [user, setUser] = useState({
        UserPublicKey: UserKey,
        NomineePublicKey: "",
        NomineeEmailId: "",
        NomineeMobileNumber: "",
        Percentage: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const handleChange = e => {
        // console.log("form_data",e);
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       
        const data = new FormData(e.target);
        setError();
        await AddNomineeData({
            setError,
            setTxs,
            SetReceiptInfo,
            isLoading,
            NomineePublicKey: data.get("NomineePublicKey"),
            Percentage: data.get("Percentage")
        });
        setIsLoading(true);
        setFormErrors(validate(user));
        setIsSubmit(true);
        
    }
    useEffect(() => {
   if(ReceiptInfo && ReceiptInfo.status == 1){
    const { UserPublicKey, NomineePublicKey, NomineeEmailId, NomineeMobileNumber, Percentage } = user
        if (UserPublicKey && NomineePublicKey && Percentage) {
            // axios.post("http://localhost:3001/AddNominee", user)
            //     .then(res => {
            //         setIsLoading(false);
            //         toast.success("Nominee Added successfully!");
            //         setTimeout(() => {
            //             props.history.push("/addNominee");
            //         }, 3000);

            //     }).catch(err => {
            //         console.log('There was an error!', err.response.data.message);
            //         // this.setState({ errorMessage: error.message });
            //         toast.error(err.response.data.message, {
            //             autoClose: 4000,
            //             hideProgressBar: false,
            //             closeOnClick: true,
            //             pauseOnHover: true,
            //             draggable: true,
            //             progress: undefined,
            //         });
            //         //console.log('There was an error!', err);
            //     });
        } else {
            toast.error("Invlid Input", {
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
   }
    },[ReceiptInfo]);
  
    //console.log("txs_____mandeep", txs);
    //console.log("receipt_____2222",ReceiptInfo);
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {

        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};

        if (!values.NomineePublicKey) {
            errors.NomineePublicKey = "Nominee Public Key is required!";
        }
        if (!values.Percentage) {
            errors.Percentage = "Percentage is required!";
        } return errors;
    }



    return (
        <>
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
                                                <h1 className="h3 mb-0 text-gray-800">Add Nominee</h1>

                                            </div>
                                            <form className="m-4" onSubmit={handleSubmit} disabled={isLoading}>

                                                <div className="compny">
                                                    {/* <!-- Content Row --> */}
                                                    <h5>Nominee Detalis</h5>
                                                    <div className="col-sm-6 rsp">

                                                        <div className="row">
                                                            <div className="col">
                                                                <label> Nominee Public Key</label>
                                                                <input type="text" className="form-control" name="NomineePublicKey"
                                                                    value={user.NomineePublicKey} onChange={handleChange} placeholder="" ></input>
                                                                <p className="erromsg">{formErrors.NomineePublicKey}</p>

                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <label>Nominee Email ID</label>
                                                                <input type="text" className="form-control" name="NomineeEmailId"
                                                                    value={user.NomineeEmailId} onChange={handleChange} placeholder="" ></input>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <label>Nominee Mobile Number</label>
                                                                <input type="text" className="form-control" name="NomineeMobileNumber" value={user.NomineeMobileNumber} onChange={handleChange} placeholder=""></input>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col">
                                                                <label>Percentage</label>
                                                                <input type="text" className="form-control" name="Percentage" value={user.Percentage} onChange={handleChange} placeholder=""></input>
                                                                <p className="erromsg">{formErrors.Percentage}</p>

                                                            </div>
                                                        </div>
                                                        <div className="col-sm mt-2">
                                                            {/* <div className="button2" ><button type="button" className="btn btn-primary" onClick={AdNominee}>Submit</button></div> */}
                                                            {isLoading ? <LoadingSpinner /> : <ErrorMessage message={error} />}
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
                                                            >
                                                                Submit
                                                            </button>

                                                        </div>

                                                        <ErrorMessage message={error} />
                                                    </div>
                                                    {/* Content Row End*/}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    {/* <!-- Footer --> */}
                                    <FooterAdmin />
                                    {/*<!-- End of Footer --> */}
                                </div>

                                {/* <!-- End of Content Wrapper --> */}
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default withRouter(AddNominee);

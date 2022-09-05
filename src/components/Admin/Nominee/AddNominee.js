import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "../FooterAdmin";
import TopBarAdmin from "../TopBarAdmin";
import SideBarAdmin from "../SideBarAdmin";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AddNominee(props) {
    localStorage.setItem("UserPublicKey", "0xF2379d114d065c54d9C49dB8bB3a4035550c4e71")
   // const OwnerId = localStorage.getItem("id");
    const UserKey = localStorage.getItem("UserPublicKey");
   

    const [user, setUser] = useState({
        UserPublicKey: UserKey,
        NomineePublicKey: "",
        NomineeEmailId: "",
        NomineeMobileNumber: "",
        Percentage: "",
    })
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

    const AdNominee = (e) => {
        e.preventDefault();
        setFormErrors(validate(user));
        setIsSubmit(true);
        const { UserPublicKey, NomineePublicKey, NomineeEmailId, NomineeMobileNumber, Percentage } = user
        if (UserPublicKey && NomineePublicKey && NomineeEmailId && NomineeMobileNumber && Percentage) {
            axios.post("http://localhost:3001/AddNominee", user)
                .then(res => {
                    console.log("Add_Jobs_____", res);
                    toast.success("Nominee Added successfully!", {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    // setTimeout(() => {
                    //     props.history.push("/candidatesList");
                    // }, 2000);

                }).catch(err => {
                    console.log('There was an error!', err.response.data.message);
                    // this.setState({ errorMessage: error.message });
                    toast.error(err.response.data.message, {
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    //console.log('There was an error!', err);
                });
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
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {

        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};

        if (!values.NomineeEmailId) {
            errors.NomineeEmailId = "Nominee Email Id is required!";
        }
        if (!values.NomineeMobileNumber) {
            errors.NomineeMobileNumber = "Nominee Mobile Number is required!";
        }
        if(!values.NomineePublicKey){
            errors.NomineePublicKey = "Nominee Public Key is required!";
        }
        if (!values.Percentage) {
            errors.Percentage = "Percentage is required!";
        }
        

        return errors;
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
                                                            <p className="erromsg">{formErrors.NomineeEmailId}</p>
                                                        </div>


                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Nominee Mobile Number</label>
                                                            <input type="tel" className="form-control" name="NomineeMobileNumber" value={user.NomineeMobileNumber} onChange={handleChange} placeholder=""></input>
                                                            <p className="erromsg">{formErrors.NomineeMobileNumber}</p>

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <label>Percentage</label>
                                                            <input type="number" className="form-control" name="Percentage" value={user.Percentage} onChange={handleChange} placeholder=""></input>
                                                            <p className="erromsg">{formErrors.Percentage}</p>

                                                        </div>
                                                    </div>
                                                    <div className="col-sm">
                                                        <div className="button2" ><button type="button" className="btn btn-primary" onClick={AdNominee}>Submit</button></div>
                                                    </div>

                                                </div>
                                                {/* Content Row End*/}
                                            </div>
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

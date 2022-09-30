import React, { useState } from "react"
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import axios from "axios";
//import swal from 'sweetalert';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img_icon from './../infoDrive_background.png';
//import { useHistory } from "react-router-dom"

export default function ForgetPassword() {
    const [ user, setUser] = useState({
        email: ""
    })
       
    const handleChange = e => {
       // console.log("form_data",e);
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        });
    }
    const ForgetPassword = () => {
    
        const { email } = user
        if( email ){
            axios.post("http://localhost:3001/ForgetPwdSendEmail", user)
            .then( res => {
                //console.log("Email_send",res);
                toast.success(res.data.payload, {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
            }).catch(err => {
                //console.log('There was an error!', err.response.data.message);
               // this.setState({ errorMessage: error.message });
               toast.error(err.response.data.message, {
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
               });
            
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
            
            //alert("invlid input")
        }
        
    }
    const myStyle={
        backgroundImage:`url(${img_icon})`,
                height:'108vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                };
    
    return (
        <>
        <div className="container-flui" style={myStyle}>
            <div className="container log_top">
                <div className="mb-3">
                    <div className="row lng" id="main">
                        <div className="col-5 side">
                            <Sidebar /> 
                        </div>
                        <div className="col-7">
                            <div className="login fgpt">
            
                                
                                <h5>Forgot your password?</h5>
                                <span>Enter your email address below and we'll get you back on track</span>
                                
                                <input type="text" name="email"  placeholder="Enter Your Email"  value={user.email} onChange={ handleChange } />
                                <div className="row lbm">
                                    <div className="col-sm">
                                    <div className="button2 res" ><button type="button" className="btn btn-primary" onClick={ ForgetPassword }>Request Password</button></div>
                                    
                                    </div>
                                    <div className="col-sm">
                                    <div className="button_cnl" ><button type="button" className="btn btn-light"><Link to="/signin">Cancel </Link></button></div>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}

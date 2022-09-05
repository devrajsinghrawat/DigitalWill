import React, { useEffect, useState } from "react";
import axios from "axios"
import Sidebar from './Sidebar';
import { Link } from "react-router-dom";
import {isEmail, isEmpty, isStrongPassword} from "validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory  } from "react-router-dom";
import img_icon from './../infoDrive_background.png';
export default function Login({setLoginUser}) {
   
    const navigate = useHistory ()
    const [state, setState]= useState({
        email:"",
        password:""
    })

    const [errors, setErrors]= useState({
        email:""
    })
   

    useEffect(()=>{})

    const _handleChange=(e)=>{
        const {name, value}= e.target;
        const Errors= {...errors}
       
        switch (name) {
            case "email":{
                if(isEmpty(value)){
                    Errors[name]= "Required"
                }else if(!isEmail(value)){
                    Errors[name]= "Invalid Email"
                }else{
                    Errors[name]= ""
                }
                break;
            }    
            
        }
        setErrors({...Errors})
        setState((pre)=>({
            ...pre,
            [name]:value
        }))
    }
    const loginbtn = () => {
        
         //toast("Wow so easy!");
        const {  email, password } = state
        if( email && password ){
            axios.post("http://localhost:3001/loginUser", state)
            .then( res => { 
                    const {status, message, payload}= res.data;
                    
                    if(!status){
                
                    toast.error(message, {
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                     return;
                    }
                    toast.success('Login!', {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    
                    /*swal({
                        title: "Success",
                        text: message,
                        type: "success"
                    })*/
                    localStorage.setItem("id", payload[0].UserId)
                    localStorage.setItem("EmailId", payload[0].EmailId)
                    localStorage.setItem("FirstName", payload[0].FirstName)
                    localStorage.setItem("UserRole", payload[0].UserRoleId)
               
                     navigate.push('/dashboard')

            }).catch(err=>{
                //console.log("okkkk_____",err);
                toast.error(err.response.data.message, {
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
            })
        } else {
            toast.error('Invlid Input', {
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          
        }
        
    }
    const myStyle={
        backgroundImage:`url(${img_icon})`,
                height:'108vh',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                };

    //console.log(state, errors, "oooppp")

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
                    <div className="login">
                        { /*console.log("User", user) */}
                        
                        <h5>Login to InfoDrive CRM</h5>
                        <span>Enter your details below</span>
                        
                        <input type="text" name="email"  placeholder="Enter Your Email" value={state.email} onChange={_handleChange} />
                        {
                            errors.email.length > 0 && errors.email
                        }
                        <input type="password" name="password"  placeholder="Enter Your Password" value={state.password} onChange={_handleChange}/>

                        <div className="row lbm">
                            <div className="col-sm">
                            <div className="button2" ><Link to="/forget-password">Forgot Password?</Link></div>
                            </div>
                            <div className="col-sm">
                           
                            </div>
                            <div className="col-sm">
                            <div className="button2" ><button type="button" className="btn btn-primary" onClick={loginbtn} >Login</button></div>
                            
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

import React, { useState } from "react"
import axios from "axios"
import Sidebar from './Sidebar';
import swal from 'sweetalert';  
import {useLocation} from "react-router-dom";
//import { Link } from "react-router-dom";
//import { useHistory } from "react-router-dom"

export default function UpdatePassword() {
  const search = useLocation().search;
  const eml = new URLSearchParams(search).get('eml');
  //const eml = new URLSearchParams(location.search).get("eml");
  alert(eml);
  const [ user, setUser] = useState({
    email: eml,
    password:""
})

const handleChange = e => {
    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
    });
}

const updtPassword = () => {
    
    const { email, password } = user
    if( email && password){
        axios.post("http://localhost:3001/setForgotPassword", user)
        .then( res => {
            swal({
                title: "success",
                text: "Password Updated successfully !",
                type: "success"
            }).then(function() {
                window.location = "/signin"
            });
            
        }).catch(err => {
            //console.log('There was an error!', err.response.data.message);
           // this.setState({ errorMessage: error.message });
           swal({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            button: "Ok",
          });
           // console.log('There was an error!', err);
        });
    } else {
        swal({
            title: "error",
            text: "Invlid Input",
            icon: "error",
            button: "Ok",
          });
        //alert("invlid input")
    }
}
    return (
        <>
        <div className="container ">
        <div className="mb-3">
            <div className="row" id="main">
                <div className="col-4 side">
                     <Sidebar /> 
                </div>
                <div className="col-8">

                    <div className="container-fluid updpass">
                        {/*  <!-- Page Heading --> */}
                        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Update Password</h1>
                                
                        </div>
                            {/* <!-- Content Row --> */}
                            <div className="col-sm-10 rsp offset-3"> 
                                <input type="hidden" className="form-control" placeholder="Current Password" name="email" value={eml} onChange={ handleChange } ></input> 
                                <label>New Password</label>
                                <div className="form-group pass_show"> 
                                    <input type="password" className="form-control" placeholder="New Password" name="password" value={user.currentpassword} onChange={ handleChange }></input> 
                                </div> 
                                <label>Confirm Password</label>
                                <div className="form-group pass_show"> 
                                    <input type="password" className="form-control" placeholder="Confirm Password"></input> 
                                </div> 
                                <div className="col-sm">
                                    <div className="button2" ><button type="button" className="btn btn-primary" onClick={ updtPassword }>Submit</button></div>
                                    </div>
                                
                            </div>  
                            {/* Content Row End*/}
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
        
        </>
    )
}

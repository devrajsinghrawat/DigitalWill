import React, { useState } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import swal from 'sweetalert';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation} from "react-router-dom";


 function ResetPassword(props) {
  // const history = useHistory()

  const gtemial = localStorage.getItem('EmailId');
  
  const  rpgtm = gtemial.replace(/['"]+/g, '');
  const [ user, setUser] = useState({
    email: rpgtm,
    password:"",
    currentpassword:""
})
   
const handleChange = e => {
    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
    });
}

const CngPassword = () => {
    
    const { email, password, currentpassword } = user
    if( email && password && currentpassword){
        axios.post("http://localhost:3001/changePwd", user)
        .then( res => {
            toast.success(res.data.payload, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                props.history.push("/resetpassword");
            }, 4000);
           
            
        }).catch(err => {
           // console.log('There was an error!', err.response.data.message);
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
    return (
        <>
       { /*<div className="container adm"> */ }
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
                                                <h1 className="h3 mb-0 text-gray-800">Reset Password</h1>
                                                
                                        </div>
                                         {/* <!-- Content Row --> */}
                                            <div className="col-sm-6 rsp offset-3">
                                            {/* { console.log("User", user) } */}
                                                <label>Current Password</label>
                                                <div className="form-group pass_show"> 
                                                <input type="hidden" className="form-control" placeholder="Current Password" name="email" value={rpgtm} onChange={ handleChange } ></input> 
                                                    <input type="password" className="form-control" placeholder="Current Password" name="currentpassword" value={user.currentpassword} onChange={ handleChange } ></input> 
                                                </div> 
                                                <label>New Password</label>
                                                <div className="form-group pass_show"> 
                                                    <input type="password" className="form-control" placeholder="New Password" name="password" value={user.password} onChange={ handleChange } ></input> 
                                                </div> 
                                                {/*<label>Confirm Password</label>
                                                 <div className="form-group pass_show"> 
                                                    <input type="password" className="form-control" placeholder="Confirm Password" name="confpassword" value={user.confpassword} onChange={ handleChange } ></input> 
                                                </div> */} 
                                                <div className="col-sm">
                                                    <div className="button2" ><button type="button"  className="btn btn-primary" onClick={ CngPassword }>Submit</button></div>
                                                 </div>
                                                
                                            </div>  
                                         {/* Content Row End*/}
                                        
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
export default withRouter(ResetPassword);
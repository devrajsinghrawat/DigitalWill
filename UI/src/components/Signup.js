import React, { useState } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import Sidebar from './Sidebar';
import swal from 'sweetalert';  
import {useLocation} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img_icon from './../infoDrive_background.png';


 function Signup(props) {
    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    let inv = '';

    if(code !='' && code != null){
         inv = "invite";
    }else{
        inv = "";
    }
   // const history = useHistory()
    
   const [ user, setUser] = useState({
    language:"",
    name: "",
    email:"",
    password:"",
    invite:inv
    
})
    const handleChange = e => {
       
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        });
    }

    const register = () => {
        
        const { name, email, password,invite,language } = user
        if( name && email && password  && language ){
            axios.post("http://localhost:3001/addUser", user)
            .then( res => {
              
                toast.success("Data inserted successfully !!", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    props.history.push("/signin");
                }, 4000);
        
                
            }).catch(err => {
              //  console.log('There was an error!', err.response.data.message);
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
                    <div className="log">Already have an Account? <Link to="/signin">Login</Link> </div>
                   
                    <div className="register">
                        <h5>Get started absolutely free </h5>
                        <span>No Creadit card needed</span>

                        
                        <select className="form-select" name="language" onChange={ handleChange }>
                            <option >Select your application language</option>
                            <option value="English" >English </option>
                            <option value="Spanish">Spanish </option>
                            <option value="French">French </option>
                            <option value="Russian">Russian </option>
                        </select>
                        <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
                        <input type="email" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange } ></input>
                        <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange } ></input>
                        <input type="hidden" className="form-control" name="invite" value={inv} onChange={ handleChange } ></input>
                        
                            {code ? (<>
                                 
                                <div className="button2" ><button type="button" className="btn btn-primary" onClick={register} >Join InfoDrive Solutions Pte.Ltd.</button></div>
                            <p>By clicking on "Join InfoDrive Solutions Pte.Ltd" I agree to Recruit CRM's <Link to="#">Terms of Services </Link> and <Link to="#">Privacy Policy</Link> </p>
                            </>) : (
                            <>
                            <div className="button2" ><button type="button" className="btn btn-primary" onClick={register} >Sign Up</button></div>
                            <p>By clicking on "Sign Up" I agree to Recruit CRM's <Link to="#">Terms of Services </Link> and <Link to="#">Privacy Policy</Link> </p> 
                            
                            </>)}

                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
       < ToastContainer />
        </>
    )
}
export default withRouter(Signup);
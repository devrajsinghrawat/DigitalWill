import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "../FooterAdmin";
import TopBarAdmin from "../TopBarAdmin";
import SideBarAdmin from "../SideBarAdmin";
import swal from 'sweetalert';  
import {useLocation} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 function AddCandidates(props) {
  const OwnerId = localStorage.getItem("id");
  const [ user, setUser] = useState({
    OwnerId: OwnerId,
    FirstName:"",
    LastName:"",
    Email:"",
    Phone:"",
    City:"",
    Locality:"",
    FullAddress:"",
    WillingToRelocate:"",
    Qualification:"",
    Specialization:"",
    CurrentOrganization:"",
    Title:"",
    TotalExperience:"",
    RelevantExperience:"",
    SalaryType:"",
    CurrencyType:"",
    CurrentSalary:"",
    SalaryExpectation:"",
    CurrentEmploymentStatus:"",
    NoticePeriod:"",
    AvailableFrom:"",
    Resume:"",
    Skills:"",
    LanguageSkills:"",
    ProficiencyLevel:"",
    FacebookURL:"",
    TwitterURL:"",
    LinkedInURL:"",
    GitHubURL:"",
    Source:""
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
//file upload code start
var Resume = "";
const fileUpload = (e) => {
  const fl = e.target.files[0];
  const formData = new FormData();
  formData.append("file", fl);
  if (formData != "") {
    axios
      .post("http://localhost:3001/candidateApplicationResume", formData)
      .then((res) => {
        const msg = res.data.payload;
        Resume = "http://localhost:3001/uploads/Candidate/Resume/"+msg;
        setUser( p =>({...p, Resume:Resume}))
        
      })
      .catch((err) => {
        console.log("There was an error!", err);
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
};
// End img code here!

const AdJob = (e) => {
    e.preventDefault();
    setFormErrors(validate(user));
    setIsSubmit(true);
    const { OwnerId, FirstName, LastName, Email,Phone,City,Locality,FullAddress,WillingToRelocate,Qualification,Specialization,CurrentOrganization,Title,TotalExperience,RelevantExperience,SalaryType,CurrencyType,CurrentSalary,SalaryExpectation,CurrentEmploymentStatus,NoticePeriod,AvailableFrom,Resume,Skills,LanguageSkills,ProficiencyLevel,FacebookURL,TwitterURL,LinkedInURL,GitHubURL,Source } = user
    if( FirstName && LastName && Email && Phone && City && FullAddress && WillingToRelocate && TotalExperience && RelevantExperience && CurrentSalary && SalaryExpectation && CurrentEmploymentStatus && NoticePeriod){
        axios.post("http://localhost:3001/addCandidate", user)
        .then( res => {
            console.log("Add_Jobs_____",res);
            toast.success("Candidates Added successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                props.history.push("/candidatesList");
            }, 2000);
            
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
  const validate =(values)=>{
    const errors = {};
    if (!values.FirstName) {
        errors.FirstName = "First Name is required!";
      }
    if (!values.LastName) {
      errors.LastName = "Last Name is required!";
    }
    if (!values.Email) {
      errors.Email = "Email Id is required!";
    }
    if (!values.Phone) {
      errors.Phone = "Phone Number is required!";
    }
    if (!values.City) {
      errors.City = "City is required!";
    }
    if (!values.FullAddress) {
      errors.FullAddress = "Full Address is required!";
    }
    if (!values.WillingToRelocate) {
      errors.WillingToRelocate = "Willing To Relocate is required!";
    }
    if (!values.TotalExperience) {
        errors.TotalExperience = "Total Experience is required!";
    }
    if (!values.RelevantExperience) {
    errors.RelevantExperience = "Relevant Experience is required!";
    }
    if (!values.CurrentSalary) {
    errors.CurrentSalary = "Current Salary is required!";
    }
    if (!values.SalaryExpectation) {
    errors.SalaryExpectation = "Salary Expectation is required!";
    }
    if (!values.CurrentEmploymentStatus) {
    errors.CurrentEmploymentStatus = "Current Employment Status is required!";
    }
    if (!values.NoticePeriod) {
    errors.NoticePeriod = "Notice Period is required!";
    }
    if (!values.file) {
    errors.file = "Resume is required!";
    }
      
    return errors;
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
                                                <h1 className="h3 mb-0 text-gray-800">Add Candidate</h1>
                                                
                                        </div>
                                        <div className="compny">
                                            {/* <!-- Content Row --> */}
                                            <h5>Candidate Detalis</h5>
                                            <div className="col-sm-9 rsp">

                                            { console.log("User___CANDIDATE", user) }
                                            <div className="row">
                                                <div className="col">
                                                    <label>First Name</label>
                                                    <input type="text" className="form-control" name="FirstName"
                                                    value={user.FirstName} onChange={ handleChange } placeholder="" ></input>
                                                     <p className="erromsg">{formErrors.FirstName}</p>
                                                </div>
                                                <div className="col">
                                                    <label>Last Name</label>
                                                    <input type="text" className="form-control" name="LastName" value={user.LastName} onChange={ handleChange } placeholder="" ></input>
                                                    <p className="erromsg">{formErrors.LastName}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label>Email</label>
                                                    <input type="text" className="form-control" name="Email" value={user.Email} onChange={ handleChange } placeholder=""></input>
                                                    <p className="erromsg">{formErrors.Email}</p>
                                                    
                                                </div>
                                                <div className="col">
                                                    <label>Phone</label>
                                                    <input type="text" className="form-control" name="Phone" value={user.Phone} onChange={ handleChange } placeholder="" ></input>
                                                    <p className="erromsg">{formErrors.Phone}</p>
                                                
                                                </div>
                                            </div>
											
											<div className="row">
                                                <div className="col">
                                                    <label>City</label>
                                                    <input type="text" className="form-control" name="City" value={user.City} onChange={ handleChange } placeholder=""></input>
                                                    <p className="erromsg">{formErrors.City}</p>
                                                    
                                                </div>
                                                <div className="col">
                                                    <label>Locality </label>
                                                    <input type="text" className="form-control" name="Locality" value={user.Locality} onChange={ handleChange } placeholder="" ></input>
                                                
                                                </div>
                                            </div>
                                            <div className="row pd">
                                            <label>Full Address </label>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" name="FullAddress" value={user.FullAddress} onChange={ handleChange } placeholder="" rows="3" ></textarea>
                                            <p className="erromsg">{formErrors.FullAddress}</p>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                <label>Willing To Relocate</label>
                                                <p className="erromsg">{formErrors.WillingToRelocate}</p>
                                                    <div className="chk_tn" onChange={ handleChange }>
                                                        <input type="radio" value="1" name="WillingToRelocate"  /> Yes
                                                        <input type="radio" value="0" name="WillingToRelocate" id="chk2" /> No
                                                        
                                                    </div>
                                                   
                                                    {/* <label>Willing To Relocate</label>
                                                    <input type="text" className="form-control" name="WillingToRelocate" value={user.WillingToRelocate} onChange={ handleChange } placeholder=""></input> */}
                                                    
                                                </div>
                                               
                                                <div className="col">
                                                    <label>Qualification</label>
                                                    <input type="text" className="form-control" name="Qualification" value={user.Qualification} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="col-sm">
                                                    <label>Specialization</label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" name="Specialization" value={user.Specialization} onChange={ handleChange } placeholder="" rows="3" ></textarea>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Current Organization</label>
                                                         <textarea className="form-control" id="exampleFormControlTextarea1" name="CurrentOrganization" value={user.CurrentOrganization} onChange={ handleChange } placeholder="" rows="3" ></textarea>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Title</label>
                                                        <input type="text" className="form-control" name="Title" value={user.Title} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                            </div>
                                            <div className="row ft">
                                                <div className="col">
                                                    <label>Total Experience</label>
                                                    <input type="text" className="form-control" name="TotalExperience" value={user.TotalExperience} onChange={ handleChange } placeholder=""></input>
                                                    <p className="erromsg">{formErrors.TotalExperience}</p>
                                                    
                                                </div>
                                                <div className="col">
                                                    <label>Relevant Experience</label>
                                                    <input type="text" className="form-control" name="RelevantExperience" value={user.RelevantExperience} onChange={ handleChange } placeholder="" ></input>
                                                    <p className="erromsg">{formErrors.RelevantExperience}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="col-sm">
                                                     <label>Salary Type</label>
                                                        <input type="text" className="form-control" name="SalaryType" value={user.SalaryType} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Currency Type</label>
                                                        <input type="text" className="form-control" name="CurrencyType" value={user.CurrencyType} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Current Salary</label>
                                                        <input type="text" className="form-control" name="CurrentSalary" value={user.CurrentSalary} onChange={ handleChange } placeholder="" ></input>
                                                        <p className="erromsg">{formErrors.CurrentSalary}</p>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Salary Expectation</label>
                                                        <input type="text" className="form-control" name="SalaryExpectation" value={user.SalaryExpectation} onChange={ handleChange } placeholder="" ></input>
                                                        <p className="erromsg">{formErrors.SalaryExpectation}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label>Current Employment Status</label>
                                                    <input type="text" className="form-control" name="CurrentEmploymentStatus" value={user.CurrentEmploymentStatus} onChange={ handleChange } placeholder=""></input>
                                                    <p className="erromsg">{formErrors.CurrentEmploymentStatus}</p>
                                                    
                                                </div>
                                                <div className="col">
                                                    <label>Notice Period</label>
                                                    <input type="text" className="form-control" name="NoticePeriod" value={user.NoticePeriod} onChange={ handleChange } placeholder="" ></input>
                                                    <p className="erromsg">{formErrors.NoticePeriod}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <label>Available From</label>
                                                    <input type="text" className="form-control" name="AvailableFrom" value={user.AvailableFrom} onChange={ handleChange } placeholder=""></input>
                                                    
                                                </div>
                                                <div className="col">
                                                    <label>Resume</label>
                                                    <input type="file" className="form-control" onChange={ fileUpload } placeholder="" ></input>
                                                    <p className="erromsg">{formErrors.file}</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="col-sm">
                                                    <label>Skills</label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea1" name="Skills" value={user.Skills} onChange={ handleChange } placeholder="" rows="3" ></textarea>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Language Skills</label>
                                                         <textarea className="form-control" id="exampleFormControlTextarea1" name="LanguageSkills" value={user.LanguageSkills} onChange={ handleChange } placeholder="" rows="3" ></textarea>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Proficiency Level</label>
                                                    <textarea className="form-control" id="exampleFormControlTextarea1" name="ProficiencyLevel" value={user.ProficiencyLevel} onChange={ handleChange } placeholder="" rows="3" ></textarea>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="col-sm">
                                                    <label>Facebook URL</label>
                                                        <input type="text" className="form-control" name="FacebookURL" value={user.FacebookURL} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Twitter URL</label>
                                                        <input type="text" className="form-control" name="TwitterURL" value={user.TwitterURL} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                                <div class="col-sm">
                                                    <label>LinkedIn URL</label>
                                                        <input type="text" className="form-control" name="LinkedInURL" value={user.LinkedInURL} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div class="col-sm">
                                                    <label>GitHub URL</label>
                                                        <input type="text" className="form-control" name="GitHubURL" value={user.GitHubURL} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                                <div class="col-sm">
                                                    <label>Source</label>
                                                        <input type="text" className="form-control" name="Source" value={user.Source} onChange={ handleChange } placeholder="" ></input>
                                                </div>
                                            </div>
                                            

                                            <div className="col-sm">
                                                <div className="button2" ><button type="button"  className="btn btn-primary" onClick={ AdJob }>Submit</button></div>
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
export default withRouter(AddCandidates);

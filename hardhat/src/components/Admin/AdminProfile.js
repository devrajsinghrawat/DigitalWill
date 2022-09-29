import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Email } from "@material-ui/icons";

export default function AdminProfile() {
  
   const UserName = localStorage.getItem("FirstName");
   const UserEmail = localStorage.getItem("EmailId");
 
 
  return (
    <>

      {/*<div className="container adm"> */}
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
                        <h1 className="h3 mb-0 text-gray-800"></h1>
                      </div>
                      <div className="container">
                        
                      </div>

                      <div className="compny candiInfo">
                        <div className="container">
                          {/* <!-- Content Row --> */}
                          <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="media job-details-page-avatar">
                                            <div className="media-left">
                                                <div className="job-text-avatar bg-job">
                                                
                                                <i className="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <div className="media-body details-page-media-body-inline-content">
                                                <div className="d-flex align-items-center">
                                                    <div className="inline-edit" data-hideuntilload="true">
                                                        <p><h2 id="sTest-jdJobNameTxt">{UserName}</h2> 
                                                        </p> 
                                                        <p id="sTest-jdJobNameTxt"><b>Email ID : {UserEmail}</b></p>
                                                    </div> 
                                                </div> 
                                                <div className="media-body-sub-text p-l-10">
                                               
                                                   
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                       

                                    </div>
                                    
                                </div>
                            </div>
                         
                          
                              
                          </div>
                          {/* Content Row End*/}
                        </div>
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
  );
  }

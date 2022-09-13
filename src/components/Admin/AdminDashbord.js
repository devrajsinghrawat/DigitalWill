import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashOne from './AdUser/UserDashOne';
import UserDashTwo from './AdUser/UserDashTwo';

function AdminDashbord(props) {


  return (
    <>
      { /*<div className="container adm"> */}
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
                        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>

                      </div>
                      <div className="col-sm-12 rsp">
                        <div className="row">
                          <div className="col">
                            <div className="adbd">
                              <div className="css-hylz56">
                                <div className="css-1u5jwep">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" focusable="false"
                                    className="chakra-icon css-7zspnv" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                                  </svg>
                                </div>
                                <div className="chakra-stat css-1dd0jam">
                                  <dl>
                                    <dt className="chakra-stat__label css-12rqbe4">Total Balance </dt>
                                  
                                    <dd className="chakra-stat__number css-bsqw91">$15</dd>
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="adbd">
                              <div className="css-hylz56">
                                <div className="css-1u5jwep">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" focusable="false" className="chakra-icon css-7zspnv" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"></path></svg>
                                </div>
                                <div className="chakra-stat css-1dd0jam">
                                  <dl>
                                    <dt className="chakra-stat__label css-12rqbe4">Recived Total</dt>
                                    <dd className="chakra-stat__number css-bsqw91">$3450.4</dd>
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            <div className="adbd">
                              <div className="css-hylz56">
                                <div className="css-1u5jwep">
                                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" focusable="false"
                                    className="chakra-icon css-7zspnv" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"></path>
                                  </svg>
                                </div>
                                <div className="chakra-stat css-1dd0jam">
                                  <dl>
                                    <dt className="chakra-stat__label css-12rqbe4">Total Blance Send</dt>
                                    <dd className="chakra-stat__number css-bsqw91">$450.4</dd>
                                  </dl>
                                </div>
                                <div className="css-1a6fgrb"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8 rsp mt-4">
                        <div className="row">
                          <div className="col">
                          <div className="adbd">
                            < UserDashOne/>
                            </div>
                           </div>
                          <div className="col">
                          <div className="adbd">
                          < UserDashTwo />
                          </div>
                          </div>
                        </div>
                      </div>
                     
                      {/* <!-- Content Row --> */}
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
export default withRouter(AdminDashbord);

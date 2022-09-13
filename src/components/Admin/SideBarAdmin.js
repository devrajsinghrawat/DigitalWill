import React from "react";
import { Link } from "react-router-dom";
import image from '../Admin/InfoDrive-Logo1.png';


export default function SideBarAdmin() {
    const UserKey = localStorage.getItem("id");
    
   
    return (
        <>
       
       <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            { /* Sidebar - Brand */ }
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard"> <div className="sidebar-brand-icon rotate-n-15">
                    {/* <i className="fas fa-laugh-wink"></i> */}
                    {/* <img src={image} height={60} width={60} /> */}
                </div>
                <div className="sidebar-brand-text mx-3">Poc Digital Will <sup></sup></div></Link>

            { /*  Divider -->  */ }
            <hr className="sidebar-divider my-0" />

            { /* Nav Item - Dashboard */ }
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></Link>
            </li>

            { /*<!-- Divider --> */ }
            <hr className="sidebar-divider" />

            {/*  Nav Item - Pages Collapse Menu */ }
            {(() => {
                if (UserKey == "0xF2379d114d065c54d9C49dB8bB3a4035550c4e71") {
                return (
                    <div>
                        <li className="nav-item">
                        <Link className="nav-link collapsed" to="/allUsersList" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-users"></i>
                                <span>All User</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link collapsed" to="/addNominee" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                           <i className="fa fa-address-book"></i>
                                <span>Add Nominee</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link collapsed" to="/SendToEth" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-users"></i>
                                <span>Send Eth</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities1"
                                aria-expanded="true" aria-controls="collapseUtilities1">
                           
                            <i class="fas fa-users-cog"></i>
                                <span>Setting</span>
                            </Link>
                            <div id="collapseUtilities1" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link className="collapse-item" to="/adminProfile">Profile</Link>
                                    
                                </div>
                            </div>
                        </li>
                    </div>
                )
                } else {
                return (
                    <div>
                        {/* <li className="nav-item">
                            <Link className="nav-link collapsed" to="/resetpassword" data-toggle="collapse" data-target="#collapse"
                                aria-expanded="true" aria-controls="collapseUtilities">
                                <i className="fas fa-fw fa-wrench"></i>
                                <span>Reset Password</span>
                            </Link>
                            
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                                aria-expanded="true" aria-controls="collapsePages">
                                <i className="fas fa-fw fa-folder"></i>
                                <span>Company</span>
                            </Link>
                            <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link className="collapse-item" to="/addcompany">Add Company</Link>
                                    <Link className="collapse-item" to="/companylist">Company List</Link>                        
                                </div>
                            </div>
                        </li>           
                        <li className="nav-item">
                            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                                aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fa fa-address-book"></i>
                                <span>Contact</span>
                            </Link>
                            <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                <Link className="collapse-item" to="/addcontact">Add Contact</Link>
                                    <Link className="collapse-item" to="/contactlist">Contact List</Link>
                                </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities1"
                                aria-expanded="true" aria-controls="collapseUtilities1">
                            <i className="fas fa-briefcase"></i>
                                <span>Jobs</span>
                            </Link>
                            <div id="collapseUtilities1" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link className="collapse-item" to="/AddJobs">Add Jobs</Link>
                                    <Link className="collapse-item" to="/Jobs">Jobs List</Link>
                                    <Link className="collapse-item" to="/appliedJobList">Applied Job List</Link>
                                </div>
                            </div>
                        </li> */}
                        {/* <li className="nav-item">
                        <Link className="nav-link collapsed" to="/candidatesList" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-users"></i>
                                <span>Candidates</span>
                            </Link>
                        </li> */}
                         <li className="nav-item">
                        <Link className="nav-link collapsed" to="/addNominee" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                           <i className="fa fa-address-book"></i>
                                <span>Add Nominee</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link collapsed" to="/SendToEth" data-toggle="collapse" data-target="#collapseTwo"
                                aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-users"></i>
                                <span>Send Eth</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities1"
                                aria-expanded="true" aria-controls="collapseUtilities1">
                           
                            <i class="fas fa-users-cog"></i>
                                <span>Setting</span>
                            </Link>
                            <div id="collapseUtilities1" className="collapse" aria-labelledby="headingUtilities"
                                data-parent="#accordionSidebar">
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link className="collapse-item" to="/adminProfile">Profile</Link>
                                    
                                </div>
                            </div>
                        </li>
                    </div>
                )
                }
            })()}
            

            {/* Nav Item - Utilities Collapse Menu */}
            
            
            
        </ul>       
        
        </>
    )
}

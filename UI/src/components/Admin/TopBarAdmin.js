import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage, useNetwork } from 'wagmi'

export default function TopBarAdmin() {
    const navigate = useHistory()
    const { isConnected, address } = useAccount()
    const UserName = localStorage.getItem("FirstName");

    const handleLogOut = async () => {
        // sessionStorage.clear();
        localStorage.removeItem('id')
        navigate.push('/signin')
        //window.localStorage.clear();

    }
    useEffect(() => {
        if ( isConnected == true) {
            //console.log("tst1__",isConnected);
            //handleAuth()
           // navigate.push('/dashboard')
    
        } else {
            //navigate.push('/signin')
           // console.log("you are not connected");
    
        }
      });
    

    return (
        <>
            {/* <!-- Topbar Search --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">


                {/* <!-- Topbar Navbar --> */}
                <ul className="navbar-nav ml-auto">
                    <div className="topbar-divider d-none d-sm-block"></div>

                    {/* <!-- Nav Item - User Information -->  */}
                    <div className="mt-3">
                        <ConnectButton label="Login With MetaMask" chainStatus="icon" accountStatus="avatar"
                            showBalance={{
                                smallScreen: false,
                                largeScreen: true,
                            }}
                        />
                    </div>
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                            <span className="mr-2 d-none d-lg-inline text-gray-600 small"> {UserName}</span>
                            <img className="img-profile rounded-circle"
                                src="/img/undraw_profile.svg" />
                        </a>
                        {/* <!-- Dropdown - User Information -->  */}
                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <Link className="dropdown-item" to="/adminProfile">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </Link>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                Settings
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Activity Log
                            </a>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#" data-toggle="modal" data-target="#logoutModal" onClick={handleLogOut}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </Link>
                        </div>
                    </li>

                </ul>

            </nav>
        </>
    )
}

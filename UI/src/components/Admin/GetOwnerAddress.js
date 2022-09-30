import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "./FooterAdmin";
import TopBarAdmin from "./TopBarAdmin";
import SideBarAdmin from "./SideBarAdmin";
import { ethers } from "ethers";
import ABI from "./abi.json";
import AdminDashbord from "./AdminDashbord";

//Get User Blance
const GetAdminAddressFromContract
 = async ({ setError, setownerAd }) => {

  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    const AccountAdd = await signer.getAddress();
    ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
    const iface = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADD, ABI, signer);
    try {
      const userd = await iface.owner();
      setownerAd(userd); 
      localStorage.setItem('Admin', userd);
    } catch (error) {
      //console.log("ERROR AT GETTING USER: ", error);
    }

  } catch (err) {
    setError(err.message);
  }
};
function GetOwnerAddress() {

  const [Error, setError] = useState();
  const [OwnerAd, setownerAd] = useState();

  useEffect(async () => {
    setError();
    await GetAdminAddressFromContract({
        setError,
        setownerAd
    });
  }, []);
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
                        <h1 className="h3 mb-0 text-gray-800">Dashboard admin</h1>
                      </div>
                      {OwnerAd}
                    
                    </div>
                  </div>
                 
                  <FooterAdmin />

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default withRouter(GetOwnerAddress);

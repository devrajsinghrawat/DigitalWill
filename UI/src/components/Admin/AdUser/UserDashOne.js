import React, { useEffect, useState, useCallback } from "react"
import axios from "axios";
import { ethers } from "ethers";
import ABI from "../abi.json";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../Lodder/LoadingSpinner";
import { BigNumber, FixedFormat, FixedNumber, formatFixed, parseFixed, BigNumberish } from "@ethersproject/bignumber";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, withRouter } from "react-router-dom";
const GetNominee = async ({ setError1, setTxs1, setnom }) => {

  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
    const iface = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADD, ABI, signer);
    try {
      const userd = await iface.getNominee(); 
      var loopData = [];
      let totalCount = [];
      var i;
      for (i = 0; i < userd.length; i++) {
        totalCount.push(userd.length);
        let dt = [];
        let vr = BigNumber.from(userd[i].share._hex);
        let nocov = vr.toNumber();
        dt.push(userd[i].nominee);
        dt.push(nocov);
        loopData.push(dt);
        setTxs1(totalCount);
        //loopData.push(userd[i].share._hex);
      }
      setnom(loopData);

    } catch (error) {

     // console.log("ERROR AT GETTING USER: ", error);
    }

  } catch (err) {
    setError1(err.message);
  }
};
// Delete Nominee
const NomineeDelete = async ({ setErrorDlt, setTxsDlt, nomVl, SetReceiptInfo}) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");
    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(process.env.REACT_APP_CONTRACT_ADD);
    // Get Interface
    const iface = new ethers.utils.Interface(ABI);
    const data = iface.encodeFunctionData("removeNominee(address,address)", [nomVl,"0x0000000000000000000000000000000000000000"]);
    const tx = await signer.sendTransaction({
      to: process.env.REACT_APP_CONTRACT_ADD,
      data
    });
    const receipt = await tx.wait();
    setTxsDlt(tx);
    SetReceiptInfo(receipt);
   
  } catch (err) {
    setErrorDlt(err.message);
    
  }
};
const UserDashOne = (props) => {
  //Get api data
  const [error1, setError1] = useState();
  const [txs1, setTxs1] = useState([]);
  const [nom, setnom] = useState([]);
  const [error, setErrorDlt] = useState();
  const [txs, setTxsDlt] = useState([]);
  const [ReceiptInfo, SetReceiptInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setError1();
    await GetNominee({
      setError1,
      setTxs1,
      setnom
    });
    
  }, []);
  const UserId = localStorage.getItem("id");
  const [notes, getNotes] = useState(
    []
  );
  const [notes2, getNotes2] = useState(
    []
  );
  const [myId, setId] = useState(12);
  const url = 'http://localhost:3001/UserNominee';
  useEffect(() => {
    getAllNotes(myId);
  }, [myId]);

  const getAllNotes = () => {
    axios.post(url, { UserPublicKey: UserId })
      .then((response) => {
        const allNotes = response.data.data.count;
        const allNotes2 = response.data.data.data;

        getNotes(allNotes);
        getNotes2(allNotes2);
      })
      .catch(error => console.log(`Error: ${error}`));
  }
  //function GetBtnValue(event) {
  const GetBtnValue = async (event) => {
    setErrorDlt();
    setIsLoading(true);
    await NomineeDelete({
      setErrorDlt,
      setTxsDlt,
      SetReceiptInfo,
      nomVl: event.target.value,
    });
    setIsLoading(false);
  }
  useEffect(() => {
    if (ReceiptInfo && ReceiptInfo.status == 1) {
      setIsLoading(false);
      toast.success("Nominee Delete successfully!");
      setTimeout(() => {
        props.history.push("/dashboard");
      }, 3000);
      window.location.reload(false);
    }
  }, [ReceiptInfo]);
  //Using useToggle Hook
  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle]
  };


  const [toggle, setToggle] = useToggle();
  return (
    <>
      <div>
        <button onClick={setToggle} className="btn dshTwo"><h4>{txs1[0]}</h4>Added Nominee</button>
        {/* <button  onClick={handleSubmit}>dsd</button> */}

        {toggle && (
          <div className="tbl_dsh">
            <table className="table">
              <tr>
                <th>Nominee Email Id</th>
                <th>Percentage</th>
                <th>Action</th>

              </tr>
              {nom.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val[0]}</td>
                    <td>{val[1]}</td>
                    <td><button className="btndl" value={val[0]} onClick={GetBtnValue} disabled={isLoading}>
                      Delete
                    </button></td>

                  </tr>
                )
              })}
              {isLoading ? <LoadingSpinner /> : <ErrorMessage message={error} />}
            
            </table>
          </div>
        )}

      </div>
      <ToastContainer />
    </>
  )
}

export default withRouter(UserDashOne);
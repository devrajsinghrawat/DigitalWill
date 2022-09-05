import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";
import FooterAdmin from "../FooterAdmin";
import TopBarAdmin from "../TopBarAdmin";
import SideBarAdmin from "../SideBarAdmin";
import MaterialTable from 'material-table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Refresh from '@material-ui/icons/Refresh';



 function AllUsersList(props) {
    const UserRole = localStorage.getItem("UserRole");
    const UserId = localStorage.getItem("id");
    const columns = [
        { title: "Name", field: "Name", render: rowData => <Link className="btn btn-outline-primary mr-2 wid" to={`/candidatesInfo/${rowData.UserPublicKey}`} >{rowData.Name} </Link> },
        { title: "Email", field: "Email" },
        { title: "Mobile Number", field: "MobileNumber" },
        { title: "Total Deposit", field: 'TotalDeposits' },
        // { title: "Resume", field: 'Resume', render: rowData => <a href={rowData.Resume} target="_blank"><FileOpenIcon src={rowData.Resume} /></a> }, 
        
      ]
      //console.log("data______000",rowData);
      const tableRef = React.createRef();
    //Get compnay name
    const [ notes, getNotes] = useState(
       []    
    );
    const [selectedRows, setSelectedRows] = useState([]);
    const [ dltnotes, getdltNotes] = useState();
    const [myId, setId] = useState(12);
    const url = 'http://localhost:3001/getUser';
    useEffect(()=>{
        getAllNotes(myId);
    }, [myId]);

    const getAllNotes = (id) =>{
        axios.post(url,{UserId:id})
        .then((response)=>{
            console.log("JJJ___",response);
            const allNotes = response.data.data.data;
            
            getNotes(allNotes);
        })
        .catch(error => console.log(`Error: ${error}`));
    }
  
    //Update Records
    const handleRowUpdate = (newData, oldData, resolve,reject) => {
        if(newData!=''){

            axios.post("http://localhost:3001/updateUser", newData)
            .then( res => {
                toast.success("User Update Successfully", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    getAllNotes(myId);
                    props.history.push("/allUsersList");
                  
                }, 2000);
            })
        }else{
            toast.error("Invalid Input", {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    
        }
        
    }
 // Delete Candidate list
    const urldlt = 'http://localhost:3001/deleteCandidateById/';
    const handleRowDelete = (selectedRow, resolve) => {
        const upId = selectedRow.candidateId;
         axios.post(urldlt,{id:upId})
        .then((response)=>{

            toast.success("Record Deleted successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                getAllNotes(myId);
                //props.history.push("/candidatesList");
               
            }, 2000);
          
        })
        .catch(error => console.log(`Error: ${error}`));

    }
    //Delete Multipal row
    const handleBulkDelete = () => {

        const urldt = 'http://localhost:3001/deleteAllCandidatesById/';
        const updatedData = notes.filter(row => selectedRows.includes(row))
        
        const updt=updatedData.map((u) => u.candidateId);
           axios.post(urldt,{ids:updt})
           .then((response)=>{
           
            toast.success("Record Deleted successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                getAllNotes(myId);
                //props.history.push("/candidatesList");
                
            }, 2000);
          
        })
        .catch(error => console.log(`Error: ${error}`));
           getdltNotes(updatedData);
       // getdltNotes(JSON.stringify(updatedData));
       
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
                                             <h1 className="h3 mb-0 text-gray-800">All User List</h1>
                                                {/* <div className="col-md-10 bg-light text-right">
                                                    <Link className="btn btn-success" to="/addcondidates"> <i className="fas fa-plus-circle"></i> Add User</Link>
                                                    {/* <Link class="btn btn-primary ml-2" to="/jobPageInfo">Jobs Page <i class="fas fa-info-circle"></i></Link> */}
                                               {/* </div>  */}
                                        </div>
                                        <div className="row">
        
                                        </div>
                                        <div className="compny">
                                        <div className="col-sm-12 rsp">
                                         {/* <!-- Content Row --> */}
                                         {(() => {
                                            if (UserRole == "0") {
                                            return (
                                                <div>
                                                    <MaterialTable
                                                        title="User List"
                                                        columns={columns}
                                                        data= {notes}
                                                        onSelectionChange={(rows) => setSelectedRows(rows)}
                                                        editable={{
                                                            onRowUpdate: (newData, oldData) =>
                                                            new Promise((resolve, reject) => {
                                                                handleRowUpdate(newData, oldData, resolve);
                                                                
                                                            }),
                                                            onRowDelete: (selectedRow) =>
                                                                new Promise((resolve) => {
                                                                handleRowDelete(selectedRow, resolve)
                                                            }),
                                                        }}
                                                        options={{
                                                            actionsColumnIndex: -1, addRowPosition: "first",
                                                            selection: true,
                                                            
                                                            headerStyle: {
                                                                backgroundColor: '#eaeffb',
                                                                color: '#000'
                                                            },
                                                            loadingType: 'none'
                                                        }}
                                                        actions={[
                                                            {
                                                            icon: 'delete',
                                                            tooltip: "Delete all selected rows",
                                                            onClick: () => handleBulkDelete()
                                                            
                                                            },{
                                                                icon: Refresh,
                                                                tooltip: 'Refresh Data',
                                                                isFreeAction: true,
                                                                onClick: () => tableRef.current && tableRef.current.onQueryChange()
                                                            }
                                                        ]}
                                                            
                                                        />
                                                </div>
                                            )
                                            } else if (UserRole == 1 || UserRole == 2) {
                                            return (
                                                <div>
                                                    <MaterialTable
                                                        title="All Candidates List"
                                                        columns={columns}
                                                        data= {notes}
                                                        onSelectionChange={(rows) => setSelectedRows(rows)}
                                                        editable={{
                                                            isEditable: oldData => oldData.OwnerId == UserId,
                                                            onRowUpdate: (newData, oldData) =>
                                                            new Promise((resolve, reject) => {
                                                                handleRowUpdate(newData, oldData, resolve);
                                                                
                                                            })
                                                        }}
                                                        options={{
                                                            actionsColumnIndex: -1, addRowPosition: "first",
                                                            selection: true,
                                                            
                                                            headerStyle: {
                                                                backgroundColor: '#eaeffb',
                                                                color: '#000'
                                                            },
                                                            loadingType: 'none'
                                                        }}
                                                            
                                                        />
                                                </div>
                                            )
                                            } else {
                                            return (
                                                <div>
                                                    <MaterialTable
                                                        title="All Candidates List"
                                                        columns={columns}
                                                        data= {notes}
                                                        onSelectionChange={(rows) => setSelectedRows(rows)}
                                                       
                                                        options={{
                                                            actionsColumnIndex: -1, addRowPosition: "first",
                                                            selection: true,
                                                            
                                                            headerStyle: {
                                                                backgroundColor: '#eaeffb',
                                                                color: '#000'
                                                            },
                                                            loadingType: 'none'
                                                        }}
                                                            
                                                        />
                                                </div>
                                            )
                                            }
                                        })()}                                       
                                         {/* Content Row End*/}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* <!-- End of Content Wrapper --> */}
                        </div>
                        
                         {/* <!-- Footer --> */}
                         <FooterAdmin />
                                {/*<!-- End of Footer --> */}       
                    </div> 
                </div>
            </div>
        </div>
        <ToastContainer />
        </>
    )
}
export default withRouter(AllUsersList);
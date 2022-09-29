import React from "react"
import { Route, Switch, BrowserRouter,HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import AdminDashbord from "./Admin/AdminDashbord";
import AddNominee from "./Admin/Nominee/AddNominee";
import AllUsersList from "./Admin/AdUser/AllUsersList";
import AdminProfile from "./Admin/AdminProfile";
import { PublicRoute, PrivateRoute, ProtectedRoute,} from "./RouteComponents";
import SendEthTo from "./Admin/SendEthTo";
import GetOwnerAddress from "./Admin/GetOwnerAddress";
import GetPausedStatus from "./Admin/Lodder/GetPausedStatus";
import GetIsAliveStatus from "./Admin/IsAlive/GetIsAliveStatus";

const Page404 = () => <h5>Page Not Found 404</h5>;
const Home = () => <h5>Home</h5>;
const FileRotes = () => {
    const [user, setLoginUser] = useState({
        id: null,
        user: {},
      });
    
      useEffect(() => {
        const id = localStorage.getItem("id");
        const user = localStorage.getItem("FirstName");
    
       // console.log(id, user);
      }, [localStorage.getItem("id")]);
    return (
        <div className="fileRoutes">
            <Switch>
          <ProtectedRoute
            path="/signin"
            component={Login}
          ></ProtectedRoute>

          <PrivateRoute path="/dashboard" component={AdminDashbord}></PrivateRoute>
          <PrivateRoute path="/addNominee" component={AddNominee}></PrivateRoute>
          <PrivateRoute path="/allUsersList" component={AllUsersList}></PrivateRoute>
          <PrivateRoute path="/adminProfile" component={AdminProfile}></PrivateRoute>
          <PrivateRoute path="/SendToEth" component={SendEthTo}></PrivateRoute>
          <PrivateRoute path="/getAdmAddress" component={GetOwnerAddress}></PrivateRoute>
          <PrivateRoute path="/getConStatus" component={GetPausedStatus}></PrivateRoute>
          <PrivateRoute path="/getCruntBlock" component={GetIsAliveStatus}></PrivateRoute>
          <ProtectedRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/" component={Signup} />
         <Route path="*" component={Page404} /> 
         </Switch>
        </div>
    )
}

export default FileRotes
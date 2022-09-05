import "./App.css";
import FileRotes from "./components/FileRoutes";
import { Route, Switch, BrowserRouter,HashRouter } from "react-router-dom";


function App() {

  return (
    <div className="App">
         
         <BrowserRouter>
            <Switch>
                <Route path="/" component={FileRotes} />
            </Switch>
         </BrowserRouter> 
         
     
    </div>
  );
}

export default App;

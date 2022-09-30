import React, { useEffect, useState,useCallback } from "react"
import axios from "axios";


const UserDashTwo = () => {
   //Get api data
   const UserRole = localStorage.getItem("UserRole");
   const UserId = localStorage.getItem("id");
   const [ notes, getNotes] = useState(
     []    
  );
  const [ notes2, getNotes2] = useState(
   []    
 );
  const [myId, setId] = useState(12);
  const url = 'http://localhost:3001/UserNomineeByUsers';
  useEffect(()=>{
      getAllNotes(myId);
  }, [myId]);
 
  const getAllNotes = () =>{
      axios.post(url,{UserPublicKey:UserId})
      .then((response)=>{
          const allNotes = response.data.data.count;
          const allNotes2 = response.data.data.data;
          
          getNotes(allNotes);
          getNotes2(allNotes2);
      })
      .catch(error => console.log(`Error: ${error}`));
  }
  //Using useToggle Hook

  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle]
  };


  const [toggle, setToggle] = useToggle();
  return (
    <div>
      <button onClick={setToggle} className="btn dshTwo"><h4>{notes}</h4>Who Nominated</button>

      {toggle && (
         <div className="tbl_dsh">
         <table className="table">
      <tr>
        <th>Nominee Email Id</th>
        <th>Percentage</th>
        <th>Action</th>
        
      </tr>
      {notes2.map((val, key) => {
        return (
          <tr key={key}>
            <td>{val.NomineeEmailId}</td>
            <td>{val.Percentage}</td>
            <td><button type="button" className="btn btn-success">Withdraw</button></td>
            
          </tr>
        )
      })}
    </table>
      </div>
      )}

    </div>
  )
}

export default UserDashTwo;
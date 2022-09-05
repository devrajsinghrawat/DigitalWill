import React, { useState, useCallback } from 'react'


const UserDashTwo = () => {
  //Using useToggle Hook

  const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    const toggle = useCallback(() => setState((state) => !state), []);
    return [state, toggle]
  };


  const [toggle, setToggle] = useToggle();
  return (
    <div>
      <button onClick={setToggle} className="btn dshTwo"><h4>10</h4>Who Nominated</button>

      {toggle && (
        <ul className="list-group">
          <li className="list-group-item">An item</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth one</li>
        </ul>
      )}

    </div>
  )
}

export default UserDashTwo;
import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
  emptyScope,
  setSubject,
  setSearch,
  emptySearch,
  selectScopeSubject,
  selectScopeSearch,
} from "../redux/features/scopeSlice";

const NavBar = () => {
  const dispatch = useDispatch()
  let handleInputChange = (ev) => {
    dispatch(setSearch(String(ev.target.value)))
  }
  // let handleInputChange = (ev) => console.log(ev.target.value)
  const scopeSearch = useSelector(selectScopeSearch);
  const scopeSubject = useSelector(selectScopeSubject);
  return (
    <div className="container-fluid NavBar">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="">NU-Req</a>
        <div className="collapse navbar-collapse container-fluid" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0 row">
            <input className="form-control mr-sm-2 col" type="search" 
            placeholder="Search classes" aria-label="Search" 
            value={scopeSearch?scopeSearch:""}
            onChange={handleInputChange}/>
          </form>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
import React from 'react'

const NavBar = () => {
  return (
    <div className="container-fluid NavBar" style={{height: "56px"}}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="">NU-Req</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">{/* insert icon here */}</span>
        </button>
        <div className="collapse navbar-collapse container-fluid" id="navbarSupportedContent">
          <form className="form-inline my-2 my-lg-0 row">
            <input className="form-control mr-sm-2 col" type="search" placeholder="Search classes" aria-label="Search" />
          </form>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
/*
Requirement Field
e.g. Distro
*/

import React from 'react'


const Req = ({ req }) => {
  const is_distro = req === "Distribution" ? true : false
  const distros = ["Natural Sciences", "Formal Studies", "Social and Behavioral Sciences",
    "Historical Studies", "Ethics and Values", "Literature and Fine Arts"]
  return (
    <div className="container col card h-100" id={req}>
      <div className='card-body'>
        <h5 className="card-title">{req}</h5>
        {is_distro ? distros.map((distro_area) =>
          <p className="card-text" key={distro_area}>{distro_area}</p>)
          :
          <p className="card-text">
            courses
            {/* add Courses here */}
          </p>
        }
      </div>
    </div>
  )
}
export default Req

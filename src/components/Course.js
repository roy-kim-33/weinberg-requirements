import React from 'react'

const Course = ({ course }) => {
    
    return (
        <div className='card'>
            <div className='card-body'>
                <h6 className='card-title'>
                    {course}
                </h6>
            </div>
        </div>
        // <div className="card">
        //     <div className="card-body">
        //         <h6 className="card-title">{course.id}</h6>
        //         <p className="card-text">{course.name}</p>
        //         <p className="card-text">Prerequisite: {course.prereq}</p>
        //         <span className="card-text">Fulfills:
        //             {course.distro.map((d) =>
        //                 <p key={d}>{d}</p>
        //             )}
        //         </span>
        //     </div>
        // </div>
    )
}

export default Course
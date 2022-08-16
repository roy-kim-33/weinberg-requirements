import React from 'react'

const Course = ({ course }) => {
    return (
        // <div>
        //     <div>
        //         <h5>{course.id}</h5>
        //         <p>{course.name}</p>
        //         <p>Prerequisite: {course.prereq}</p>
        //         <span>Fulfills:
        //             {course.distro.map((d) =>
        //                 <p key={d}>{d}</p>
        //             )}
        //         </span>
        //     </div>
        // </div>
        <div className="card h-10">
            <div className="card-body">
                <h6 className="card-title">{course.id}</h6>
                <p className="card-text">{course.name}</p>
                <p className="card-text">Prerequisite: {course.prereq}</p>
                <span className="card-text">Fulfills:
                    {course.distro.map((d) =>
                        <p key={d}>{d}</p>
                    )}
                </span>
            </div>
        </div>
    )
}

export default Course
import React from 'react'

const Course = ({ course }) => {
    return (
        <div className="card">
            <ul>
                <h5>{course.id}</h5>
                <p>{course.name}</p>
                <p>Prerequisite: {course.prereq}</p>
                <span>Fulfills:
                    {course.distro.map((d) =>
                        <p key={d}>{d}</p>
                    )}
                </span>
            </ul>
        </div>
    )
}

export default Course
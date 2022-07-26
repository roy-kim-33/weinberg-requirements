import React from 'react'
import Course from './Course.js'

const CourseList = ({ courses }) => {
  return (
    <div className="CourseList container col">
      {
        courses.map((course) =>
          <Course key={course.id} course={course} />
        )
      }
    </div>
  )
}

export default CourseList
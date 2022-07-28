import React from 'react'
import Course from './Course.js'

const CourseList = ({ courses }) => {
  return (
    <div className="CourseList overflow-auto">
      {
        courses.map((course) =>
          <Course key={course.id} course={course} />
        )
      }
    </div>
  )
}

export default CourseList
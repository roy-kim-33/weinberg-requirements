import React from 'react'
import Course from './Course.js'
import '../styles/CourseList.sass'

const CourseList = ({ courses }) => {
  return (
    <div className="CourseList overflow-auto h-100">
      {
        courses.map((course) =>
          <Course key={course.id} course={course} />
        )
      }
    </div>
  )
}

export default CourseList
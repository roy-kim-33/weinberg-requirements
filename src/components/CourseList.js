import React from "react";
import Course from "./Course.js";

const CourseList = ({courses}) => {
  return (
    <div className="CourseList overflow-auto h-100">
      <h6>COURSES</h6>
      <hr/>
      <p>{courses.length} results</p>
      {
        courses.map((course, i) => (
          <Course 
            key={i} 
            id={course.id} 
            name={course.name} 
          />
        ))
      }
    </div>
  )
};

export default CourseList;

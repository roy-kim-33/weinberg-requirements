import React from "react";
import Course from "./Course.js";
import styles from "../styles/styles.module.sass";
import { emptyScope } from "../redux/features/scopeSlice.js";
import { useSelector, useDispatch } from "react-redux";

const CourseList = ({ courses }) => {
  const dispatch = useDispatch();
  return (
    <div className="CourseList overflow-auto h-100">
        <button
          className={styles.back_button}
          onClick={() => dispatch(emptyScope())}
          // onClick={() => console.log("hehe")}
        >
          BACK
        </button>

      <h6>COURSES</h6>
      <hr />
      <p>{courses.length} results</p>
      {courses.map((course, i) => (
        <Course key={i} id={course.id} name={course.name} />
      ))}
    </div>
  );
};

export default CourseList;

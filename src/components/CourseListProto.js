import React, { useState } from "react";
import Course from "./Course.js";
import Subject from "./Subject.js";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyScope,
  setSubject,
  setSearch,
  emptySearch,
  selectScopeSubject,
} from "../redux/features/scopeSlice";
import "../styles/CourseList.sass";


const CourseListProto = () => {
  const subject_list = require("../data/flat_subject_scrape.json");
  const course_list = require("../data/flat_course_scrape.json");
  const dispatch = useDispatch();
  // const courses_list = Object.keys(courses_json)
  const scopeSubject = useSelector(selectScopeSubject);

  // const setscopeSubject = (newScope) => {
  //   dispatch(setSubject(String(newScope)))
  //   setDisplayedList()
  // }
  return (
    <div className="CourseList overflow-auto h-100">
      {scopeSubject
        ? 
        /*
          create component called list to add subject_list OR course_list depending on scope state
          if scopeSubject and scopeCourse are both null -> SubjectList
          elif scopeCourse -> CourseList
          
          if scopeCourse -> CourseList (filtered by scopeCourse onto course id or name)
          elif scopeSubject -> CourseList (filtered by subject id)
          else -> SubjectList

        */
        course_list.map((course, i) => (
            <Course
              key={i}
              id={course.id}
              name={course.name}
            />))
        : subject_list.map((subject, i) => (
            <Subject
              key={i}
              id={subject.id}
              name={subject.name}
              onclickfunc={() => dispatch(setSubject(String(subject.id)))}
            />
          ))}
    </div>
  );
};

export default CourseListProto;

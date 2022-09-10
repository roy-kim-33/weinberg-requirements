import React, { useState } from "react";
import Course from "./Course.js";
import Subject from "./Subject.js";
import CourseList from "./CourseList.js"
import SubjectList from "./SubjectList.js"
import { useSelector, useDispatch } from "react-redux";
import {
  emptyScope,
  setSubject,
  setSearch,
  emptySearch,
  selectScopeSubject,
  selectScopeSearch,
} from "../redux/features/scopeSlice";
import "../styles/CourseList.sass";


const filterBySubject = (courses, filter_subject) => {
  return courses.filter(course => course.subject == filter_subject)
}
const filterBySearch = (courses, filter_search) => {
  return courses.filter(course => {
    course.id.includes(filter_search) || course.name.includes(filter_search)
  })
}
const List = () => {
  const subject_list = require("../data/flat_subject_scrape.json");
  const course_list = require("../data/flat_course_scrape.json");

  const scopeSubject = useSelector(selectScopeSubject);
  const scopeSearch = useSelector(selectScopeSearch);

  // const dispatch = useDispatch();

  
  if (scopeSubject) {
    if (scopeSearch) {
      
    }
    return <CourseList courses={filterBySubject(course_list, scopeSubject)}/>
  } else if (scopeSearch) {
    return <CourseList courses={filterBySearch(course_list, scopeSearch)}/>
  }
  return (
    <SubjectList subjects={subject_list}/>
  )
  
  
};

export default List;

/*
return (
    <div className="List overflow-auto h-100">
      {
        create component called list to add subject_list OR course_list depending on scope state
        if scopeSubject and scopeCourse are both null -> SubjectList
        elif scopeCourse -> CourseList
        
        if scopeCourse -> CourseList (filtered by scopeCourse onto course id or name)
        elif scopeSubject -> CourseList (filtered by subject id)
        else -> SubjectList

      }
    </div>
  );
 */
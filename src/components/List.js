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
  return courses.filter(course => course.subject.toLowerCase() === filter_subject.toLowerCase())
}
const filterBySearch = (courses, filter_search) => {
  const fs = filter_search.toLowerCase()
  const in_id = courses.filter(course => course.id.toLowerCase().includes(fs))
  const in_name = courses.filter(course => course.name.toLowerCase().includes(fs))
  return in_id.concat(in_name)
}
const List = () => {
  const subject_list = require("../data/flat_subject_scrape.json");
  const course_list = require("../data/flat_course_scrape.json");

  const scopeSubject = useSelector(selectScopeSubject);
  const scopeSearch = useSelector(selectScopeSearch);

  if (scopeSubject) {
    if (scopeSearch) {
      return <CourseList 
      courses={filterBySearch(filterBySubject(course_list, scopeSubject), scopeSearch)}/>
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
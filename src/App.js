import React, { useState } from 'react';
import NavBar from './components/NavBar.js'
import CourseList from './components/CourseList.js'
import ReqField from './components/ReqField.js'
import './App.sass';

function App() {

  const courses_json = require('./data/flat_course_scrape.json')
  const courses_list = Object.values(courses_json)

  const req_list = ["Distribution", "First-year Seminar", "Foreign Language", "Major"]

  return (
    <div className="App">
      <div className="d-flex flex-column h-100">
        <NavBar />
        
        <div className="main container-fluid row mx-0 py-4 h-100">
          <div class="col-3 h-100">
            <CourseList courses={courses_list} />
          </div>

          <div class="container col-9">
            <ReqField req_list={req_list} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

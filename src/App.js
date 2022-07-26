import React, { useState } from 'react';
import NavBar from './components/NavBar.js'
import CourseList from './components/CourseList.js'
import ReqField from './components/ReqField.js'
import './App.css';

function App() {

  const courses_json = require('./data/flat_course_scrape.json')
  const courses_list = Object.values(courses_json)

  const req_list = ["Distribution", "First-year Seminar", "Foreign Language", "Major"]

  return (
    <div className="App">
      <NavBar />


      <main className="main container-fluid row">
        <CourseList courses={courses_list} />

        <ReqField req_list={req_list} />
      </main>
      {/* </main> */}
    </div>
  );
}

export default App;

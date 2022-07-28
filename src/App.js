import React, { useState } from "react";
import NavBar from "./components/NavBar.js";
import CourseList from "./components/CourseList.js";
import ReqField from "./components/ReqField.js";
import "./App.css";

function App() {
  const courses_json = require("./data/flat_course_scrape.json");
  const courses_list = Object.values(courses_json);

  const req_list = [
    "Distribution",
    "First-year Seminar",
    "Foreign Language",
    "Major",
  ];

  return (
    <div className="App">
      <NavBar />

      <div className="main container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <CourseList courses={courses_list}/>
          </div>
          <div className="col-lg-9">
            <ReqField req_list={req_list} />
          </div>
        </div>
      </div>
      {/* </main> */}
    </div>
  );
}

export default App;

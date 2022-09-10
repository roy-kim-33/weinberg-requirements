import React, { useState } from 'react';
import NavBar from './components/NavBar.js'
// import CourseListProto from './components/CourseListProto.js'
import List from './components/List.js'
import ReqField from './components/ReqField.js'
import './App.sass';

function App() {

  const req_list = ["Distribution", "First-year Seminar", "Foreign Language", "Major"]

  return (
    <div className="App">
      <div className="d-flex flex-column h-100">
        <NavBar />
        
        <div className="main container-fluid row mx-0 py-4 h-100">
          <div className="col-3 h-100">
            <List />
          </div>

          <div className="col-9 container">
            <ReqField req_list={req_list} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;

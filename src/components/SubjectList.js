import React from 'react'
import Subject from "./Subject.js";

const SubjectList = ({subjects}) => {
  return (
    <div className="SubjectList overflow-auto h-100">
      <h6>SUBJECTS</h6>
      <hr/>
      <p>{subjects.length} results</p>
      {
        subjects.map((subject, i) => (
          <Subject
            key={i}
            id={subject.id}
            name={subject.name}
          />
        ))
      }
    </div>
  )
}

export default SubjectList
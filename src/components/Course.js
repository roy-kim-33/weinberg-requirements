import React from "react";
import { useDrag } from "react-dnd";

const Course = ({ course }) => {
  let id = course.id;
  let name = course.name;

  const [{ isDragging }, dragRef] = useDrag({
    type: "course",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // const [collected, drag, dragPreview] = useDrag(() => ({
  //     type: 'course',
  //     item: { id, name }
  //   }))

  return (
    <div className="card" ref={dragRef}>
      <ul>
        <h4>{isDragging && '😱'}</h4>
        <h5>{course.id}</h5>
        <p>{course.name}</p>
        <p>Prerequisite: {course.prereq}</p>
        <span>
          Fulfills:
          {course.distro.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </span>
      </ul>
    </div>
  );

  // return collected.isDragging ? (
  //     <div className="card" ref={ dragPreview }>
  //         <ul>
  //             {/* <h4>{isDragging && '😱'}</h4> */}
  //             <h5>{course.id}</h5>
  //             <p>{course.name}</p>
  //             <p>Prerequisite: {course.prereq}</p>
  //             <span>Fulfills:
  //                 {course.distro.map((d) =>
  //                     <p key={d}>{d}</p>
  //                 )}
  //             </span>
  //         </ul>
  //     </div>
  // ) : (
  //     <div className="card" ref={ drag } {...collected}>
  //         <ul>
  //             {/* <h4>{isDragging && '😱'}</h4> */}
  //             <h5>{course.id}</h5>
  //             <p>{course.name}</p>
  //             <p>Prerequisite: {course.prereq}</p>
  //             <span>Fulfills:
  //                 {course.distro.map((d) =>
  //                     <p key={d}>{d}</p>
  //                 )}
  //             </span>
  //         </ul>
  //     </div>
  // )
};

export default Course;

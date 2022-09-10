import React from "react";
import styles from "../styles/styles.module.sass";

const Course = ({ id, name }) => {
  return (
    <div className="card">
      <button 
        className={styles.button}
        // onClick={() => dispatch(setSubject(Strin(id)))}
        >
        <div className="card-body">
          <h6 className="card-title m-0">
            {id}
            <hr/>
            {name}
          </h6>
        </div>
      </button>
    </div>
  );
};

export default Course;

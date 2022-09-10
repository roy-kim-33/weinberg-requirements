import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  emptyScope,
  setSubject,
  setSearch,
  emptySearch,
  selectScopeSubject,
} from "../redux/features/scopeSlice";
import styles from "../styles/styles.module.sass";

const Subject = ({ id, name }) => {
  const dispatch = useDispatch();
  return (
    <div className="card">
      <button 
        className={styles.button}
        onClick={() => dispatch(setSubject(String(id)))}
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

export default Subject;

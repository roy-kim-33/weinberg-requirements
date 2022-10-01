import React from "react";
import styles from "../styles/styles.module.sass";
import { DragPreviewImage, useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

const Course = ({ id, name }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.COURSE,
    item: { id }
  }))
  return (
    collected.isDragging ?
    <div 
      className="card"
      style={{opacity: 0.5}}
      ref={dragPreview}
      >
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
    :
    <div 
      className="card"
      ref={drag}
      >
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

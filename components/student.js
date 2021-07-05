import React, { useState } from "react";
import TagSection from "./tagSection";

const Student = (props) => {
  //  const [newTag, setTag] = useState("");
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div>
      <ul style={{ listStyle: "none" }}>
        <li key={props.index}>
          {props.student.firstName} {props.student.lastName}
        </li>

        <div className="tag-section">
          {clicked ? (
            <div>
              <button onClick={handleClick}>-</button>
              <TagSection
                addTag={props.addTag}
                index={props.index}
                tags={props.student.tags}
                indexAfterSearch={props.indexAfterSearch}
              />
            </div>
          ) : (
            <div>
              <button onClick={handleClick}>+</button>
            </div>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Student;

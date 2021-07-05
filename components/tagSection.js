import React, { useState } from "react";

const TagSection = ({ addTag, index, indexAfterSearch, tags }) => {
  const [newTag, setTag] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (indexAfterSearch !== undefined) {
      addTag(newTag, undefined, indexAfterSearch);
    } else if (index !== undefined) {
      addTag(newTag, index, undefined);
    }

    setTag("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setTag(e.target.value)}
        />
      </form>
      <div>
        {tags.map((tag) => (
          <li>{tag}</li>
        ))}
      </div>
    </div>
  );
};

export default TagSection;

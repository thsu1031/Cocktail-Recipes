import React from "react";
import CreatableSelect from "react-select/creatable";
const MultiSelect = ({ type, options, handleChange }) => {
  return (
    <>
      <div  className="multi-select">
        <CreatableSelect
          placeholder={type}
          isMulti
          onChange={handleChange}
          options={options}
          formatCreateLabel={() => undefined}
          maxMenuHeight={250} 
        />
      </div>
    </>
  );
};

export default MultiSelect;

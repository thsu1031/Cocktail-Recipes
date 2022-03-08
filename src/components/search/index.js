import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const Search = ({ handleChangeSearch, handleClickSearch}) => {
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={e => handleChangeSearch(e.target.value)}
          />
          <button type="submit" className="searchButton" onClick={handleClickSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;

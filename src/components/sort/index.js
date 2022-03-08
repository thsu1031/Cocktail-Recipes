import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownAZ,
  faArrowDownZA,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const Sort = ({onSorting}) => {
  const [sortingOrder, setSortingOrder] = useState("asc");
  const handleSorting = () => {
    const order =  sortingOrder === "asc" ? "desc" : "asc";
    setSortingOrder(order);
    onSorting(order);
  };

  return (
    <>
      <span className="sort-icon" onClick={()=> handleSorting()}>
        <FontAwesomeIcon icon={sortingOrder === "asc" ?  faArrowDownAZ : faArrowDownZA} size="2xl" ></FontAwesomeIcon>
      </span>
    </>
  );
};

export default Sort;

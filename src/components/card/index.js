import React from "react";
import "./styles.css";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

const CardComponent = (props) => {

  return (
    <div className="card">
      <div
        className="card-image"
        style={{
          backgroundImage: `url("${props.data.strDrinkThumb}")`,
        }}
        alt={props.data.strDrink}
      ></div>
      <div className="card-content">
        <h1>{props.data.strDrink}</h1>
        <div>
          {" "}
          <h6>
            <Badge pill bg="secondary">
              {props.data.strCategory}
            </Badge>
          </h6>
          <h6>
            <Badge pill bg="secondary">
              {props.data.strGlass}
            </Badge>
          </h6>
        </div>
        <div className="card-details">
          <div className="card-details-inner">
            <div className="read-more">
              <Link className="button" to={`/drinks/${props.data.idDrink}`}>
                Read Recipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

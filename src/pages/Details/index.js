import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css";
import Badge from "react-bootstrap/Badge";

const Details = () => {
  const { slug } = useParams();
  const [drink, setDrink] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const drinkResponse = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${slug}`
        );
        const drinkJson = await drinkResponse.json();
        console.log(drinkJson.drinks[0]);
        setDrink(drinkJson.drinks[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [slug]);

  return (
    <div className="container details">
      <h1>{drink.strDrink}</h1>
      <h4>
        <Badge bg="secondary">{drink.strCategory}</Badge>
      </h4>
      <h4>
        <Badge bg="secondary">{drink.strGlass}</Badge>
      </h4>

      <div className="row pt-5">
        <div className="col-md-6">
          <img
            className="thumb details-img"
            src={`${drink.strDrinkThumb}`}
            alt="cocktail"
          />
        </div>

        <div className="col-md-6">
          <div className="row">
            <h2>Ingredients</h2>
            <ul>
              {drink.hasOwnProperty("strIngredient1") &&
              drink.strIngredient1 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure1} {drink.strIngredient1}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient2") &&
              drink.strIngredient2 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure2} {drink.strIngredient2}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient3") &&
              drink.strIngredient3 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure3} {drink.strIngredient3}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient4") &&
              drink.strIngredient4 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure4} {drink.strIngredient4}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient5") &&
              drink.strIngredient5 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure5} {drink.strIngredient5}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient6") &&
              drink.strIngredient6 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure6} {drink.strIngredient6}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient7") &&
              drink.strIngredient7 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure7} {drink.strIngredient7}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient8") &&
              drink.strIngredient8 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure8} {drink.strIngredient8}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient9") &&
              drink.strIngredient9 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure9} {drink.strIngredient9}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient10") &&
              drink.strIngredient10 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure10} {drink.strIngredient10}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient11") &&
              drink.strIngredient11 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure11} {drink.strIngredient11}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient12") &&
              drink.strIngredient12 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure12} {drink.strIngredient12}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient13") &&
              drink.strIngredient13 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure13} {drink.strIngredient13}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient14") &&
              drink.strIngredient14 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure14} {drink.strIngredient14}
                </li>
              ) : (
                ""
              )}
              {drink.hasOwnProperty("strIngredient15") &&
              drink.strIngredient15 !== null ? (
                <li>
                  {" "}
                  {drink.strMeasure15} {drink.strIngredient15}
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
          <hr />
          <div className="row pb-5">
            <h2>Instructions</h2>
            <div>{drink.strInstructions}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

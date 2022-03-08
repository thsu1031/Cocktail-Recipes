import React, { useState, useEffect, useMemo } from "react";
import Card from "../../components/card";
import Search from "../../components/search";
import MultiSelect from "../../components/multiSelect";
import Sort from "../../components/sort";
import "./styles.css";
import category from "../../data/category";
import glass from "../../data/glass";
import { collectCandidates, collectUniqueCandidates, flattenArray, isType} from "./helpers";

function searchByFilterAPI(type, value) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v2/1/filter.php?${type}=${value}`
    )
      .then((response) => {
        if (!response.ok) reject(response.body);
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        throw new Error(error.message);
      });
  });
}

function searchByIdAPI(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://www.thecocktaildb.com/api/json/v2/1/lookup.php?i=${id}`)
      .then((response) => {
        if (!response.ok) reject(response.body);
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => {
        throw new Error(error.message);
      });
  });
}

const Home = () => {
  const [drinksState, setDrinksState] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [glassFilter, setGlassFilter] = useState([]);
  const [sorting, setSorting] = useState("asc");

  const fetchData = async () => {
    try {
      const cocktailResponse = await fetch(
        `https://www.thecocktaildb.com/api/json/v2/1/search.php?f=m`
      );
      const cocktailJSON = await cocktailResponse.json();
      setDrinksState(cocktailJSON.drinks);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const drinksData = useMemo(() => {
    let computedDrinks = drinksState;
    const reversed = sorting === "asc" ? 1 : -1;
    computedDrinks = computedDrinks.sort((a, b) => {
      if (a.strDrink && b.strDrink) {
        return (
          reversed * a.strDrink.toString().localeCompare(b.strDrink.toString())
        );
      }
    });
    return computedDrinks;
  }, [drinksState, sorting]);

  useEffect(() => {
    if (categoryFilter.length === 0 && glassFilter.length === 0 && !search) {
      fetchData();
    }

    if (categoryFilter.length !== 0 || glassFilter.length !== 0) {
      const categoryPromises = [];
      const glassPromises = [];
      let promises = [];

      for (let i = 0; i < categoryFilter.length; i++) {
        categoryPromises.push(searchByFilterAPI("c", categoryFilter[i].value));
      }

      if (glassFilter.length !== 0) {
        for (let i = 0; i < glassFilter.length; i++) {
          glassPromises.push(searchByFilterAPI("g", glassFilter[i].value));
        }
      }

      promises = [categoryPromises, glassPromises];

      Promise.all(promises.map(Promise.all, Promise)).then((results) => {
        const [category, glass] = results;
        const candidates = [...collectCandidates(category, searchResults), ...collectCandidates(glass, searchResults)];
        const uniqueCandidates = collectUniqueCandidates(candidates)
        const searchPromises = [];

        for (let i = 0; i < uniqueCandidates.length; i++) {
          searchPromises.push(searchByIdAPI(uniqueCandidates[i].idDrink));
        }

        Promise.all(searchPromises).then((searchResults) => {
          const drinksArray = flattenArray(searchResults);
          const filteredDrinks = [];

          for (let i = 0; i < drinksArray.length; i++) {
  
            let isCategory = isType(categoryFilter, drinksArray[i], "strCategory");
            let isGlass = isType(glassFilter, drinksArray[i], "strGlass");

            if (isCategory && isGlass) {
              filteredDrinks.push(drinksArray[i]);
            }
          }

          setDrinksState(filteredDrinks);
        });
      });
    }
  }, [categoryFilter, glassFilter, search, searchResults]);

  const handleChangeCategory = (selected) => {
    setCategoryFilter(selected);
  };

  const handleChangeGlass = (selected) => {
    setGlassFilter(selected);
  };

  const handleClickSearch = (e) => {
    e.preventDefault();
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.drinks !== null) {
          if (categoryFilter.length === 0 && glassFilter.length === 0) {
            setDrinksState(responseData.drinks);
          }
          setSearchResults(responseData.drinks);
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  };

  const handleChangeSearch = (search) => {
    if (search === "") {
      setSearch("");
      setSearchResults([]);
    }
    setSearch(search);
  };

  return (
    <>
      <div className="flex-container">
        <div className="left-container">
          <div className="category">
            <MultiSelect
              type={"Categoey"}
              options={category.category}
              handleChange={handleChangeCategory}
            />
          </div>
          <div className="glass">
            <MultiSelect
              type={"Glass"}
              options={glass.glass}
              handleChange={handleChangeGlass}
            />
          </div>
        </div>
        <div className="right-container">
          <div className="flex-container-utility-bar">
            <div className="search">
              <Search
                handleChangeSearch={handleChangeSearch}
                handleClickSearch={handleClickSearch}
              />
            </div>
            <div className="sort">
              <Sort onSorting={setSorting} />
            </div>
          </div>
          <div className="flex-container-card">
            {drinksData.map((drink) => (
              <Card data={drink} key={drink.idDrink} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

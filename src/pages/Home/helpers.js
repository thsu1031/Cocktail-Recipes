import _ from "lodash";

export const collectCandidates = function(type, search) {
  const candidates = [];

  for (let i = 0; i < type.length; i++) {
    const { drinks } = type[i];

    for (let j = 0; j < drinks.length; j++) {
      if (search.length > 0) {
        const result = search.find(
          ({ idDrink }) => idDrink === drinks[j].idDrink
        );
        if (result) candidates.push(drinks[j]);
      } else {
        candidates.push(drinks[j]);
      }
    }
  }

  return candidates;
};

export const collectUniqueCandidates = function(candidates) {
  return  _.uniqWith(candidates, _.isEqual);
}

// turns [{drinks: []}, {drinks: []}, {drinks: []}] into  [{}, {}, {}]
export const flattenArray = function(data) {
  const flattened = [];

  for (let i = 0; i < data.length; i++) {
    const { drinks } = data[i];
    flattened.push(drinks[0]);
  }

  return flattened;
}

export const isType  = function (filterType, drink, typeStr){

  let isType = false; 

  if (filterType.length !== 0) {
    for (let c = 0; c < filterType.length; c++) {
      if (
        filterType[c].value.toUpperCase() ===
        drink[typeStr].toUpperCase()
      ) {
        isType = true;
        break;
      }
    }
  } else {
    isType = true;
  }

  return isType;
}



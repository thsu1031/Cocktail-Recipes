import {
  collectCandidates,
  collectUniqueCandidates,
  flattenArray,
  isType,
} from "./helpers";

describe("helpers.js", () => {
  test("It should only consider candidates under search constraint", () => {
    const category = [{ drinks: [{ idDrink: "0001" }, { idDtink: "0004" }] }];
    const searchResults = [
      { idDrink: "0001" },
      { idDrink: "0002" },
      { idDrink: "0003" },
    ];
    const results = [{ idDrink: "0001" }];
    expect(collectCandidates(category, searchResults)).toEqual(results);
  });

  test("It shouldn't consider search results if there aren't search results", () => {
    const category = [{ drinks: [{ idDrink: "0001" }, { idDtink: "0004" }] }];
    const searchResults = [];
    const results = [{ idDrink: "0001" }, { idDtink: "0004" }];
    expect(collectCandidates(category, searchResults)).toEqual(results);
  });

  test("It should return unique object elements", () => {
    const array1 = [
      { idDrink: "0001" },
      { idDrink: "0002" },
      { idDrink: "0003" },
    ];
    const array2 = [
      { idDrink: "0001" },
      { idDrink: "0002" },
      { idDrink: "0002" },
      { idDrink: "0003" },
      { idDrink: "0001" },
    ];
    const uniqueArray2 = [
      { idDrink: "0001" },
      { idDrink: "0002" },
      { idDrink: "0003" },
    ];

    expect(collectUniqueCandidates(array1)).toEqual(array1);
    expect(collectUniqueCandidates(array2)).toEqual(uniqueArray2);
  });

  // turns [{drinks: []}, {drinks: []}, {drinks: []}]
  // into  [{}, {}, {}]
  test("It should return falttened array", () => {
    const obj1 = [
      { drinks: [{ idDrink: "0001" }] },
      { drinks: [{ idDrink: "0002" }] },
      { drinks: [{ idDrink: "0003" }] },
    ];
    const results = [
      { idDrink: "0001" },
      { idDrink: "0002" },
      { idDrink: "0003" },
    ];

    expect(flattenArray(obj1)).toEqual(results);
  });

  test("Should determine correct filter type", () => {
    const drinkFilter1 = [
      { value: "Coffee / Tea", label: "Coffee/Tea" },
      { value: "Cocoa", label: "Cocoa" },
    ];
    const drinkFilter2 = [{ value: "Cocktail", label: "Cocktail" }];
    const drinkFilter3 = [];

    const drink1 = { strCategory: "Coffee / Tea" };
    const strType1 = "strCategory";

    expect(isType(drinkFilter1, drink1, strType1)).toBeTruthy();
    expect(isType(drinkFilter2, drink1, strType1)).toBeFalsy();
    expect(isType(drinkFilter3, drink1, strType1)).toBeTruthy();
  });
});

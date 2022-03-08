import { screen, render } from "@testing-library/react";
import Home from "./index";
import { MemoryRouter } from 'react-router-dom';

describe("<Home>", () => {
  test("It should have the correct drink item Melya", async () => {
    render(<Home />, { wrapper: MemoryRouter });
    const drinkItem = await screen.findByText("Melya");
    expect(drinkItem).toBeVisible();
  });

  test("It should have the correct drink item Mojito", async () => {
    render(<Home />, { wrapper: MemoryRouter });
    const drinkItem = await screen.findByText("Mojito");
    expect(drinkItem).toBeVisible();
  });

});




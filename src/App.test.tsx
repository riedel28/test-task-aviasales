import React from "react";
import { render, screen } from "@testing-library/react";

import App from "./App";

describe("App", () => {
  test("renders App component correctly", async () => {
    render(<App />);

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });
});

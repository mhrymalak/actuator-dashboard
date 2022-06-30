import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoDashboard from "../Layout/InfoDashboard";
import {envAppData, environments} from "../Data/Models/AppData.js"
import GridInfo from "../Components/GridInfo";

afterEach(cleanup);

describe("Grid Info component test", () => {
  test("Checks hader rendering", () => {
    const appsResults = JSON.parse(JSON.stringify(envAppData));
    render(<GridInfo appsResults={appsResults} environments={environments} />);

    const grids = screen.getByTestId("grid");

    expect(grids).toHaveTextContent("Application(s)");
    expect(grids).toHaveTextContent("DEV");
    expect(grids).toHaveTextContent("DIT");
  });
});

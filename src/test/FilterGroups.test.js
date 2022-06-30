import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import FilterGroups from "../Components/FilterGroups";
import { mount } from "enzyme";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe("FilterGroups component test", () => {
  test("renders Actuator Dashboard", () => {
    const { getByText } = render(<FilterGroups />);
    const pElement = getByText(/Select Groups../i);
    expect(pElement).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilterGroups></FilterGroups>, div);
  });

  it("renders FilterGroup combo correctly", () => {
    const { getByTestId } = render(<FilterGroups />);
    expect(getByTestId("filter-groups")).toHaveTextContent("Select Groups..");
  });

});

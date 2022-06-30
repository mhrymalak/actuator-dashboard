import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup } from "@testing-library/react";
import { mount } from "enzyme";
import "@testing-library/jest-dom";
import FilterStatus from "../Components/FilterStatus";

afterEach(cleanup);

describe("FilterStatus component test", () => {
  test("renders Actuator Dashboard", () => {
    const { getByText } = render(<FilterStatus />);
    const pElement = getByText(/Select Status../i);
    expect(pElement).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<FilterStatus></FilterStatus>, div);
  });

  it("renders FilterStatus combo correctly", () => {
    const { getByTestId } = render(<FilterStatus />);
    expect(getByTestId("filter-status")).toHaveTextContent("Select Status..");
  });

  test("set and change selectedOption", () => {
    const wrapper = mount(<FilterStatus callFromDashboard={() => {}} />);
    expect(wrapper.state("selectedOption")).toStrictEqual([]);
    wrapper.instance().handleChange(["UP"]);
    expect(wrapper.instance().state).toStrictEqual({
      selectedOption: ["UP"],
    });
  });
});
import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import Options from "../Components/Options";
import ButtonOption from "../Components/ButtonOption";
import Navbar from "../Components/Navbar";
import { mount } from "enzyme";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

describe("Navbar component test", () => {
  test("renders health and info buttons", () => {
    const { getByText } = render(<Navbar />);
    const pElementHealth = getByText(/Health/i);
    const pElementInfo = getByText(/Health/i);

    expect(pElementHealth).toBeInTheDocument();
    expect(pElementInfo).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    const div = document.createElement("p");
    ReactDOM.render(<ButtonOption></ButtonOption>, div);
  });
});

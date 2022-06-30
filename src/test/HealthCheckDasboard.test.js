import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react";
import { mount } from "enzyme";
import ReactDOM from "react-dom";
import ButtonOption from "../Components/ButtonOption";
import Options from "../Components/Options";
import "@testing-library/jest-dom";
import HealthCheckDashboard from "../Layout/HealthCheckDashboard";
import FilterGroups from "../Components/FilterGroups";
import MyAccordion from "../Components/MyAccordion";

afterEach(cleanup);

describe("Health Check component test", () => {
  test("checks environment buttons rendered", () => {
    render(<HealthCheckDashboard />);
    const wrapper = mount(<HealthCheckDashboard />);
    const linkElement = screen.getByText(/DEV/i);
    const buttonElements = screen.getAllByRole("button");

    expect(linkElement).toBeInTheDocument();
    expect(buttonElements).toHaveLength(9);
    expect(buttonElements.map((env) => env.textContent)).toEqual([
      "DEV",
      "PERF",
      "Prod",
    ]);
  });

  test("Check applictions rendering", () => {
    const api = {
      title: "API",
      url: "https://api",
    };

    render(<MyAccordion app={api} key={`${api.title}-accordion`} />);
    const accordion = screen.getByTestId("accordion");
    
    expect(accordion).toHaveTextContent(api.title);
  });
});

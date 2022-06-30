import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

test("renders Actuator Dashboard -", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Actuator Dashboard -/i);
  expect(linkElement).toBeInTheDocument();
});

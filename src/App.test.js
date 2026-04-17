import { render, screen } from "@testing-library/react";
import App from "./App";

// REVIEW: This test is the default CRA test that looks for "learn react" text, which does not exist
// in your app. This test will fail if you run `npm test`. Either update it to test for something
// that actually exists (e.g. "My favorite albums") or remove the file entirely.
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { Direction } from "../tsx/App";
import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusProjects,
} from "./test-util";

describe("About", () => {
  let buttonAbout: HTMLAnchorElement;

  beforeEach(() => {
    ({ buttonAbout } = setupTests()); // parentheses required for redeclaration
    fireEvent.click(buttonAbout);
  });

  it("shows a headshot and bio", () => {
    // The About page should show the relevant information
    expect(window.location.pathname).toBe("/about");
    testBaseContent();

    const headshot = screen.getByAltText(
      "Headshot of Abhishek"
    ) as HTMLImageElement;
    const bio = screen.getByText(/My name is Abhishek/);

    expect(headshot).toBeInTheDocument();
    expect(headshot.src).toBe(`${window.location.origin}/img/Headshot.png`);
    expect(bio).toBeInTheDocument();
  });

  testNavbar("About");

  // Check that the arrow button navigates to the correct page with the correct slide transition
  it("navigates to Projects after clicking the right arrow", async () => {
    await act(async () => {
      await waitFor(() => {
        const rightArrow = screen.getByLabelText(/Go to/) as HTMLAnchorElement;
        fireEvent.click(rightArrow);
      });
    });

    testFocusProjects();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Direction.Left);
  });
});

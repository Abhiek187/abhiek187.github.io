import { act } from "react-dom/test-utils";
import { Direction } from "../tsx/App";
import { setupTests, cleanupTests, testBaseContent, testNavbar, testFocusProjects } from "./test-util";

let container: HTMLDivElement | null = null;
let buttonAbout: HTMLAnchorElement | null = null;

describe("About", () => {
  beforeEach(() => {
    ({ container, buttonAbout } = setupTests());
    buttonAbout?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  afterEach(() => {
    cleanupTests();
  });

  it("shows a headshot and bio", () => {
    // The About page should show the relevant information
    expect(window.location.pathname).toBe("/about");
    testBaseContent();
    expect(container?.querySelector(".about")).not.toBeNull();
    expect(
      container?.querySelector(".about-headshot")?.getAttribute("src")
    ).toBe("/img/Headshot.png");
    expect(container?.querySelector(".about-bio")?.textContent).toContain(
      "Abhishek Chaudhuri"
    );
  });

  testNavbar("About");

  // Check that the arrow button navigates to the correct page with the correct slide transition
  it("navigates to Projects after clicking the right arrow", () => {
    act(() => {
      const rightArrow: HTMLAnchorElement | null | undefined =
        container?.querySelector(".arrow-right");
      rightArrow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusProjects();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");
    expect(transitionGroup?.classList).toContain(Direction.Left);
  });
});

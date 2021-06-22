import { act } from "react-dom/test-utils";
import { Direction } from "../tsx/App";
import { setupTests, cleanupTests, testBaseContent, testNavbar, testFocusProjects } from "./test-util";

let container: HTMLDivElement | null = null;
let buttonContact: HTMLAnchorElement | null = null;

describe("Contact", () => {
  let buttonResume: HTMLAnchorElement | null | undefined = null;
  let buttonLinkedin: HTMLAnchorElement | null | undefined = null;
  let buttonGithub: HTMLAnchorElement | null | undefined = null;
  let buttonEmail: HTMLAnchorElement | null | undefined = null;

  beforeEach(() => {
    ({ container, buttonContact } = setupTests());
    buttonContact?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    buttonResume = container?.querySelector(".contact-resume");
    buttonLinkedin = container?.querySelector(".contact-linkedin");
    buttonGithub = container?.querySelector(".contact-github");
    buttonEmail = container?.querySelector(".contact-email");
  });

  afterEach(() => {
    cleanupTests();
  });

  // Test that the resume, LinkedIn, GitHub, and email links are valid
  it("shows all contact information", () => {
    expect(window.location.pathname).toBe("/contact");
    testBaseContent();
    expect(buttonResume).not.toBeNull();
    expect(buttonLinkedin).not.toBeNull();
    expect(buttonGithub).not.toBeNull();
    expect(buttonEmail).not.toBeNull();
  });

  it("can view the resume", () => {
    act(() => {
      buttonResume?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonResume?.getAttribute("href")).toBe("resume.pdf");
  });

  it("can view the LinkedIn profile", () => {
    act(() => {
      buttonLinkedin?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonLinkedin?.getAttribute("href")).toBe(
      "https://www.linkedin.com/in/abhiek187"
    );
  });

  it("can view the GitHub profile", () => {
    act(() => {
      buttonGithub?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonGithub?.getAttribute("href")).toBe(
      "https://github.com/abhiek187"
    );
  });

  it("can create an email", () => {
    act(() => {
      buttonEmail?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(buttonEmail?.getAttribute("href")).toBe(
      "mailto:achaudhuri2011@yahoo.com"
    );
  });

  testNavbar("Contact");

  it("navigates to Projects after clicking the left arrow", () => {
    act(() => {
      const leftArrow: HTMLAnchorElement | null | undefined =
        container?.querySelector(".arrow-left");
      leftArrow?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    testFocusProjects();
    const transitionGroup: HTMLDivElement | null | undefined =
      container?.querySelector(".transition-group");
    expect(transitionGroup?.classList).toContain(Direction.Right);
  });
});

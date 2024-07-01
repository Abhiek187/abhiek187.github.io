import { fireEvent, screen } from "@testing-library/react";
import { expect } from "vitest";

import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusProjects,
} from "../utils/test-util";
import Transition from "../enums/Transition";
import Page from "../enums/Page";

describe("Contact", () => {
  let buttonContact: HTMLAnchorElement;
  let buttonResume: HTMLAnchorElement;
  let buttonLinkedin: HTMLAnchorElement;
  let buttonGithub: HTMLAnchorElement;
  let buttonEmail: HTMLAnchorElement;

  beforeEach(async () => {
    ({ buttonContact } = setupTests());
    fireEvent.click(buttonContact);

    // Wait until the slide transition ends so there's only one match
    buttonResume = await screen.findByRole<HTMLAnchorElement>("button", {
      name: /resume/i,
    });
    buttonLinkedin = await screen.findByRole<HTMLAnchorElement>("button", {
      name: /linkedin/i,
    });
    buttonGithub = await screen.findByRole<HTMLAnchorElement>("button", {
      name: /github/i,
    });
    buttonEmail = await screen.findByRole<HTMLAnchorElement>("button", {
      name: /email/i,
    });
  });

  // Test that the resume, LinkedIn, GitHub, and email links are valid
  it("shows all contact information", () => {
    expect(window.location.hash).toBe("#/contact");
    testBaseContent();

    expect(buttonResume).toBeInTheDocument();
    expect(buttonLinkedin).toBeInTheDocument();
    expect(buttonGithub).toBeInTheDocument();
    expect(buttonEmail).toBeInTheDocument();
  });

  it("can view the resume", () => {
    // Instead of clicking the links, just check if they take users to the right page
    expect(buttonResume.href).toBe(`${window.location.origin}/resume.pdf`);
  });

  it("can view the LinkedIn profile", () => {
    expect(buttonLinkedin.href).toBe("https://www.linkedin.com/in/abhiek187");
  });

  it("can view the GitHub profile", () => {
    expect(buttonGithub.href).toBe("https://github.com/abhiek187");
  });

  it("can create an email", () => {
    expect(buttonEmail.href).toBe("mailto:achaudhuri2011@yahoo.com");
  });

  testNavbar(Page.Contact);

  it("navigates to Projects after clicking the left arrow", async () => {
    // Wait until there's only one left arrow
    const leftArrow = await screen.findByLabelText<HTMLAnchorElement>(
      /Go to Projects/
    );
    fireEvent.click(leftArrow);

    testFocusProjects();
    const transitionGroup = screen.getByTestId<HTMLDivElement>("transition");
    expect(Array.from(transitionGroup.classList)).toContain(
      Transition.SlideRight
    );
  });
});

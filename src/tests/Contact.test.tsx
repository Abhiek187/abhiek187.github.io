import { fireEvent, screen } from "@testing-library/react";
import { Direction } from "../tsx/App";
import {
  setupTests,
  testBaseContent,
  testNavbar,
  testFocusProjects,
} from "./test-util";

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
    buttonResume = (await screen.findByRole("link", {
      name: /resume/i,
    })) as HTMLAnchorElement;
    buttonLinkedin = (await screen.findByRole("link", {
      name: /linkedin/i,
    })) as HTMLAnchorElement;
    buttonGithub = (await screen.findByRole("link", {
      name: /github/i,
    })) as HTMLAnchorElement;
    buttonEmail = (await screen.findByRole("link", {
      name: /email/i,
    })) as HTMLAnchorElement;
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
    fireEvent.click(buttonResume);
    expect(buttonResume.href).toBe(`${window.location.origin}/resume.pdf`);
  });

  it("can view the LinkedIn profile", () => {
    fireEvent.click(buttonLinkedin);
    expect(buttonLinkedin.href).toBe("https://www.linkedin.com/in/abhiek187");
  });

  it("can view the GitHub profile", () => {
    fireEvent.click(buttonGithub);
    expect(buttonGithub.href).toBe("https://github.com/abhiek187");
  });

  it("can create an email", () => {
    fireEvent.click(buttonEmail);
    expect(buttonEmail.href).toBe("mailto:achaudhuri2011@yahoo.com");
  });

  testNavbar("Contact");

  it("navigates to Projects after clicking the left arrow", async () => {
    // Wait until there's only one left arrow
    const leftArrow = (await screen.findByLabelText(
      /Go to Projects/
    )) as HTMLAnchorElement;
    fireEvent.click(leftArrow);

    testFocusProjects();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Direction.Right);
  });
});

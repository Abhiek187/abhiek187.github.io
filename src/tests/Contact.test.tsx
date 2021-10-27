import { act, fireEvent, screen, waitFor } from "@testing-library/react";
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

    await waitFor(() => {
      // Wait until the slide transition ends so there's only one match
      buttonResume = screen.getByRole("link", {
        name: /resume/i,
      }) as HTMLAnchorElement;
      buttonLinkedin = screen.getByRole("link", {
        name: /linkedin/i,
      }) as HTMLAnchorElement;
      buttonGithub = screen.getByRole("link", {
        name: /github/i,
      }) as HTMLAnchorElement;
      buttonEmail = screen.getByRole("link", {
        name: /email/i,
      }) as HTMLAnchorElement;
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
    act(() => {
      fireEvent.click(buttonResume);
    });

    expect(buttonResume.href).toBe(`${window.location.origin}/resume.pdf`);
  });

  it("can view the LinkedIn profile", () => {
    act(() => {
      fireEvent.click(buttonLinkedin);
    });

    expect(buttonLinkedin.href).toBe("https://www.linkedin.com/in/abhiek187");
  });

  it("can view the GitHub profile", () => {
    act(() => {
      fireEvent.click(buttonGithub);
    });

    expect(buttonGithub.href).toBe("https://github.com/abhiek187");
  });

  it("can create an email", () => {
    act(() => {
      fireEvent.click(buttonEmail);
    });

    expect(buttonEmail.href).toBe("mailto:achaudhuri2011@yahoo.com");
  });

  testNavbar("Contact");

  it("navigates to Projects after clicking the left arrow", () => {
    act(() => {
      const leftArrow = screen.getByLabelText(/Go to/) as HTMLAnchorElement;
      fireEvent.click(leftArrow);
    });

    testFocusProjects();
    const transitionGroup = screen.getByTestId("transition") as HTMLDivElement;
    expect(transitionGroup.classList).toContain(Direction.Right);
  });
});

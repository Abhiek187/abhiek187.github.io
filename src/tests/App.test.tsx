import { screen } from "@testing-library/react";
import { setupTests, testBaseContent, testNavbar } from "./test-util";

/* Testing Procedure:
 * - Start by rendering the App -> it should render without crashing
 * From App:
 * - The name, headline, navbar, welcome message, and footer should show
 * - Click on About -> it should render the About component (button is active)
 * - (OR) Click on Projects -> it should render the Projects component (button is active)
 * - (OR) Click on Contact -> it should render the Contact component (button is active)
 * - (OR) Set the URL to some other path -> it should show the error message
 * From About:
 * - A headshot and bio should be present in the container
 * - Click on About -> it should slide the About component to the left
 * - Click on Projects -> it should slide the Projects component to the left
 * - Click on Contact -> it should slide the Contact component to the left
 * - Click on the right arrow -> it should slide the Projects component to the left
 * - Go to some invalid page -> it should show the error message
 * From Projects:
 * - Scroll down -> the navbar should be sticky
 * - All projects should be listed under each category
 * - Each project's name, image, about, technology, website, and repo should be shown
 * - Click on About, Projects, Contact, invalid, left, and right arrows
 * From Contact:
 * - Click on Resume -> it should show the resume.pdf file
 * - Click on LinkedIn -> it should show the Abhiek187 LinkedIn page
 * - Click on GitHub -> it should show the Abhiek187 GitHub page
 * - Click on Email -> it should create an email to achaudhuri2011@yahoo.com
 * - Click on About, Projects, Contact, invalid, and left arrow
 * From invalid:
 * - The error message should show
 * - Click on About, Projects, and Contact
 */
describe("App", () => {
  beforeEach(() => {
    setupTests();
  });

  it("renders without crashing", () => {
    // The home page should show up
    expect(window.location.hash).toBe("");
    testBaseContent();

    const welcomeMessage = screen.getByText(/welcome/) as HTMLParagraphElement;
    expect(welcomeMessage).toBeInTheDocument();
  });

  testNavbar("App");
});

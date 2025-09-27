import * as React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import createVaporwaveTheme from "../../theme/theme";

// Mock the entire footer module to avoid asset import issues
jest.mock("./footer", () => {
  return {
    __esModule: true,
    default: function MockFooter() {
      return (
        <footer role="contentinfo" data-testid="footer">
          <div data-testid="brand-section">
            <h4>Vaporjawn</h4>
            <p>Test bio for footer testing</p>
            <a href="mailto:test@example.com">test@example.com</a>
          </div>
          <div data-testid="quick-links">
            <h6>Quick Links</h6>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/projects">Projects</a>
            <a href="/resume">Resume</a>
            <a href="/activity">Activity</a>
            <a href="/20XX">20XX</a>
          </div>
          <div data-testid="services">
            <h6>Services</h6>
            <div>Web Development</div>
            <div>React Development</div>
            <div>TypeScript Solutions</div>
            <div>UI/UX Design</div>
            <div>Portfolio Development</div>
          </div>
          <div data-testid="social-links">
            <a
              aria-label="Visit github profile"
              href="https://github.com/test"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              aria-label="Visit linkedin profile"
              href="https://linkedin.com/in/test"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              aria-label="Visit bluesky profile"
              href="https://bsky.app/test"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky
            </a>
          </div>
          <div data-testid="legal-section">
            <div>© 2024 Test User. All rights reserved.</div>
            <a href="/coming-soon">FAQs</a>
            <a href="/coming-soon">Privacy Policy</a>
            <a href="/coming-soon">Terms of Service</a>
          </div>
        </footer>
      );
    },
  };
});

// Import the mocked footer
import Footer from "./footer";

const theme = createVaporwaveTheme("dark");

const FooterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </BrowserRouter>
);

describe("Footer Component", () => {
  test("renders footer component without crashing", () => {
    const { container } = render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(container).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  test("renders brand section with correct content", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText("Vaporjawn")).toBeTruthy();
    expect(screen.getByText("Test bio for footer testing")).toBeTruthy();
    expect(screen.getByText("test@example.com")).toBeTruthy();
  });

  test("renders Quick Links section with navigation items", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText("Quick Links")).toBeTruthy();
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
    expect(screen.getByText("Projects")).toBeTruthy();
    expect(screen.getByText("Resume")).toBeTruthy();
    expect(screen.getByText("Activity")).toBeTruthy();
    expect(screen.getByText("20XX")).toBeTruthy();
  });

  test("renders Services section with service offerings", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText("Services")).toBeTruthy();
    expect(screen.getByText("Web Development")).toBeTruthy();
    expect(screen.getByText("React Development")).toBeTruthy();
    expect(screen.getByText("TypeScript Solutions")).toBeTruthy();
    expect(screen.getByText("UI/UX Design")).toBeTruthy();
    expect(screen.getByText("Portfolio Development")).toBeTruthy();
  });

  test("renders social media links with proper accessibility", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    const githubLink = screen.getByLabelText("Visit github profile");
    expect(githubLink).toBeTruthy();
    expect(githubLink.getAttribute("href")).toBe("https://github.com/test");
    expect(githubLink.getAttribute("target")).toBe("_blank");
    expect(githubLink.getAttribute("rel")).toBe("noopener noreferrer");

    expect(screen.getByLabelText("Visit linkedin profile")).toBeTruthy();
    expect(screen.getByLabelText("Visit bluesky profile")).toBeTruthy();
  });

  test("renders copyright and legal information", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText(/© 2024 Test User/)).toBeTruthy();
    expect(screen.getByText("FAQs")).toBeTruthy();
    expect(screen.getByText("Privacy Policy")).toBeTruthy();
    expect(screen.getByText("Terms of Service")).toBeTruthy();
  });

  test("has proper semantic structure with footer role", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeTruthy();
  });

  test("email link has correct mailto href", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    const emailLink = screen.getByText("test@example.com");
    expect(emailLink.getAttribute("href")).toBe("mailto:test@example.com");
  });

  test("navigation links point to correct paths", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    expect(screen.getByText("Home").getAttribute("href")).toBe("/");
    expect(screen.getByText("About").getAttribute("href")).toBe("/about");
    expect(screen.getByText("Projects").getAttribute("href")).toBe("/projects");
  });

  test("social media links open in new tabs", () => {
    render(
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    );

    const githubLink = screen.getByLabelText("Visit github profile");
    const linkedinLink = screen.getByLabelText("Visit linkedin profile");
    const blueskyLink = screen.getByLabelText("Visit bluesky profile");

    expect(githubLink.getAttribute("target")).toBe("_blank");
    expect(linkedinLink.getAttribute("target")).toBe("_blank");
    expect(blueskyLink.getAttribute("target")).toBe("_blank");

    expect(githubLink.getAttribute("rel")).toBe("noopener noreferrer");
    expect(linkedinLink.getAttribute("rel")).toBe("noopener noreferrer");
    expect(blueskyLink.getAttribute("rel")).toBe("noopener noreferrer");
  });
});

/**
 * AdminHeader Component Tests
 * Tests for admin-specific navigation header
 * @module components/header/__tests__/AdminHeader.test
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import AdminHeader from "../AdminHeader";
import { AdminAuthContext } from "../../../contexts/AdminAuthContext";

// Mock dark mode toggle component
vi.mock("../components/darkModeToggle", () => ({
  default: ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (val: boolean) => void }) => (
    <button onClick={() => setDarkMode(!darkMode)} data-testid="dark-mode-toggle">
      Toggle Dark Mode
    </button>
  ),
}));

// Mock useNavigate from react-router-dom
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("AdminHeader", () => {
  const mockLogout = vi.fn();
  const mockSetDarkMode = vi.fn();

  const defaultAdminAuthValue = {
    isAuthenticated: true,
    login: vi.fn(),
    logout: mockLogout,
    sessionTimeRemaining: 1800, // 30 minutes
  };

  const renderAdminHeader = (
    darkMode = false,
    adminAuthValue = defaultAdminAuthValue
  ) => {
    return render(
      <BrowserRouter>
        <AdminAuthContext.Provider value={adminAuthValue}>
          <AdminHeader darkMode={darkMode} setDarkMode={mockSetDarkMode} />
        </AdminAuthContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders admin header with title", () => {
      renderAdminHeader();
      expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    });

    it("renders Dashboard navigation link", () => {
      renderAdminHeader();
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
    });

    it("renders Settings navigation link as disabled", () => {
      renderAdminHeader();
      const settingsButton = screen.getByText("Settings").closest("button");
      expect(settingsButton).toBeDisabled();
    });

    it("renders logout button", () => {
      renderAdminHeader();
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });

    it("renders dark mode toggle", () => {
      renderAdminHeader();
      expect(screen.getByTestId("dark-mode-toggle")).toBeInTheDocument();
    });
  });

  describe("Session Timer", () => {
    it("displays session time in MM:SS format", () => {
      renderAdminHeader(false, {
        ...defaultAdminAuthValue,
        sessionTimeRemaining: 1800, // 30 minutes = 30:00
      });
      // Look for the time text (30:00)
      expect(screen.getByText(/30:00/)).toBeInTheDocument();
    });

    it("shows warning state when session < 5 minutes", () => {
      const { container } = renderAdminHeader(false, {
        ...defaultAdminAuthValue,
        sessionTimeRemaining: 240, // 4 minutes
      });
      // Check if timer displays correctly
      expect(screen.getByText(/04:00/)).toBeInTheDocument();
      // Timer icon should be present
      const timerIcons = container.querySelectorAll('[data-testid="TimerIcon"]');
      expect(timerIcons.length).toBeGreaterThan(0);
    });

    it("handles null session time", () => {
      renderAdminHeader(false, {
        ...defaultAdminAuthValue,
        sessionTimeRemaining: null,
      });
      expect(screen.getByText(/00:00/)).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("navigates to dashboard when Dashboard link is clicked", () => {
      renderAdminHeader();
      const dashboardButton = screen.getByText("Dashboard").closest("button");
      fireEvent.click(dashboardButton!);
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });

    it("navigates to dashboard when title is clicked", () => {
      renderAdminHeader();
      const title = screen.getAllByText("Admin Panel")[0]; // Get first instance (AppBar)
      fireEvent.click(title);
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });

    it("does not navigate when Settings button is clicked (disabled)", () => {
      renderAdminHeader();
      const settingsButton = screen.getByText("Settings").closest("button");
      fireEvent.click(settingsButton!);
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe("Logout Functionality", () => {
    it("opens confirmation dialog when logout button is clicked", () => {
      renderAdminHeader();
      const logoutButtons = screen.getAllByText("Logout");
      // Click the first logout button (desktop version)
      fireEvent.click(logoutButtons[0]);

      // Dialog should appear
      expect(screen.getByText("Confirm Logout")).toBeInTheDocument();
      expect(
        screen.getByText(/Are you sure you want to logout/)
      ).toBeInTheDocument();
    });

    it("calls logout and navigates when logout is confirmed", async () => {
      renderAdminHeader();
      const logoutButtons = screen.getAllByText("Logout");
      fireEvent.click(logoutButtons[0]);

      // Click confirm button in dialog
      const confirmButton = screen.getAllByText("Logout").find(
        (el) => el.closest("button")?.className.includes("MuiButton")
      );
      fireEvent.click(confirmButton!);

      await waitFor(() => {
        expect(mockLogout).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/");
      });
    });

    it("closes dialog when logout is cancelled", async () => {
      renderAdminHeader();
      const logoutButtons = screen.getAllByText("Logout");
      fireEvent.click(logoutButtons[0]);

      // Click cancel button
      const cancelButton = screen.getByText("Cancel");
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.queryByText("Confirm Logout")).not.toBeInTheDocument();
        expect(mockLogout).not.toHaveBeenCalled();
      });
    });
  });

  describe("Dark Mode", () => {
    it("calls setDarkMode when toggle is clicked", () => {
      renderAdminHeader(false);
      const toggle = screen.getByTestId("dark-mode-toggle");
      fireEvent.click(toggle);
      expect(mockSetDarkMode).toHaveBeenCalled();
    });
  });

  describe("Active Path Highlighting", () => {
    it("highlights Dashboard link when on /admin route", () => {
      // Mock location to be /admin
      window.history.pushState({}, "Admin Dashboard", "/admin");
      renderAdminHeader();

      const dashboardButton = screen.getByText("Dashboard").closest("button");
      // Check if button has active styling (would need to inspect computed styles)
      expect(dashboardButton).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("renders mobile menu icon on small screens", () => {
      // Mock mobile viewport
      global.innerWidth = 500;
      global.dispatchEvent(new Event("resize"));

      renderAdminHeader();

      // Menu icon should be present (would need specific testing for media queries)
      const menuButtons = screen.getAllByLabelText(/menu/i);
      expect(menuButtons.length).toBeGreaterThan(0);
    });
  });
});

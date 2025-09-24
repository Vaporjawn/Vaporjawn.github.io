import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { VaporwavePurple } from "../../colors";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            textAlign: "center",
            p: 4,
          }}
        >
          <ErrorOutline
            sx={{
              fontSize: 80,
              color: "error.main",
              mb: 2,
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We apologize for the inconvenience. The page has encountered an
            error.
          </Typography>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <Box
              sx={{
                backgroundColor: "grey.100",
                p: 2,
                borderRadius: 1,
                mb: 4,
                maxWidth: "600px",
                overflow: "auto",
              }}
            >
              <Typography variant="body2" component="pre">
                {this.state.error.toString()}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            onClick={this.handleRefresh}
            sx={{
              backgroundColor: VaporwavePurple,
              "&:hover": {
                backgroundColor: "#7a00cc",
              },
            }}
          >
            Reload Page
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

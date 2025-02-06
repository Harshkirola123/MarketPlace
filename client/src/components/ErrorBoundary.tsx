import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";
import { withTranslation, WithTranslation } from "react-i18next";

interface ErrorBoundaryProps extends WithTranslation {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: "center", p: 4 }}>
          <Typography variant="h5" color="error">
            {t("errorBoundary.title")}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {this.state.error?.message || t("errorBoundary.message")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleReload}
            sx={{ mt: 3 }}
          >
            {t("errorBoundary.retry")}
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);

import { Box, Button, Typography, useTheme } from "@mui/material";
import { Download, OpenInNew } from "@mui/icons-material";
import resume from "../../assets/Resume.pdf";

const ResumePage = () => {
  const theme = useTheme();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resume;
    link.download = "Victor_Williams_Resume.pdf";
    link.click();
  };

  const handleOpenInNewTab = () => {
    window.open(resume, "_blank");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        py: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          // Widen the content area so the embedded resume can use more horizontal space
          // while still remaining responsive on very small screens.
          maxWidth: { xs: "100%", sm: "min(1200px, 95vw)" },
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Resume
        </Typography>

        <Box sx={{ mb: 4, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleDownload}
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Download PDF
          </Button>
          <Button
            variant="outlined"
            startIcon={<OpenInNew />}
            onClick={handleOpenInNewTab}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              "&:hover": {
                borderColor: theme.palette.primary.dark,
                backgroundColor: `${theme.palette.primary.main}08`,
              },
            }}
          >
            Open in New Tab
          </Button>
        </Box>

        <Box
          sx={{
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: theme.shadows[3],
            backgroundColor: theme.palette.background.paper,
            // Give the preview a subtle growth on larger screens
            // while ensuring it doesn't overwhelm ultra-wide displays.
            p: { xs: 0, md: 1 },
          }}
        >
          <iframe
            src={resume}
            width="100%"
            // Make the height responsive to viewport while enforcing a reasonable minimum.
            // This improves the "fits the page" experience without forcing scroll traps.
            style={{
              border: "none",
              display: "block",
              height: "min(1200px, calc(100vh - 220px))",
              minHeight: "900px",
            }}
            title="Victor Williams Resume"
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            color: theme.palette.text.secondary,
          }}
        >
          If the PDF doesn't display correctly, please try downloading it or
          opening in a new tab.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResumePage;

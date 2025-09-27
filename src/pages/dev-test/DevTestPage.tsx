import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Alert
} from "@mui/material";
import { Star } from "@mui/icons-material";
import { useStarredProjects } from "../../hooks/useStarredProjects";

/**
 * Development Test Page for Star Modification Feature
 * This page is only accessible in development mode and allows testing
 * the project star modification functionality.
 */
const DevTestPage: React.FC = () => {
  const { toggleStar, isStarred, canModifyStars } = useStarredProjects();

  // Test projects with different original featured states
  const testProjects = [
    { id: "test-originally-featured", title: "Test Project (Originally Featured)", originalFeatured: true },
    { id: "test-originally-not-featured", title: "Test Project (Originally Not Featured)", originalFeatured: false },
    { id: "test-neutral-project", title: "Test Neutral Project", originalFeatured: false }
  ];

  const currentMode = import.meta.env.MODE;
  const isDevelopment = canModifyStars();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Star Modification Feature Test
      </Typography>

      <Alert severity={isDevelopment ? "success" : "warning"} sx={{ mb: 3 }}>
        <Typography variant="body1">
          <strong>Current Environment:</strong> {currentMode}<br/>
          <strong>Can Modify Stars:</strong> {isDevelopment ? "Yes" : "No"}<br/>
          {!isDevelopment && (
            <>Star modifications are disabled in production mode. Stars can only be toggled in development.</>
          )}
        </Typography>
      </Alert>

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Test Projects
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {testProjects.map((project) => {
          const starred = isStarred(project.id, project.originalFeatured);

          return (
            <Card key={project.id} variant="outlined">
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h6">
                      {project.title}
                    </Typography>
                    <Box display="flex" gap={1} mt={1}>
                      <Chip
                        label={`Original: ${project.originalFeatured ? "Featured" : "Not Featured"}`}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={`Current: ${starred ? "Starred" : "Not Starred"}`}
                        size="small"
                        color={starred ? "primary" : "default"}
                      />
                    </Box>
                  </Box>

                  <Box display="flex" alignItems="center" gap={2}>
                    <IconButton
                      onClick={() => toggleStar(project.id, project.originalFeatured)}
                      size="large"
                      sx={{
                        color: starred ? "gold" : "action.disabled",
                        "&:hover": {
                          color: starred ? "orange" : "gold"
                        }
                      }}
                      aria-label={starred ? "Remove star" : "Add star"}
                    >
                      <Star fontSize="large" />
                    </IconButton>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => toggleStar(project.id, project.originalFeatured)}
                      disabled={!isDevelopment}
                    >
                      {starred ? "Unstar" : "Star"}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          localStorage Status
        </Typography>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="body2" component="pre" sx={{ fontFamily: "monospace" }}>
              {JSON.stringify(
                JSON.parse(localStorage.getItem("featured-status-overrides") || "{}"),
                null,
                2
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Instructions for Testing
        </Typography>
        <Typography variant="body2" color="text.secondary">
          1. In development mode, click the star buttons to toggle starred status<br/>
          2. Check the localStorage section above to see overrides being saved<br/>
          3. Build and preview the app (<code>npm run build && npm run preview</code>) to test production mode<br/>
          4. In production mode, star buttons should be disabled and show console warnings
        </Typography>
      </Box>
    </Container>
  );
};

export default DevTestPage;
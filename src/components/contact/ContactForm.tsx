/**
 * @module components/contact/ContactForm
 * @description
 * Contact form component with validation and submission handling.
 * Collects project inquiry information from potential clients.
 *
 * @example
 * ```tsx
 * import { ContactForm } from './components/contact';
 *
 * <ContactForm />
 * ```
 */

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  alpha,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import { trackContactFormSubmit } from "../../utils/analytics";

import type { ContactFormData } from "./types";
import { contactFormSchema } from "./validation";
import {
  PROJECT_TYPE_OPTIONS,
  BUDGET_RANGE_OPTIONS,
  TIMELINE_OPTIONS,
  DEFAULT_FORM_VALUES,
  FORM_ENDPOINT,
  TOAST_CONFIG,
} from "./constants";

/**
 * ContactForm Component
 *
 * Comprehensive contact form with validation and submission handling.
 * Collects project inquiry details and sends to configured endpoint.
 *
 * @component
 * @returns {JSX.Element} Rendered contact form
 *
 * @example
 * ```tsx
 * <ContactForm />
 * ```
 */
const ContactForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(TOAST_CONFIG.success.message, {
          duration: TOAST_CONFIG.success.duration,
          position: TOAST_CONFIG.success.position,
          style: TOAST_CONFIG.success.style,
        });
        trackContactFormSubmit(true);
        reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error(TOAST_CONFIG.error.message, {
        duration: TOAST_CONFIG.error.duration,
        position: TOAST_CONFIG.error.position,
        style: TOAST_CONFIG.error.style,
      });
      trackContactFormSubmit(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <Card
        elevation={0}
        sx={{
          position: "relative",
          borderRadius: 4,
          background: alpha(theme.palette.background.paper, 0.85),
          backdropFilter: "blur(20px)",
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          "@media (prefers-reduced-motion: reduce)": {
            transition: "none",
          },
          "&:hover": {
            borderColor: alpha(theme.palette.primary.main, 0.4),
            boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.25)}`,
          },
        }}
      >
        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          {/* Top-left gradient orb */}
          <Box
            sx={{
              position: "absolute",
              top: -100,
              left: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(theme.palette.vaporwave.pink, 0.25)} 0%, transparent 70%)`,
              filter: "blur(60px)",
            }}
          />
          {/* Bottom-right gradient orb */}
          <Box
            sx={{
              position: "absolute",
              bottom: -120,
              right: -120,
              width: 350,
              height: 350,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(theme.palette.vaporwave.blue, 0.2)} 0%, transparent 70%)`,
              filter: "blur(70px)",
            }}
          />
          {/* Center accent orb */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${alpha(theme.palette.vaporwave.purple, 0.15)} 0%, transparent 70%)`,
              filter: "blur(80px)",
            }}
          />
        </Box>

        {/* Form Content */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ position: "relative", zIndex: 1, p: { xs: 3, md: 5 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Your Name"
                error={!!errors.name}
                helperText={errors.name?.message}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& fieldset": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email Address"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& fieldset": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Subject"
                error={!!errors.subject}
                helperText={errors.subject?.message}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& fieldset": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="projectType"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.projectType}>
                <InputLabel>Project Type</InputLabel>
                <Select
                  {...field}
                  label="Project Type"
                  sx={{
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  {PROJECT_TYPE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.projectType && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {errors.projectType.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Budget Range</InputLabel>
                <Select
                  {...field}
                  label="Budget Range"
                  sx={{
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  {BUDGET_RANGE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Controller
            name="timeline"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Timeline</InputLabel>
                <Select
                  {...field}
                  label="Timeline"
                  sx={{
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  }}
                >
                  {TIMELINE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Project Description"
                multiline
                rows={6}
                error={!!errors.message}
                helperText={errors.message?.message || "Please provide details about your project"}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: alpha(theme.palette.background.paper, 0.5),
                    transition: "all 0.3s ease",
                    "& fieldset": {
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                      borderWidth: "1.5px",
                    },
                    "&:hover fieldset": {
                      borderColor: alpha(theme.palette.vaporwave.pink, 0.6),
                    },
                    "&.Mui-focused": {
                      background: alpha(theme.palette.background.paper, 0.7),
                      boxShadow: `0 0 0 3px ${alpha(theme.palette.vaporwave.blueGreen, 0.2)}`,
                      "& fieldset": {
                        borderColor: theme.palette.vaporwave.blueGreen,
                        borderWidth: "2px",
                      },
                    },
                  },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
            fullWidth
            sx={{
              py: 1.5,
              minHeight: "56px",
              fontSize: "1.1rem",
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.vaporwave.purple} 0%, ${theme.palette.vaporwave.pink} 50%, ${theme.palette.vaporwave.blue} 100%)`,
              boxShadow: `0 4px 12px ${alpha(theme.palette.vaporwave.purple, 0.3)}`,
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 8px 20px ${alpha(theme.palette.vaporwave.purple, 0.5)}`,
                background: `linear-gradient(135deg, ${theme.palette.vaporwave.purple} 0%, ${theme.palette.vaporwave.pink} 50%, ${theme.palette.vaporwave.blueGreen} 100%)`,
              },
              "&:active": {
                transform: "translateY(0)",
              },
              "&:disabled": {
                background: alpha(theme.palette.action.disabled, 0.3),
                color: theme.palette.text.disabled,
              },
              "@media (prefers-reduced-motion: reduce)": {
                transition: "none",
                "&:hover": {
                  transform: "none",
                },
              },
            }}
          >
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 4,
          textAlign: "center",
          p: 3,
          background: alpha(theme.palette.background.paper, 0.6),
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          transition: "all 0.3s ease",
          "&:hover": {
            background: alpha(theme.palette.background.paper, 0.8),
            borderColor: alpha(theme.palette.vaporwave.pink, 0.4),
          },
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Or email me directly at{" "}
          <Box
            component="a"
            href="mailto:victor.williams.dev@gmail.com"
            sx={{
              color: theme.palette.vaporwave.blueGreen,
              fontWeight: 600,
              textDecoration: "none",
              borderBottom: `2px solid ${alpha(theme.palette.vaporwave.blueGreen, 0.3)}`,
              transition: "all 0.3s ease",
              "&:hover": {
                color: theme.palette.vaporwave.pink,
                borderBottomColor: theme.palette.vaporwave.pink,
              },
            }}
          >
            victor.williams.dev@gmail.com
          </Box>
        </Typography>
      </Box>
    </Box>
      </Card>
    </>
  );
};

export default ContactForm;

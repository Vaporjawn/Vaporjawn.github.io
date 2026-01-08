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
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                <Select {...field} label="Project Type">
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
                <Select {...field} label="Budget Range">
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
                <Select {...field} label="Timeline">
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
              fontSize: "1.1rem",
              fontWeight: 600,
            }}
          >
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          Or email me directly at{" "}
          <a href="mailto:victor.williams.dev@gmail.com" style={{ color: "inherit", fontWeight: 600 }}>
            victor.williams.dev@gmail.com
          </a>
        </Typography>
      </Box>
    </Box>
    </>
  );
};

export default ContactForm;

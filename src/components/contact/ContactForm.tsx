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
import * as yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import toast, { Toaster } from "react-hot-toast";
import { trackContactFormSubmit } from "../../utils/analytics";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  email: yup.string().required("Email is required").email("Invalid email address"),
  subject: yup.string().required("Subject is required").min(5, "Subject must be at least 5 characters"),
  projectType: yup.string().required("Project type is required"),
  budget: yup.string(),
  timeline: yup.string(),
  message: yup.string().required("Message is required").min(20, "Message must be at least 20 characters"),
});

const ContactForm: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);

    try {
      // Replace with your form submission endpoint (Formspree, EmailJS, or custom backend)
      const formEndpoint = import.meta.env.VITE_FORM_ENDPOINT || "https://formspree.io/f/your-form-id";

      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thank you! I'll get back to you within 24-48 hours.", {
          duration: 4000,
          position: "top-center",
          style: {
            background: "#10b981",
            color: "#fff",
            fontWeight: 600,
          },
        });
        trackContactFormSubmit(true);
        reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      toast.error("Something went wrong. Please try again or email me directly.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
          fontWeight: 600,
        },
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
                  <MenuItem value="web-development">Web Development</MenuItem>
                  <MenuItem value="mobile-app">Mobile App</MenuItem>
                  <MenuItem value="full-stack">Full Stack Application</MenuItem>
                  <MenuItem value="consulting">Consulting</MenuItem>
                  <MenuItem value="maintenance">Maintenance & Support</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
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
                  <MenuItem value="less-than-5k">Less than $5,000</MenuItem>
                  <MenuItem value="5k-10k">$5,000 - $10,000</MenuItem>
                  <MenuItem value="10k-25k">$10,000 - $25,000</MenuItem>
                  <MenuItem value="25k-50k">$25,000 - $50,000</MenuItem>
                  <MenuItem value="50k-plus">$50,000+</MenuItem>
                  <MenuItem value="not-sure">Not Sure</MenuItem>
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
                  <MenuItem value="asap">ASAP</MenuItem>
                  <MenuItem value="1-3-months">1-3 Months</MenuItem>
                  <MenuItem value="3-6-months">3-6 Months</MenuItem>
                  <MenuItem value="6-plus-months">6+ Months</MenuItem>
                  <MenuItem value="flexible">Flexible</MenuItem>
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

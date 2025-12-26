import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeGesture } from "../../hooks/useSwipeGesture";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  rating: number;
  content: string;
  date: string;
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({
  testimonials,
  autoPlay = false,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrev,
  });

  // Auto-play functionality
  if (autoPlay && testimonials.length > 1) {
    setTimeout(handleNext, interval);
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box
      ref={swipeRef}
      sx={{
        position: "relative",
        maxWidth: 800,
        mx: "auto",
        py: 4,
      }}
    >
      {/* Navigation Buttons */}
      {testimonials.length > 1 && !isMobile && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: -60,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "action.hover" },
            }}
            aria-label="Previous testimonial"
          >
            <ArrowBackIos />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: -60,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "action.hover" },
            }}
            aria-label="Next testimonial"
          >
            <ArrowForwardIos />
          </IconButton>
        </>
      )}

      {/* Testimonial Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTestimonial.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            elevation={3}
            sx={{
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 2,
            }}
          >
            <CardContent>
              {/* Header */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  sx={{
                    width: 60,
                    height: 60,
                    mr: 2,
                    bgcolor: "primary.main",
                  }}
                >
                  {currentTestimonial.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {currentTestimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </Typography>
                </Box>
              </Box>

              {/* Rating */}
              <Box sx={{ mb: 2 }}>
                <Rating
                  value={currentTestimonial.rating}
                  readOnly
                  precision={0.5}
                />
              </Box>

              {/* Content */}
              <Typography
                variant="body1"
                sx={{
                  fontStyle: "italic",
                  mb: 2,
                  minHeight: 100,
                }}
              >
                "{currentTestimonial.content}"
              </Typography>

              {/* Date */}
              <Typography variant="caption" color="text.secondary">
                {new Date(currentTestimonial.date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                  }
                )}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Dots Indicator */}
      {testimonials.length > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
            gap: 1,
          }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentIndex(index)}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor:
                  index === currentIndex ? "primary.main" : "action.disabled",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2)",
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TestimonialsCarousel;

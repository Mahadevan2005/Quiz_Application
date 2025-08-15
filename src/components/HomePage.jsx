import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

// Optional: Particles Background (install react-tsparticles for extra effect)
// import Particles from "react-tsparticles";

export default function HomePage({ onStart }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Background Image with subtle scale animation */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.55) contrast(1.2)",
          zIndex: -2,
        }}
      />

      {/* Optional Particles */}
      {/* <Particles
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 50, density: { enable: true, area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.2 },
            size: { value: 2 },
            move: { enable: true, speed: 0.6 },
          },
        }}
        style={{ position: "absolute", inset: 0, zIndex: -1 }}
      /> */}

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3))",
          zIndex: -1,
        }}
      />

      {/* Hero Content */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 20 }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
                mb: 3,
                letterSpacing: "1px",
                lineHeight: 1.1,
              }}
            >
              Your Knowledge.{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Your Challenge.
              </span>
            </Typography>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 5,
                fontWeight: 400,
                maxWidth: 650,
                mx: "auto",
                opacity: 0.9,
                lineHeight: 1.6,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              15 hand-picked questions. 30 minutes. <br />
              Test your skills and see where you stand. <br />
              Are you ready to take the challenge?
            </Typography>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Stack direction="row" justifyContent="center">
              <Button
                variant="contained"
                size="large"
                onClick={onStart}
                sx={{
                  background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                  color: "#fff",
                  px: 8,
                  py: 2,
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  borderRadius: 2,
                  boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                    transform: "scale(1.05)",
                  },
                }}
              >
                Start Quiz
              </Button>
            </Stack>
          </motion.div>
        </motion.div>
      </Box>
    </Box>
  );
}

import { Card, CardContent, Typography, Stack, TextField, Button, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function StartPage({
  email,
  setEmail,
  emailError,
  onStart,
  loading,
  onBack
}) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at 20% 30%, rgba(58,123,213,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,99,72,0.4) 0%, transparent 60%), linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        position: "relative",
        overflow: "hidden",
        p: 2
      }}
    >
      {/* Decorative blurred blobs for extra premium feel */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          top: "10%",
          left: "10%",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "50%",
          filter: "blur(120px)",
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          bottom: "10%",
          right: "10%",
          background: "rgba(255,99,72,0.2)",
          borderRadius: "50%",
          filter: "blur(150px)",
          zIndex: 0
        }}
      />

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ zIndex: 1, width: "100%", maxWidth: 500 }}
      >
        <Card
          sx={{
            p: 3,
            borderRadius: 4,
            backgroundColor: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              gutterBottom
              textAlign="center"
              sx={{
                fontWeight: 800,
                letterSpacing: "1px",
                mb: 1
              }}
            >
              Global Quiz Challenge
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              textAlign="center"
              sx={{ opacity: 0.9, mb: 3 }}
            >
              15 questions. 30 minutes. Show the world your knowledge.
            </Typography>

            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError || "We'll use this only for this quiz session."}
                sx={{
                    "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                    "& fieldset": {
                        borderColor: "rgba(255,255,255,0.4)",
                    },
                    "&:hover fieldset": {
                        borderColor: "#ffd700", // golden yellow on hover
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#ffd700", // golden yellow on focus
                    },
                    "& input": {
                        color: "#ffffff", // pure white text
                        fontWeight: 500,
                    },
                    },
                    "& .MuiInputLabel-root": {
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ffd700", // golden yellow label on focus
                    },
                    "& .MuiFormHelperText-root": {
                    color: emailError ? "#ff6b6b" : "rgba(255,255,255,0.75)",
                    fontWeight: 400,
                    },
                }}
                />

              <Button
                variant="contained"
                size="large"
                onClick={onStart}
                disabled={loading}
                sx={{
                  background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                  color: "white",
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: 2,
                  "&:hover": {
                    background: "linear-gradient(90deg, #ff416c, #ff4b2b)"
                  }
                }}
              >
                {loading ? "Preparing..." : "Start Quiz"}
              </Button>

              <Button
                variant="outlined"
                onClick={onBack}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  "&:hover": {
                    borderColor: "white"
                  }
                }}
              >
                Back to Home
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}

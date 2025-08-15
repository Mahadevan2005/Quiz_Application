import { Box, Typography, Button, Stack, Card, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";

export default function ReportTable({ questions, answers, score, onRestart, email }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, sm: 4 },
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        color: "#fff",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, textAlign: "center" }}>
          Quiz Report
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.85, textAlign: "center" }}>
          {email} — Score: {score} / {questions.length}
        </Typography>
      </motion.div>

      {/* Questions */}
      <Stack spacing={3} sx={{ width: "100%", maxWidth: 800 }}>
        {questions.map((q, idx) => {
          const your = answers[idx];
          const correct = q.correct_answer;
          const isCorrect = your === correct;

          return (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                sx={{
                  borderRadius: 3,
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                  p: 2,
                  border: `1px solid ${isCorrect ? "limegreen" : "tomato"}`,
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    {idx + 1}. <span dangerouslySetInnerHTML={{ __html: q.question }} />
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Chip
                      label={<span dangerouslySetInnerHTML={{ __html: your ?? "<i>Not answered</i>" }} />}
                      color={isCorrect ? "success" : "error"}
                      variant="filled"
                    />
                    <Chip
                      label={<span dangerouslySetInnerHTML={{ __html: correct }} />}
                      color="info"
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Stack>

      {/* Restart Button */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={onRestart}
          sx={{
            mt: 6,
            px: 6,
            py: 1.8,
            borderRadius: 3,
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            "&:hover": {
              background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
              transform: "scale(1.05)",
            },
          }}
        >
          Restart Quiz
        </Button>
      </motion.div>
    </Box>
  );
}

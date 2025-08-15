import { Box, Typography, Button, Stack, Card, CardContent, Chip } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
        background: "linear-gradient(135deg, #f0f4ff, #d9e4ff)",
        color: "#1a1a1a",
      }}
    >
      {/* Header */}
      <motion.div initial={{ y: -40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}>
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
                  background: "#ffffff",
                  p: 2,
                  border: `2px solid ${isCorrect ? "#2196f3" : "#ff9800"}`,
                  boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                    {idx + 1}. <span dangerouslySetInnerHTML={{ __html: q.question }} />
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                    <Chip
                      icon={isCorrect ? <CheckCircleIcon /> : <CancelIcon />}
                      label={<span dangerouslySetInnerHTML={{ __html: your ?? "<i>Not answered</i>" }} />}
                      sx={{
                        backgroundColor: isCorrect ? "#e3f2fd" : "#fff3e0",
                        color: isCorrect ? "#2196f3" : "#ff9800",
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={<span dangerouslySetInnerHTML={{ __html: correct }} />}
                      sx={{
                        backgroundColor: "#f5f5f5",
                        color: "#616161",
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Stack>

      {/* Restart Button */}
      <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <Button
          onClick={onRestart}
          sx={{
            mt: 6,
            px: 6,
            py: 1.8,
            borderRadius: 3,
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(90deg, #3f51b5, #6573c3)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            "&:hover": {
              background: "linear-gradient(90deg, #6573c3, #3f51b5)",
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

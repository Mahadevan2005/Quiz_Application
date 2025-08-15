import React from "react";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";
import { motion } from "framer-motion";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
  }),
};

export default function QuestionCard({
  question,
  selected,
  onSelect,
  onPrev,
  onNext,
  isLast,
  isFirst,
  direction,
}) {
  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 4px 14px rgba(0,0,0,0.08)" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          {question.question}
        </Typography>

        <Stack spacing={1}>
          {question.options.map((option, idx) => (
            <Button
              key={idx}
              variant={selected === option ? "contained" : "outlined"}
              onClick={() => onSelect(option)}
              sx={{
                justifyContent: "flex-start",
                textAlign: "left",
                borderRadius: 2,
              }}
            >
              {option}
            </Button>
          ))}
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onPrev}
            disabled={isFirst}
            sx={{ flex: 1 }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={onNext}
            sx={{ flex: 1 }}
          >
            {isLast ? "Submit" : "Next"}
          </Button>
        </Stack>
      </Paper>
    </motion.div>
  );
}

import { Stack, Typography, LinearProgress, Button } from "@mui/material";
import { formatTime } from "../utils/helpers";

export default function TimerBar({ timeLeft, onSubmit }) {
  const total = 30 * 60; // 30 mins in seconds
  const progress = (timeLeft / (total * 1000)) * 100;

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      <Typography variant="h6">⏳ {formatTime(timeLeft)}</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{ flex: 1, mx: 2, height: 8, borderRadius: 5 }}
      />
      <Button variant="contained" color="error" onClick={onSubmit}>
        Submit
      </Button>
    </Stack>
  );
}

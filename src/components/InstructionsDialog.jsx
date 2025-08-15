import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function InstructionsDialog({ open, onStart, onCancel }) {
  const rules = [
    "1. You have 30 minutes to complete the quiz.",
    "2. Once started, the timer will not pause.",
    "3. Do not refresh or close the browser during the quiz.",
    "4. Questions can be navigated in any order.",
    "5. Auto-submit will happen when time runs out.",
    "6. Once submitted, answers cannot be changed.",
    "7. Review your answer before submitting it.",
    "8. All the best!!!"
  ];

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>Quiz Instructions</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Please read the following instructions carefully before starting the quiz:
        </Typography>
        <List dense>
          {rules.map((rule, i) => (
            <ListItem key={i}>
              <ListItemText primary={rule} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onStart} variant="contained" color="primary">
          Start Quiz
        </Button>
      </DialogActions>
    </Dialog>
  );
}

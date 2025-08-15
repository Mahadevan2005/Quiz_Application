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
    "You have 30 minutes to complete the quiz.",
    "Once started, the timer will not pause.",
    "Do not refresh or close the browser during the quiz.",
    "Questions can be navigated in any order.",
    "Auto-submit will happen when time runs out.",
    "Once submitted, answers cannot be changed.",
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

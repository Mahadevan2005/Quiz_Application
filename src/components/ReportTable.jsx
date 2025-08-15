import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

export default function ReportTable({ questions, answers, score, onRestart, email }) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom textAlign="center">
          Quiz Report
        </Typography>
        <Typography variant="h6" textAlign="center" gutterBottom>
          {email} — Score: {score} / {questions.length}
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Your Answer</TableCell>
              <TableCell>Correct Answer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q, idx) => {
              const your = answers[idx];
              const ok = your === q.correct_answer;
              return (
                <TableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell><span dangerouslySetInnerHTML={{ __html: q.question }} /></TableCell>
                  <TableCell style={{ color: ok ? "green" : "red" }}>
                    <span dangerouslySetInnerHTML={{ __html: your ?? "<i>Not answered</i>" }} />
                  </TableCell>
                  <TableCell>
                    <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Button variant="contained" onClick={onRestart} sx={{ mt: 3, borderRadius: 2 }}>
          Restart Quiz
        </Button>
      </CardContent>
    </Card>
  );
}

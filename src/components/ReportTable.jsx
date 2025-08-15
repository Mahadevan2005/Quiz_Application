import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Chip } from "@mui/material";

export default function ReportTable({ questions, answers, score, onRestart, email }) {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          borderRadius: 4,
          boxShadow: "0 12px 36px rgba(0,0,0,0.15)",
          background: "linear-gradient(145deg, #1e1e1e, #2c2c2c)",
          color: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 800, mb: 1 }}>
            Quiz Report
          </Typography>
          <Typography variant="h6" textAlign="center" gutterBottom sx={{ mb: 3, opacity: 0.85 }}>
            {email} — Score: {score} / {questions.length}
          </Typography>

          {/* Responsive Table */}
          <Box sx={{ overflowX: "auto" }}>
            <Table size="small" sx={{ minWidth: 600 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
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
                    <TableRow key={idx} sx={{ "&:nth-of-type(odd)": { backgroundColor: "rgba(255,255,255,0.05)" } }}>
                      <TableCell>{idx + 1}</TableCell>
                      <TableCell sx={{ maxWidth: 250, wordBreak: "break-word" }}>
                        <span dangerouslySetInnerHTML={{ __html: q.question }} />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={<span dangerouslySetInnerHTML={{ __html: your ?? "<i>Not answered</i>" }} />}
                          color={ok ? "success" : "error"}
                          variant="filled"
                          size="small"
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: 200, wordBreak: "break-word" }}>
                        <span dangerouslySetInnerHTML={{ __html: q.correct_answer }} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>

          {/* Restart Button */}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="contained"
              onClick={onRestart}
              sx={{
                px: 5,
                py: 1.5,
                borderRadius: 3,
                fontSize: { xs: "0.9rem", sm: "1.1rem" },
                background: "linear-gradient(90deg, #ff4b2b, #ff416c)",
                "&:hover": {
                  background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
                },
              }}
            >
              Restart Quiz
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

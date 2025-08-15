import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container, CircularProgress, Grid, Alert } from "@mui/material";
import { shuffle, isValidEmail } from "./utils/helpers";
import HomePage from "./components/HomePage";
import StartPage from "./components/StartPage";
import TimerBar from "./components/TimerBar";
import Navigator from "./components/Navigator";
import QuestionCard from "./components/QuestionCard";
import ReportTable from "./components/ReportTable";
import ConfirmationDialog from "./components/ConfirmationDialog";
import InstructionsDialog from "./components/InstructionsDialog";
import localQuestions from "./questions.json"; // fallback
import { AnimatePresence, motion } from "framer-motion";

const TOTAL_QUESTIONS = 15;
const QUIZ_DURATION_MS = 30 * 60 * 1000; // 30 minutes

export default function App() {

  const [page, setPage] = useState("home"); // "home" | "start" | "quiz" | "report"
  const [stage, setStage] = useState("home"); // default is home page
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(0);
  const visitedRef = useRef(new Set([0]));
  const [renderTick, setRenderTick] = useState(0);

  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_MS);
  const timerRef = useRef(null);
  const quizStartRef = useRef(null);

  const [score, setScore] = useState(0);

  const visited = useMemo(() => new Set(visitedRef.current), [renderTick]);
  const attempted = useMemo(() => new Set(Object.keys(answers).map(Number)), [answers]);

  // Dialog states
  const [showInstructions, setShowInstructions] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  async function startQuiz() {
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setLoading(true);
    setFetchError("");

    let items = [];

    try {
      const res = await fetch(`https://opentdb.com/api.php?amount=${TOTAL_QUESTIONS}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      items = (data.results || [])
        .slice(0, TOTAL_QUESTIONS)
        .map((q) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          options: shuffle([q.correct_answer, ...q.incorrect_answers]),
          type: q.type,
          difficulty: q.difficulty,
          category: q.category,
        }));

      if (items.length !== TOTAL_QUESTIONS) throw new Error("API did not return 15 questions.");
    } catch (e) {
      try {
        items = (localQuestions.results || [])
          .slice(0, TOTAL_QUESTIONS)
          .map((q) => ({
            question: q.question,
            correct_answer: q.correct_answer,
            options: shuffle([q.correct_answer, ...q.incorrect_answers]),
            type: q.type,
            difficulty: q.difficulty,
            category: q.category,
          }));
        if (items.length !== TOTAL_QUESTIONS) throw new Error("Local fallback missing 15 questions.");
        setFetchError("Using local questions (API temporarily unavailable / rate-limited).");
      } catch {
        setFetchError("Failed to load questions from API and local fallback.");
      }
    } finally {
      setQuestions(items); // set questions here
      setLoading(false);

      if (items.length) {
        setStage("quiz"); // only now move to quiz
        quizStartRef.current = Date.now();
        setTimeLeft(QUIZ_DURATION_MS);
        timerRef.current = setInterval(() => {
          const elapsed = Date.now() - quizStartRef.current;
          const left = QUIZ_DURATION_MS - elapsed;
          setTimeLeft(left);
          if (left <= 0) {
            clearInterval(timerRef.current);
            handleSubmit();
          }
        }, 1000);
      }
    }
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function goTo(index) {
    if (index < 0 || index >= questions.length) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    visitedRef.current.add(index);
    setRenderTick((t) => t + 1);
  }

  const next = () => {
    setDirection(1);
    if (current < questions.length - 1) goTo(current + 1);
  };

  const prev = () => {
    setDirection(-1);
    if (current > 0) goTo(current - 1);
  };

  function selectAnswer(option) {
    setAnswers((prev) => ({ ...prev, [current]: option }));
  }

  function handleSubmit() {
    if (timerRef.current) clearInterval(timerRef.current);

    let s = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct_answer) s++;
    });
    setScore(s);
    setStage("report");
  }

  function restart() {
    setQuestions([]);
    setAnswers({});
    visitedRef.current = new Set([0]);
    setRenderTick((t) => t + 1);
    setCurrent(0);
    setScore(0);
    setTimeLeft(QUIZ_DURATION_MS);
    setStage("start");
  }

  function handleStartConfirmed() {
    setShowInstructions(false);
    startQuiz();
  }

  function handleSubmitConfirmed() {
    setShowSubmitConfirm(false);
    handleSubmit();
  }

  // --- Rendering ---
  if (stage === "home") {
    return <HomePage onStart={() => setStage("start")} />;
  }

  if (stage === "start") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="start"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <StartPage
            email={email}
            setEmail={setEmail}
            emailError={emailError}
            onStart={() => setShowInstructions(true)}
            onBack={() => setStage("home")}
            loading={loading}
          />
        </motion.div>

        <InstructionsDialog
          open={showInstructions}
          onCancel={() => setShowInstructions(false)}
          onStart={handleStartConfirmed}
        />
      </AnimatePresence>
    );
  }

  if (stage === "quiz") {
    if (loading) {
      return (
        <Container sx={{ mt: 6, textAlign: "center" }}>
          <CircularProgress />
          <Typography mt={2}>Loading questions...</Typography>
        </Container>
      );
    }

    if (!questions.length) {
      return (
        <Container sx={{ mt: 6, textAlign: "center" }}>
          <Alert severity="error">Failed to load questions.</Alert>
        </Container>
      );
    }

    const q = questions[current];
    const selected = answers[current];

    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <TimerBar timeLeft={timeLeft} onSubmit={() => setShowSubmitConfirm(true)} />

        {fetchError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {fetchError}
          </Alert>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={3}>
            <Navigator
              total={questions.length}
              current={current}
              visited={visited}
              attempted={attempted}
              goTo={goTo}
            />
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <QuestionCard
                key={q.question}
                question={q}
                selected={selected}
                onSelect={selectAnswer}
                onPrev={prev}
                onNext={current === questions.length - 1 ? () => setShowSubmitConfirm(true) : next}
                isLast={current === questions.length - 1}
                isFirst={current === 0}
                direction={direction}
              />
            </AnimatePresence>
          </Grid>
        </Grid>

        <ConfirmationDialog
          open={showSubmitConfirm}
          title="Submit Quiz"
          message="Are you sure you want to submit your answers? You will not be able to change them afterward."
          confirmText="Yes, Submit"
          cancelText="Cancel"
          onCancel={() => setShowSubmitConfirm(false)}
          onConfirm={handleSubmitConfirmed}
        />
      </Container>
    );
  }



  if (stage === "report") {
    return (
      <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div key="report" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <ReportTable
              questions={questions}
              answers={answers}
              score={score}
              onRestart={restart}
              email={email}
            />
          </motion.div>
        </AnimatePresence>
      </Container>
    );
  }

  const q = questions[current];
  const selected = answers[current];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <TimerBar timeLeft={timeLeft} onSubmit={() => setShowSubmitConfirm(true)} />

      {fetchError && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {fetchError}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={3}>
          <Navigator
            total={questions.length}
            current={current}
            visited={visited}
            attempted={attempted}
            goTo={goTo}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={9}>
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <QuestionCard
            key={q.question}
            question={q}
            selected={selected}
            onSelect={selectAnswer}
            onPrev={prev}
            onNext={current === questions.length - 1 ? () => setShowSubmitConfirm(true) : next}
            isLast={current === questions.length - 1}
            isFirst={current === 0}
            direction={direction}
          />
        </AnimatePresence>
      </Grid>
      </Grid>

      <ConfirmationDialog
        open={showSubmitConfirm}
        title="Submit Quiz"
        message="Are you sure you want to submit your answers? You will not be able to change them afterward."
        confirmText="Yes, Submit"
        cancelText="Cancel"
        onCancel={() => setShowSubmitConfirm(false)}
        onConfirm={handleSubmitConfirmed}
      />
    </Container>
  );
}

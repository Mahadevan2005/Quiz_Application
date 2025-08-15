# QuizMaster 

**QuizMaster** is a **dynamic and interactive quiz application** built with **React** and **Material-UI**, designed to provide an **engaging and fun way to test your knowledge**.  

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Project Structure](#project-structure)  
- [Installation & Setup](#installation--setup)  
- [Usage](#usage)
- [Live in action](#live-in-action)  

---

## Project Overview

QuizMaster allows users to **test their knowledge in a time-bound environment**. Users can attempt quizzes, track their progress with a **real-time timer**, and view a **detailed report** showing correct and incorrect answers with **intuitive visual feedback**.  

The app is built for **high usability and engagement**, combining **animation, color cues, and responsive design** for an enjoyable experience.

---

## Tech Stack

- **Frontend:** React, Material-UI, Framer Motion (animations)  
- **State Management:** React Hooks  
- **Styling:** MUI System + Custom CSS  
- **Deployment Ready:** Vercel

The app is fully **responsive** and **lightning-fast**, featuring:  
- A **30-minute countdown timer**  
- **Detailed, visually appealing quiz reports**  
- **Mobile, tablet, and desktop compatibility**  

---

## Project Structure

```
/
|
├── src/
│ ├── components/
│ │ ├── HomePage.jsx # Landing page with start button
| | ├── ConfirmationDialog.jsx # Instructions before submitting the test
| | ├── QuestionCard.jsx # Question card component
| | ├── InstructionDialog.jsx # Instructions before starting the test
| | ├── Navigator.jsx # Component for navigation
│ │ ├── StartPage.jsx # Quiz questions and timer
│ │ ├── TimerBar.jsx # Animated countdown timer
│ │ └── ReportTable.jsx # Quiz results with feedback
│ ├── utils/
│ │ └── helpers.js # Helper functions like formatTime
│ ├── App.jsx
│ └── main.jsx
├── package.json
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Mahadevan2005/Quiz_Application.git
cd quiz-application-main
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
# By default frontend will run at
http://localhost:5173
```

---

## Usage
- **Landing Page:** Click Start Quiz to begin.
- **Credentials Page:** Enter your E-mail, read the instructions and begin the test.
- **Quiz Page:** Answer questions within the 30-minute timer.
- **Report Page:** View detailed results by comparing your answers with correct answers.

---

## Screenshots

---
<h3 align="center">
Thank You ❤️
</h3>
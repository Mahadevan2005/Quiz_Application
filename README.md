# QuizMaster 

**QuizMaster** is a **dynamic and interactive quiz application** built with **React** and **Material-UI**, designed to provide an **engaging and fun way to test your knowledge**.  

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack) 
- [Features](#features)  
- [Project Structure](#project-structure)  
- [Installation & Setup](#installation--setup)  
- [Usage](#usage)
- [Screenshots](#screenshots)  

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

---

## Features

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
![Landing Page](https://github.com/user-attachments/assets/0acc2c9a-61b8-470f-9ff0-d546ef190952)
![Login Page](https://github.com/user-attachments/assets/87dd1d31-aadc-4768-979e-001f935e284f)
![Quiz Page](https://github.com/user-attachments/assets/e77dec9c-a994-436e-a3a1-b57ae62c8bf8)
![Quiz Page](https://github.com/user-attachments/assets/471ade4e-c11d-46e3-845d-04c8b70700a8)

---
<h3 align="center">
Thank You ❤️
</h3>
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Expanded Question Bank (sample – can scale to 500+)
const questionBank = [
  {
    category: "Electrical",
    question: "Service amperage and voltage must be described by the inspector.",
    options: ["True", "False"],
    answer: "True",
    explanation: "NC standards require reporting service amperage and voltage.",
  },
  {
    category: "Electrical",
    question: "Aluminum branch wiring should be:",
    options: ["Ignored", "Reported", "Removed"],
    answer: "Reported",
    explanation: "Inspectors report, not repair conditions.",
  },
  {
    category: "Roofing",
    question: "Flashing is used to:",
    options: ["Decorate roof", "Prevent water intrusion", "Support structure"],
    answer: "Prevent water intrusion",
    explanation: "Flashing directs water away from joints.",
  },
  {
    category: "HVAC",
    question: "A dirty air filter can cause:",
    options: ["Better airflow", "System strain", "Lower energy use"],
    answer: "System strain",
    explanation: "Restricted airflow stresses HVAC systems.",
  },
];

export default function StudyApp() {
  const [mode, setMode] = useState("menu");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredQuestions =
    selectedCategory === "All"
      ? questionBank
      : questionBank.filter((q) => q.category === selectedCategory);

  const handleAnswer = (option) => {
    if (option === filteredQuestions[current].answer) {
      setScore(score + 1);
    }
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setShowAnswer(false);
    setCurrent(current + 1);
  };

  const reset = () => {
    setCurrent(0);
    setScore(0);
    setShowAnswer(false);
  };

  if (mode === "menu") {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">NC Home Inspector Exam Prep</h1>

        <div className="grid gap-4">
          <Button onClick={() => setMode("quiz")}>Start Practice Quiz</Button>
          <Button onClick={() => setMode("exam")}>Exam Simulation (Timed)</Button>
          <Button onClick={() => setMode("flashcards")}>Flashcards</Button>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">Select Category</h2>
          <select
            className="p-2 border rounded"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All</option>
            <option>Electrical</option>
            <option>Roofing</option>
            <option>HVAC</option>
          </select>
        </div>
      </div>
    );
  }

  if (mode === "flashcards") {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold mb-4">Flashcards</h2>
        <Card>
          <CardContent className="p-6">
            <p className="mb-4">{filteredQuestions[current].question}</p>
            {showAnswer && (
              <p className="font-semibold text-green-600">
                {filteredQuestions[current].answer}
              </p>
            )}
            <div className="mt-4 space-x-2">
              <Button onClick={() => setShowAnswer(true)}>Show Answer</Button>
              <Button onClick={nextQuestion}>Next</Button>
            </div>
          </CardContent>
        </Card>
        <Button className="mt-4" onClick={() => setMode("menu")}>Back</Button>
      </div>
    );
  }

  if (mode === "quiz" || mode === "exam") {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-xl font-bold mb-4">
          {mode === "exam" ? "Exam Mode" : "Practice Quiz"}
        </h2>

        {current < filteredQuestions.length ? (
          <Card>
            <CardContent className="p-4">
              <p className="mb-4">
                {filteredQuestions[current].question}
              </p>

              <div className="space-y-2">
                {filteredQuestions[current].options.map((opt, idx) => (
                  <Button key={idx} onClick={() => handleAnswer(opt)}>
                    {opt}
                  </Button>
                ))}
              </div>

              {showAnswer && (
                <div className="mt-4">
                  <p className="font-semibold">
                    Correct: {filteredQuestions[current].answer}
                  </p>
                  <p className="text-sm">
                    {filteredQuestions[current].explanation}
                  </p>
                  <Button className="mt-2" onClick={nextQuestion}>
                    Next
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl mb-2">Final Score</h3>
              <p className="text-lg">
                {score} / {filteredQuestions.length}
              </p>
              <div className="mt-4 space-x-2">
                <Button onClick={reset}>Retry</Button>
                <Button onClick={() => setMode("menu")}>Menu</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

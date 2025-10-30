import React, { useState } from "react";
import { submitQuiz } from "../api";

const QuizTab = () => {
  const [userId, setUserId] = useState("");
  const [quizId, setQuizId] = useState("");
  const [answers, setAnswers] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz({ userId, quizId, answers });
      setStatus("Quiz submitted: " + JSON.stringify(res));
    } catch (err) {
      setStatus("Quiz failed: " + err.message);
    }
  };

  return (
    <div>
      <h2 className="p-6 rounded-lg bg-purple-500 text-white">Submit Quiz</h2>
      <input
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <input
        placeholder="Quiz ID"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <textarea
        placeholder="Answers JSON"
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
        className="border p-1 mb-1 w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit Quiz
      </button>
      <p className="mt-2">{status}</p>
    </div>
  );
};

export default QuizTab;

import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";  
import NewQuestionForm from "./NewQuestionForm";  // Import the new form component

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions)
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
      }
    });
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <NewQuestionForm onAddQuestion={handleAddQuestion} />
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

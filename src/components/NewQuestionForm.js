import React, { useState } from "react";

function NewQuestionForm({ onAddQuestion }) {
  const [newQuestion, setNewQuestion] = useState({
    prompt: "",
    answers: ["", "", "", ""], // Placeholder for answers
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Make sure the question has the required fields
    if (newQuestion.prompt) {
      fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      })
        .then((res) => res.json())
        .then((data) => {
          onAddQuestion(data); // Pass the new question back to the parent
          setNewQuestion({ prompt: "", answers: ["", "", "", ""] }); // Reset form
        });
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input
          type="text"
          name="prompt"
          value={newQuestion.prompt}
          onChange={handleChange}
        />
      </label>
      <br />
      {newQuestion.answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            name={`answer${index}`}
            value={answer}
            onChange={(e) => {
              const newAnswers = [...newQuestion.answers];
              newAnswers[index] = e.target.value;
              setNewQuestion({ ...newQuestion, answers: newAnswers });
            }}
          />
        </label>
      ))}
      <br />
      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;

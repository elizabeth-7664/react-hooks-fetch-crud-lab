// QuestionItem.js
import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const handleAnswerChange = (e) => {
    // Create an updated question object with the new correct answer
    const updatedQuestion = {
      ...question,
      correctAnswer: e.target.value,
    };
    onUpdate(updatedQuestion); // Call the onUpdate function passed as prop
  };

  return (
    <li>
      <h3>{question.prompt}</h3>
      <div>
        <label htmlFor={`answer-1-${question.id}`}>Answer 1</label>
        <input
          id={`answer-1-${question.id}`}
          type="text"
          value={question.answer1}
          readOnly
        />
      </div>
      <div>
        <label htmlFor={`answer-2-${question.id}`}>Answer 2</label>
        <input
          id={`answer-2-${question.id}`}
          type="text"
          value={question.answer2}
          readOnly
        />
      </div>
      <div>
        <label htmlFor={`correct-answer-${question.id}`}>Correct Answer</label>
        <select
          id={`correct-answer-${question.id}`}
          value={question.correctAnswer}
          onChange={handleAnswerChange} // Handle change of correct answer
        >
          <option value="1">Answer 1</option>
          <option value="2">Answer 2</option>
          <option value="3">Answer 3</option>
        </select>
      </div>
      <button onClick={() => onDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

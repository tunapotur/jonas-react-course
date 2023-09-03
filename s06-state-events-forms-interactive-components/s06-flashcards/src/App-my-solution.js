import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <FlashCards />
    </div>
  );
}

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element",
  },
];

function FlashCards() {
  // create new list with isClicked property
  const [questionList, setQuestionList] = useState(
    questions.map((question) => ({ ...question, isClicked: false }))
  );

  // question click event handler function
  /**
   * When a question is clicked,
   * this function gets the id of the question
   * and changes the question which is clicked to reverse
   * and other questions changed to false
   */
  function handleClickQuestion(id) {
    setQuestionList((questionList) =>
      questionList.map((question) =>
        question.id === id
          ? { ...question, isClicked: !question.isClicked }
          : { ...question, isClicked: false }
      )
    );
  }

  return (
    <div className="flashcards">
      {questionList.map((question) => (
        <Question
          key={question.id}
          question={question}
          onClickQuestion={handleClickQuestion}
        />
      ))}
    </div>
  );
}

function Question({ question, onClickQuestion }) {
  return (
    <div
      className={`${question.isClicked ? "selected" : ""}`}
      key={question.id}
      onClick={() => onClickQuestion(question.id)}
    >
      <p>{question.isClicked ? question.answer : question.question}</p>
    </div>
  );
}

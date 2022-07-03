import React from "react";
import Question from "./components/Question";
import { nanoid } from "nanoid";
export default function App() {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) =>
        setQuestions(
          data.results.map((item) => {
            item.question = item.question.replaceAll("&#039;", "'");
            item.question = item.question.replaceAll("&quot;", '"');
            item.question = item.question.replaceAll("&eacute;","é");
            return item;
          })
        )
      );
  }, []);

  function answersPerQuestion(question) {
    console.log("app")
    const answers = []
    const auxQuestion = questions.find((item) => item.question === question);
    answers.push({ answer: auxQuestion.correct_answer, rigth: true })
    auxQuestion.incorrect_answers.map((item) =>
      answers.push({ answer: item, rigth: false })
    );

    console.log(typeof answers)
    return answers;
  }

  const questionList = questions.map((question) => {
    return (
      <Question
        question={question.question}
        answersList={answersPerQuestion(question.question)}
      />
    );
  });

  return <div>{questionList}</div>;
}

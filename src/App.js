import React from "react";
import Question from "./components/Question";
export default function App() {
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results.map(
        (item) => {
        item.question = item.question.replaceAll("&#039;","'")
        item.question = item.question.replaceAll("&quot;","\"")
         return item
        }
      )))
  },[])

  const questionList = questions.map((question) => {
    return <Question question={question.question} />;
  });

  return (
    <div>
      <Question />
      {questionList}
    </div>
  );
}

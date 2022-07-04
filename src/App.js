import React from "react";
import Question from "./components/Question";
import { nanoid } from "nanoid";
export default function App() {
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [checkAnswer, setCheckAnswer] = React.useState(false);
  const [playAgain, setPlayAgain] = React.useState(false);

  console.log("app");

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        const auxData = data.results;
        setQuestions(
          auxData.map((item) => {
            const auxQuest = {
              question: changeHTMLtoString(item.question),
              category: item.category,
              type: item.type,
              difficulty: item.difficulty,
            };
            return auxQuest;
          })
        );
        setAnswers(
          auxData.map((question) => {
            const answers = [];
            answers.push({
              question: changeHTMLtoString(question.question),
              answer: changeHTMLtoString(question.correct_answer),
              correct: true,
              isHeld: false,
            });
            question.incorrect_answers.map((item) =>
              answers.push({
                question: changeHTMLtoString(question.question),
                answer: changeHTMLtoString(item),
                correct: false,
                isHeld: false,
              })
            );

            return answers.sort(() => Math.random() - 0.5);
          })
        );
      });
  }, [playAgain]);

  function changeHTMLtoString(question) {
    const aux = question
      .replaceAll("&#039;", "'")
      .replaceAll("&quot;", '"')
      .replaceAll("&eacute;", "é")
      .replaceAll("&Eacute;", "É")
      .replaceAll("&amp;", "&")
      .replaceAll("&deg;", "°")
      .replaceAll("&aacute;", "á")
      .replaceAll("&Aacute;", "Á")
      .replaceAll("&lt;", "<")
      .replaceAll("&Uuml;", "Ü")
      .replaceAll("&uuml;","ü")
      .replaceAll("&ldquo;","“")
      .replaceAll("&rdquo;","”")

    return aux;
  }
  function handleAnswer(question, answer) {
    //cambia el valor isHeld en la respectiva respuesta
    const auxArr = [];
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0].question === question) {
        const auxAns = [];
        for (let j = 0; j < answers[i].length; j++) {
          if (answers[i][j].answer === answer) {
            auxAns.push({ ...answers[i][j], isHeld: !answers[i][j].isHeld });
          } else {
            auxAns.push({ ...answers[i][j], isHeld: false });
          }
        }
        auxArr.push(auxAns);
      } else {
        auxArr.push(answers[i]);
      }
    }
    setAnswers(auxArr);
  }

  function answersPerQuestion(question) {
    //answers es un arreglo de arreglos
    //[ [preguntas_question1 ] [preguntas_questoin2]]
    for (let i = 0; i < answers.length; i++) {
      if (answers[i][0].question === question) {
        return answers[i];
      }
    }
  }


  const questionList = questions.map((question) => {
    return (
      <>
        <Question
          key={nanoid()}
          question={question.question}
          answers={answersPerQuestion(question.question)}
          handleAnswer={handleAnswer}
          checkAnswer={checkAnswer}
        />
      </>
    );
  });
  function countRightAnswers(){
    let count = 0;
    for (let i = 0; i < answers.length; i++) {
      for (let j = 0; j < answers[i].length; j++) {
        if (answers[i][j].correct && answers[i][j].isHeld) {
          count++;
        }
      }
    }
    return count;
  }

  function handleCheckAnswer() {
    setCheckAnswer(prevState => !prevState)
    console.log("check answuer", checkAnswer)
  }
  function handlePlayAgain() {
    setPlayAgain(prevState => !prevState)
    setCheckAnswer(prevState => !prevState)
    console.log("check play again", playAgain)
  }

  return (
    <div>
      <div>{questionList}</div>
      { checkAnswer
        ?
        <div>
          <div>You scored {countRightAnswers()}/5 correct answers</div>
          <button className="button"
            onClick={handlePlayAgain}>
            Play again 
          </button>
        </div>
        :
        <button className="button" 
        onClick={handleCheckAnswer}>
        Check answers
      </button>
      }
      
    </div>
  );
}

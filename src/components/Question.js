import React from "react";

export default function Question(props) {
  // console.log("question",props.answers);

  const answers = props.answers.map((item) => {
    const styles = {};

    if (props.checkAnswer) {
      if (item.correct) {
        styles.backgroundColor = "#94D7A2"//green
        styles.border = "none";
      } else if (item.isHeld && item.correct===false) {
        styles.backgroundColor = "#F8BCBC";//red
        styles.border = "none";
        styles.opacity= 0.5;
      } else {
        styles.backgroundColor = "white";
        styles.opacity= 0.5;
      }
    } else {
      styles.backgroundColor = item.isHeld ? "#D6DBF5" : "white";
      styles.border = item.isHeld ? "none" : "0.04rem solid #4d5b9e";
    }

    return (
      <div
        className="answer"
        style={styles}
        onClick={() => props.handleAnswer(item.question, item.answer)}
      >
        {item.answer}
      </div>
    );
  });

  return (
    <div className="questionContainer">
      <h2 className="question">{props.question}</h2>
      <div className="answerContainer">
        {answers}
      </div>
      <hr className="hr"></hr>
    </div>
  );
}

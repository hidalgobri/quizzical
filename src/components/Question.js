import React from "react";

export default function Question(props) {
  // console.log("question",props.answers);

  const answers = props.answers.map((item) => {
    const styles = {};
    if (props.checkAnswer && item.correct && item.isHeld === false) {
      styles.backgroundColor = "#F8BCBC";
      styles.border = "none";
    } else {
      styles.backgroundColor = item.isHeld ? "#D6DBF5" : "white";
      styles.border = item.isHeld ? "none" : "0.04rem solid #4d5b9e";
    }

    return (
      <span
        className="answerBox"
        style={styles}
        onClick={() => props.handleAnswer(item.question, item.answer)}
      >
        {item.answer}
      </span>
    );
  });

  return (
    <div>
      <h2>{props.question}</h2>
      {answers}
    </div>
  );
}

import React from "react";

export default function Question(props) {

  // console.log("question",props.answers);

  const answers = props.answers.map((item) => {
    const styles = {
      backgroundColor: item.isHeld ? "#D6DBF5" : "white",

    };

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

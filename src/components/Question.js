import React from "react";

export default function Question(props) {
  // console.log("question",props.answers);

  const answers = props.answers.map((item) => {
    const styles = {};
    
    if (props.checkAnswer) {
      if (item.isHeld === false && item.correct) {
        styles.backgroundColor = "#F8BCBC";
        styles.border = "none";
      } else if ( item.isHeld && item.correct) {
        styles.backgroundColor = "#94D7A2";
        styles.border = "none";
      } else{
        styles.backgroundColor = "white";
      }   
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

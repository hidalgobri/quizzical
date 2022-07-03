import React from "react";

export default function Question(props) {
  const answer = props.incorrect_answers.map((answer) => 
     (<div className="answer_box"> {answer}</div>
  ));
  // answer.push(<div className="answer_box">{props.correct_answer}</div>);

  return (
    <div>
      <h2>{props.question}</h2>
      {answer}
    </div>
  );
}

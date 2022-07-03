import React from "react";

export default function Question(props) {

  props.answersList.map(  item => console.log(item))
  
  console.log("question")
  console.log(props.answersList)
  return (
    <div>
      <h2>{props.question}</h2>
     
    </div>
  );
}

import React, { useState } from "react";
import { operators } from "../../constants";
import QuizCard from "../QuizCard/QuizCard";
import classes from "./Screen.module.scss";

const Screen = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const onAdd = (question) => {
    console.log(question);
    setQuestionList((prev) => {
      return [...prev, question];
    });
  };
  if (!isStarted) {
    return (
      <div className={classes.screen + " v-to-center"}>
        <div
          className={classes["start-btn"] + " to-center"}
          onClick={() => setIsStarted(true)}
        >
          Start Quiz
        </div>
      </div>
    );
  }
  const score = questionList.filter((item) => item.isCorrect).length;

  return (
    <div className={classes.screen + " v-to-center"}>
      {questionList.length !== 20 && <QuizCard onAdd={onAdd} />}

      {questionList.length === 20 && (
        <ol>
          {questionList.map((item, i) => {
            return (
              <li key={i}>
                <p style={{ color: item.isCorrect ? "black" : "red" }}>{`${
                  item.a
                } ${operators[item.operator]} ${item.b} = ${item.answer}`}</p>
              </li>
            );
          })}
        </ol>
      )}

      <div className={classes["correct-count"]}>
        <div>
          {questionList.length === 20 && "Final"} Score: {score}
        </div>
      </div>
    </div>
  );
};

export default Screen;

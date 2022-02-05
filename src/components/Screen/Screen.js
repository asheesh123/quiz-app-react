import React, { useRef, useState } from "react";
import { operators, updateOperators } from "../../constants";
import QuizCard from "../QuizCard/QuizCard";
import classes from "./Screen.module.scss";

const Screen = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  const addRef = useRef();
  const subRef = useRef();
  const mulRef = useRef();
  const divRef = useRef();
  const [noOfQuestions, setNoOfQuestions] = useState();
  const [maxRange, setMaxRange] = useState();
  const onAdd = (question) => {
    setQuestionList((prev) => {
      return [...prev, question];
    });
  };

  if (!isStarted) {
    return (
      <div className={classes.screen + " v-to-center"}>
        <div className={classes["dynamic-values"] + " v-to-center"}>
          <input
            placeholder="no. of questions you want to go with!(default is 20)"
            type={"number"}
            onChange={(e) => setNoOfQuestions(+e.target.value)}
          />
          <br />
          <input
            placeholder="max range of operands(default is 10)"
            type={"number"}
            onChange={(e) => setMaxRange(+e.target.value)}
          />
          <br />
          <span style={{ marginBottom: "0.5rem" }}>Operators</span>
          <ul className={classes.operators + " to-center"}>
            <li className="to-center">
              <label>+</label>
              <input
                type={"checkbox"}
                name="add"
                ref={addRef}
                defaultChecked={true}
              />
            </li>
            <li className="to-center">
              <label>-</label>
              <input
                type={"checkbox"}
                name="sub"
                ref={subRef}
                defaultChecked={true}
              />
            </li>
            <li className="to-center">
              <label>*</label>
              <input
                type={"checkbox"}
                name="mul"
                ref={mulRef}
                defaultChecked={true}
              />
            </li>
            <li className="to-center">
              <label>/</label>
              <input
                type={"checkbox"}
                name="div"
                ref={divRef}
                defaultChecked={true}
              />
            </li>
          </ul>
        </div>
        <div
          className={classes["start-btn"] + " to-center"}
          onClick={() => {
            let operators = [];
            if (addRef.current.checked) {
              operators.push("+");
            }
            if (subRef.current.checked) {
              operators.push("-");
            }
            if (mulRef.current.checked) {
              operators.push("*");
            }
            if (divRef.current.checked) {
              operators.push("/");
            }
            updateOperators(operators);
            if (!maxRange) {
              setMaxRange(10);
            }
            if (!noOfQuestions) {
              setNoOfQuestions(20);
            }
            setIsStarted(true);
          }}
        >
          Start Quiz
        </div>
      </div>
    );
  }
  const score = questionList.filter((item) => item.isCorrect).length;

  return (
    <div className={classes.screen + " v-to-center"}>
      {questionList.length !== noOfQuestions && (
        <QuizCard onAdd={onAdd} max={maxRange || 10} />
      )}

      {questionList.length === noOfQuestions && (
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
          {questionList.length === noOfQuestions && "Final"} Score: {score}
        </div>
      </div>
    </div>
  );
};

export default Screen;

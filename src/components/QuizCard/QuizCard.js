import React, { useEffect, useState, useRef } from "react";
import { operators } from "../../constants";
import classes from "./QuizCard.module.scss";

const QuizCard = (props) => {
  const { onAdd } = props;
  const [answer, setAnswer] = useState("");
  const [a, setA] = useState();
  const [b, setB] = useState();
  const [operator, setOperator] = useState();
  const [counter, setCounter] = useState(0);
  const inputRef = useRef();
  const add = () => {
    return a + b;
  };
  const sub = () => {
    return a - b;
  };
  const mul = () => {
    return a * b;
  };
  const div = () => {
    return a / b;
  };

  useEffect(() => {
    let a = Math.floor(Math.random() * 10 + 1);
    setA(a);
    let b = Math.floor(Math.random() * 10 + 1);
    setB(b);
    let operator = Math.floor(Math.random() * 10) % 4;
    setOperator(operator);
    inputRef.current.focus();
  }, [counter]);

  const check = () => {
    let result = 0;
    if (answer === "") {
      onAdd({ a, b, operator, isCorrect: false, result, answer });
      setCounter((counter) => counter + 1);
      return;
    }

    switch (operators[operator]) {
      case "+":
        result = add();
        break;
      case "-":
        result = sub();
        break;
      case "*":
        result = mul();
        break;
      case "/":
        result = Math.floor(div());
        break;
      default:
        result = 0;
    }

    let isCorrect = +answer === result ? true : false;
    onAdd({ a, b, operator, isCorrect, result, answer });
    setCounter((counter) => counter + 1);
    setAnswer("");
  };
  return (
    <div className={classes.card}>
      {a} {operators[operator]} {b} = ?{" "}
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        ref={inputRef}
      />
      <button className={classes.next} onClick={check}>
        Next
      </button>
    </div>
  );
};

export default QuizCard;

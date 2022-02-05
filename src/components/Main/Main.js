import React from "react";
import Screen from "../Screen/Screen";
import classes from "./Main.module.scss";

const Main = () => {
  return (
    <div className={classes.main + " to-center"}>
      <div className={classes.section}>
        <p className={classes["section-title"]}>Section A</p>
        <Screen />
      </div>
      <div className={classes.section}>
        <p className={classes["section-title"]}>Section B </p>
        <Screen />
      </div>
    </div>
  );
};

export default Main;

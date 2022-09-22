import React from "react";
import Entry from "../../imgs/rewards/Entry.png";
import Normal from "../../imgs/rewards/Normal.png";
import Expert from "../../imgs/rewards/Expert.png";
import reset from "../../imgs/reset/reset.png";
import "./Rewards.scss";

function Rewards(props) {
  function imgCheck() {
    if (props.totalPoints < 150) {
      return Entry;
    } else if (props.totalPoints < 300) {
      return Normal;
    } else {
      return Expert;
    }
  }

  return (
    <div className="rewards-wrapper">
      <div>
        <img src={imgCheck()} height={400} width={295} alt="rewards"></img>
        <div className="rewards-points">{props.totalPoints}</div>
        <div className="rewards-selected">{props.totalSelected}</div>
      </div>
      <img
        id="rewards-reset"
        src={reset}
        width={295}
        alt="reset"
        onClick={props.handleReset}
      ></img>
    </div>
  );
}

export default Rewards;

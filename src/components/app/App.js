import "./App.scss";
import { useState, useEffect } from "react";
import Invocation from "../invocation/Invocation";
import { invoObjs } from "../../utils/invos";
import Rewards from "../rewards/Rewards";
import ReactTooltip from "react-tooltip";
import Snackbar from "awesome-snackbar";

export default function App() {
  const [invos, setInvos] = useState(invoObjs);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalSelected, setTotalSelected] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    let tempPoints = 0;
    let tempSelected = 0;

    invos.forEach((invo) => {
      if (invo.selected) {
        tempPoints += invo.points;
        tempSelected++;
      }
    });

    setTotalPoints(tempPoints);
    setTotalSelected(tempSelected);
  }, [invos]);

  function handleSnackbar(string) {
    new Snackbar(string, { position: "top-center" });
  }

  function handleClick(invo, ind) {
    const tempInvos = invos;

    //Check for single category
    if (invo.single) {
      tempInvos.forEach((x) => {
        if (x.category === invo.category && x.name !== invo.name)
          x.selected = false;
      });
    }

    //Checks for zebak
    if (invo.name === "Arterial Spray" || invo.name === "Blood Thinners") {
      if (!tempInvos.find((x) => x.name === "Not Just a Head").selected) {
        return handleSnackbar("Select Not Just a Head first.");
      }
    }
    if (invo.name === "Not Just a Head" && invo.selected) {
      tempInvos.find((x) => x.name === "Arterial Spray").selected = false;
      tempInvos.find((x) => x.name === "Blood Thinners").selected = false;
    }

    //Checks for wardens
    if (invo.name === "Overclocked" && invo.selected) {
      tempInvos.find((x) => x.name === "Overclocked 2").selected = false;
      tempInvos.find((x) => x.name === "Insanity").selected = false;
    }
    if (invo.name === "Overclocked 2") {
      if (!tempInvos.find((x) => x.name === "Overclocked").selected) {
        return handleSnackbar("Select Overclocked first.");
      }
      if (invo.selected) {
        tempInvos.find((x) => x.name === "Insanity").selected = false;
      }
    }
    if (invo.name === "Insanity") {
      if (!tempInvos.find((x) => x.name === "Overclocked 2").selected) {
        return handleSnackbar("Select Overclocked 2 first.");
      }
    }

    tempInvos[ind].selected = !tempInvos[ind].selected;
    setInvos([...tempInvos]);
  }

  function handleLeave() {
    setShowTooltip(false);
    setTimeout(() => {
      setShowTooltip(true);
    }, 200);
  }

  function handleReset() {
    setInvos([
      ...invos.map((invo) => {
        invo.selected = false;
        return invo;
      }),
    ]);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <div className="invo-wrapper" onMouseLeave={handleLeave}>
          {invos.map((invo, i) => {
            return (
              <Invocation
                ind={i}
                lit={invo.selected}
                key={i}
                description={invo.description}
                handleClick={() => handleClick(invo, i)}
              />
            );
          })}
        </div>
        <Rewards
          totalPoints={totalPoints}
          totalSelected={totalSelected}
          handleReset={handleReset}
        />
      </div>
      {showTooltip && (
        <ReactTooltip
          place="bottom"
          effect="solid"
          multiline={true}
          delayShow={500}
        />
      )}
    </div>
  );
}

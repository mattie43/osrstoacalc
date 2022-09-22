import React from "react";

function Invocation(props) {
  const img = require(`../../imgs/invocations/invocation_${props.ind}${
    props.lit ? "_lit" : ""
  }.png`);

  function handleBreaks() {
    return props.description.replaceAll("{BR}", "<br>");
  }

  return (
    <img
      src={img}
      alt="invocations"
      height={74}
      width={111}
      onClick={() => props.handleClick()}
      data-tip={handleBreaks()}
    ></img>
  );
}

export default Invocation;
